import { request } from '@/util/index';
import { IarticleInformation } from '@/interface/admin';


// 校验身份
export const CheckToken = () => {
    return request({
        node: false,
        url: 'oauth/checkToken',
        method: 'post',
    });
};

// 获取分类列表
export const GetCategory = () => {
    return request({
        node: false,
        url: 'article/getCategory',
        method: 'get',
    });
};

// 添加分类
export const CreateCategory = (data: { category: string }) => {
    return request({
        node: false,
        url: 'article/createCategory',
        method: 'post',
        data,
    });
};

// 上传图片
export const AddImg = (data: { img: string, folderName: string }) => {
    return request({
        node: false,
        url: 'article/addImg',
        method: 'post',
        data,
    });
};

// 获取文章列表
export const GetArticleList = (data: { page: number, row: number }, node?: boolean) => {
    return request({
        node: node || false,
        url: 'article/getArticleList',
        method: 'post',
        data,
    });
};

// 文章详情
export const GetArticleDetail = async (data: { id: string | string[] }, node?: boolean) => {
    return request({
        node: node || false,
        url: 'article/getArticleDetail',
        method: 'get',
        data,
    });
};

// 新建文章
export const CreateArticle = async (data: { articleInformation: IarticleInformation }) => {
    return request({
        node: false,
        url: 'article/createArticle',
        method: 'post',
        data,
    });
};

// 更新文章
export const UpdateArticle = async (data: { articleInformation: IarticleInformation }) => {
    return request({
        node: false,
        url: 'article/updateArticle',
        method: 'post',
        data,
    });
};

// 删除文章
export const DelArticle = async (data: { id: string }) => {
    return request({
        node: false,
        url: 'article/delArticle',
        method: 'post',
        data,
    });
};
