import { request } from '@/util/index';

export const GetArticleList = (data: { page: number, row: number }, node?: boolean) => {
    return request({
        node: node || false,
        url: 'article/getArticleList',
        method: 'post',
        data,
    });
};

export const VisitCount = () => {
    return request({
        node: false,
        url: 'visitCount',
        method: 'get',
    });
};
