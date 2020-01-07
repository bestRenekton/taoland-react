import { IArticleList } from '@/interface/home';

// import { Ixxxx } from "@/interface/admin"

export enum ACTION_TYPE_ADMIN {
    GET_ARTICLE_LIST = 'admin/GET_ARTICLE_LIST',
    SET_ARTICLE_LIST = 'admin/SET_ARTICLE_LIST',
    GET_DEMO_LIST = 'admin/GET_DEMO_LIST',
    SET_DEMO_LIST = 'admin/SET_DEMO_LIST',
}


export const getArticleList = (data: { page: number, row: number }) => ({
    type: ACTION_TYPE_ADMIN.GET_ARTICLE_LIST,
    payload: data,
});

export const setArticleList = (data: IArticleList) => ({
    type: ACTION_TYPE_ADMIN.SET_ARTICLE_LIST,
    payload: data,
});

export const getDemoList = (data: { page: number, row: number }) => ({
    type: ACTION_TYPE_ADMIN.GET_DEMO_LIST,
    payload: data,
});

export const setDemoList = (data: IArticleList) => ({
    type: ACTION_TYPE_ADMIN.SET_DEMO_LIST,
    payload: data,
});
