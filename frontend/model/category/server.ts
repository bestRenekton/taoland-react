import { request } from '@/util/index';

export const GetArticleList = (data: { type:string }, node?: boolean) => {
    return request({
        node: node || false,
        url: 'article/getArticleList',
        method: 'post',
        data,
    });
};
