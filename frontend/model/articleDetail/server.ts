import { request } from '@/util/index';

// 文章详情
export const GetArticleDetail = async (data: { id: string | string[] }, node?: boolean) => {
    return request({
        node: node || false,
        url: 'article/getArticleDetail',
        method: 'get',
        data,
    });
};

// 获取评论
export const GetComment = async (data: { articleId: string | string[], page?: number, row?: number }, node?: boolean) => {
    return request({
        node: node || false,
        url: 'comment/getComment',
        method: 'get',
        data,
    });
};

// 新建评论
export const CreateComment = async (data: {
    articleId: string | string[],
    content: string,
}, node?: boolean) => {
    return request({
        node: node || false,
        url: 'comment/createComment',
        method: 'post',
        data,
    });
};


// 回复评论
export const ReplyComment = async (data: {
    articleId: string | string[],
    content: string,
    commentId: string,
    toName: any
}, node?: boolean) => {
    return request({
        node: node || false,
        url: 'comment/replyComment',
        method: 'post',
        data,
    });
};
