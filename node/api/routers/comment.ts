const db = require('../utils/db');
import { ReData, checkTokenFun, commonTryCatch } from '../utils/common'



//获取评论
export const getComment = async (ctx, next) => {
    return commonTryCatch(ctx, next, async function getComment() {
        let { articleId, page, row } = ctx.request.query;
        let COMMENT = db.Comment;
        let commentData = await COMMENT.find({ articleId });
        let total = commentData.length;
        page = Number(page);
        row = Number(row);


        if (total === 0) {
            ctx.body = ReData({ page, row, total, list: [] })
        } else {
            let commentDataPaged = commentData.slice((page - 1) * row, page * row)
            ctx.body = ReData({
                page, row, total, list: commentDataPaged
            })
        }
    })
}


//添加评论
export const createComment = async (ctx, next) => {
    return commonTryCatch(ctx, next, async function createComment() {
        let { account, token, articleId, content } = ctx.request.body;

        //验证用户信息
        const isUser = await checkTokenFun(token, account);
        if (isUser) {
            let USER = db.User;
            let COMMENT = db.Comment;
            let userInfo = await USER.findOne({ account });
            let { name: fromName, avatar: fromAvatar, level: fromLevel } = userInfo;
            //字数
            if (content.length >= 200) {
                ctx.body = ReData({ err: "字数超限！" })
                return
            }
            await COMMENT.create({
                articleId,
                fromName,
                fromAvatar,
                fromLevel,
                date: new Date().getTime(),
                content,
            });
            //更新文章评论数
            if (articleId.match(/^[0-9a-fA-F]{24}$/)) {//因为留言的id是“message”而非符合规定的_id,所以过滤掉，否则findOne报错
                let ARTICLE = db.Article;
                let articleInfo = await ARTICLE.findOne({ _id: articleId });
                if (articleInfo) {
                    articleInfo.comments = articleInfo.comments ? articleInfo.comments + 1 : 1;
                    await ARTICLE(articleInfo).save();
                }
            }

            ctx.body = ReData({ msg: "创建评论成功" })
        } else {
            ctx.body = ReData({ err: "非法用户" });
        }
    })
}

//回复评论
export const replyComment = async (ctx, next) => {
    return commonTryCatch(ctx, next, async function replyComment() {
        let { account, token, articleId, commentId, toName, content } = ctx.request.body;

        //验证用户信息
        const isUser = await checkTokenFun(token, account);
        if (isUser) {
            let USER = db.User;
            let userInfo = await USER.findOne({ account });
            let { name: fromName, avatar: fromAvatar, level: fromLevel } = userInfo;
            //字数
            if (content.length >= 200) {
                ctx.body = ReData({ err: "字数超限！" })
                return
            }
            let COMMENT = db.Comment;
            let commentInfo = await COMMENT.findOne({ articleId, _id: commentId });
            commentInfo.child = commentInfo.child.concat({
                fromName,
                fromAvatar,
                fromLevel,
                toName,
                date: new Date().getTime(),
                content,
            })
            await COMMENT(commentInfo).save();

            //更新文章评论数
            if (articleId.match(/^[0-9a-fA-F]{24}$/)) {
                let ARTICLE = db.Article;
                let articleInfo = await ARTICLE.findOne({ _id: articleId });
                if (articleInfo) {
                    articleInfo.comments = articleInfo.comments ? articleInfo.comments + 1 : 1;
                    await ARTICLE(articleInfo).save();
                }
            }

            ctx.body = ReData({ msg: "回复成功" })
        } else {
            ctx.body = ReData({ err: "非法用户" });
        }
    })
}

