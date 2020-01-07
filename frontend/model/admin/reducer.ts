import { ACTION_TYPE_ADMIN } from './action';
import { IReducerAction } from '@/interface/app';
import { IAdminReducer } from '@/interface/admin';
import { IArticleList } from '@/interface/home';


const initState: IAdminReducer = {
    article: { loading: false, more: true, page: 1, row: 10, data: [] },
    demo: {},
};
const admin = (state = initState, action: IReducerAction) => {
    const types = {
        [ACTION_TYPE_ADMIN.SET_ARTICLE_LIST]: setArticleList,
    };

    const { type, payload } = action;
    return types[type] ? types[type](state, payload) : state;
};

const setArticleList = (
    state: IAdminReducer,
    payload: IArticleList,
) => {
    return {
        ...state,
        article: { ...state.article, ...payload },
    };
};


export default admin;
