const db = require('../utils/db');
import { ReData, checkTokenFun, isAdminFun, commonTryCatch, SaveImg } from '../utils/common'





//获取分类列表
export const getCategory = async (ctx, next) => {
    return commonTryCatch(ctx, next, async function getCategory() {
        let CATEGORY = db.Category;
        let data = await CATEGORY.find();
        if (data.length === 0) {
            ctx.body = ReData({ list: [] })
        } else {
            ctx.body = ReData({ list: data[0]["list"] })
        }
    })
}

//添加分类
export const createCategory = async (ctx, next) => {
    return commonTryCatch(ctx, next, async function createCategory() {
        let { category, token, account } = ctx.request.body;

        const isAdmin = await isAdminFun(token, account);
        if (isAdmin) {
            let CATEGORY = db.Category;
            let CategoryType = await CATEGORY.find();
            if (CategoryType.length === 0) {//新增
                await CATEGORY.create({ list: [category] });
                ctx.body = ReData({ msg: "分类创建成功" })
            } else {//添加
                let current = CategoryType[0];
                current.list = current.list.concat(category);
                await CATEGORY(current).save();
                ctx.body = ReData({ msg: "分类添加成功" })
            }
        } else {
            ctx.body = ReData({ err: "非法用户" });
        }
    })
}


//添加图片
export const addImg = async (ctx, next) => {
    return commonTryCatch(ctx, next, async function addImg() {
        let { img, folderName, token, account } = ctx.request.body;
        const isAdmin = await isAdminFun(token, account);
        if (isAdmin) {
            let imgPath = await SaveImg(img, folderName)
            ctx.body = ReData({ msg: "上传成功", imgPath })
        } else {
            ctx.body = ReData({ err: "非法用户" });
        }
    })
}


//新增文章
export const createArticle = async (ctx, next) => {
    return commonTryCatch(ctx, next, async function createArticle() {
        let { articleInformation, token, account } = ctx.request.body;

        const isAdmin = await isAdminFun(token, account);
        if (isAdmin) {
            let ARTICLE = db.Article;
            let { previewImg, ...other } = articleInformation;
            //保存预览图片
            let imgPath = await SaveImg(previewImg, "articlePreview")
            await ARTICLE.create({ ...other, previewImg: imgPath });
            ctx.body = ReData({ msg: "发布成功" })
        } else {
            ctx.body = ReData({ err: "非法用户" });
        }
    })
}

//更新文章
export const updateArticle = async (ctx, next) => {
    return commonTryCatch(ctx, next, async function updateArticle() {
        let { articleInformation, token, account } = ctx.request.body;

        const isAdmin = await isAdminFun(token, account);
        if (isAdmin) {
            let ARTICLE = db.Article;
            let { previewImg, _id, } = articleInformation;
            let articleData = await ARTICLE.find({ _id });
            let current = articleData[0];

            current.title = articleInformation.title;
            current.gist = articleInformation.gist;
            current.level = articleInformation.level;
            current.content = articleInformation.content;
            current.category = articleInformation.category;

            //是否需要重新保存预览图片
            let saveImgAgain = previewImg.includes("data:image");
            if (saveImgAgain) {
                let imgPath = await SaveImg(previewImg, "articlePreview");
                current.previewImg = imgPath;
            }
            await ARTICLE(current).save();
            ctx.body = ReData({ msg: "更新成功" })
        } else {
            ctx.body = ReData({ err: "非法用户" });
        }
    })
}

//获取文章列表
export const getArticleList = async (ctx, next) => {
    return commonTryCatch(ctx, next, async function getArticleList() {
        let ARTICLE = db.Article;
        let { page, row, type } = ctx.request.body;
        let articleData = await ARTICLE.find();
        let total = articleData.length;
        page = Number(page);
        row = Number(row);
        //分类结构
        if (type === "categories") {
            let articleDataCated = articleData.reduce((prev, curr) => {
                let type = curr.category;
                type.forEach((e, i) => {
                    let hasType = prev.filter(a => a.type === e);
                    if (hasType.length > 0) {
                        hasType[0]["list"].push(curr)
                    } else {
                        prev.push({ type: e, list: [curr] })
                    }
                })
                return prev
            }, [])
            ctx.body = ReData({ list: articleDataCated })
        } else {
            let reverseData = articleData.reverse();//倒叙
            let leveled = reverseData.filter(e => e.level && e.level > 0).sort((a, b) => b - a);//设置顶置的
            let other = reverseData.filter(e => !e.level || e.level === 0);//未设置顶置的
            let newData = [...leveled, ...other]

            if (page && row) {
                let articleDataPaged = newData.slice((page - 1) * row, page * row)
                ctx.body = ReData({
                    page, row, total, list: articleDataPaged
                })
            } else {
                ctx.body = ReData({
                    total,
                    list: newData
                })
            }
        }
    })
}


//获取文章详情
export const getArticleDetail = async (ctx, next) => {
    return commonTryCatch(ctx, next, async function getArticleDetail() {
        let ARTICLE = db.Article;
        let { id } = ctx.request.query;
        let articleData = await ARTICLE.find({ _id: id });
        let current = articleData[0];
        let prevItem = {};
        let nextItem = {};

        let prev = await ARTICLE.find({ _id: { "$lt": id } });
        if (prev.length > 0) { prevItem = { title: prev[0]["title"], _id: prev[0]["_id"], previewImg: prev[0]["previewImg"] } }
        let next = await ARTICLE.find({ _id: { "$gt": id } });
        if (next.length > 0) { nextItem = { title: next[0]["title"], _id: next[0]["_id"], previewImg: next[0]["previewImg"] } }
        ctx.body = ReData({ current, prev: prevItem, next: nextItem })

        //阅读数+1
        current.looked = current.looked ? current.looked + 1 : 1;
        await ARTICLE(current).save();
    })
}


//删除文章
export const delArticle = async (ctx, next) => {
    return commonTryCatch(ctx, next, async function delArticle() {
        let { id, token, account } = ctx.request.body;
        const isAdmin = await isAdminFun(token, account);
        if (isAdmin) {
            let ARTICLE = db.Article;
            await ARTICLE.deleteOne({ _id: id });
            ctx.body = ReData({ msg: "删除成功" })
        } else {
            ctx.body = ReData({ err: "非法用户" });
        }
    })
}