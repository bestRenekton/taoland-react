import { IArticleItem, IArticleList } from '@/interface/home';

export enum ACTION_TYPE_HOME {
    GET_ARTICLE_LIST = 'home/GET_ARTICLE_LIST',
    SET_ARTICLE_LIST = 'home/SET_ARTICLE_LIST',
}


export const getArticleList = (data: { page: number, row: number }) => ({
    type: ACTION_TYPE_HOME.GET_ARTICLE_LIST,
    payload: data,
});

export const setArticleList = (data: IArticleList) => ({
    type: ACTION_TYPE_HOME.SET_ARTICLE_LIST,
    payload: data,
});
