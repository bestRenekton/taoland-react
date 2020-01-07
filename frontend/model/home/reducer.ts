import { ACTION_TYPE_HOME, setArticleList } from './action';
import { IReducerAction } from '@/interface/app';
import { IHomeReducer, IArticleList } from '@/interface/home';
import { modelBuilderPageList } from '@/util/index';
import { GetArticleList } from './server';


const initState: IHomeReducer = {
    articleList: { loading: false, more: true, page: 1, row: 10, data: [] },
};
const home = (state = initState, action: IReducerAction) => {
    const types = {
        [ACTION_TYPE_HOME.SET_ARTICLE_LIST]: setArticleListFoo,
    };

    const { type, payload } = action;
    return types[type] ? types[type](state, payload) : state;
};

const setArticleListFoo = modelBuilderPageList('home', 'articleList', GetArticleList, setArticleList).reducer;
// const setArticleListFoo = (
//     state: IHomeReducer,
//     payload: IArticleList
// ) => {
//     let { data: oldData, ...oldOther } = state.articleList;
//     let { data: newData, ...newOther } = payload;

//     return {
//         ...state,
//         articleList: {
//             data: oldData.concat(newData ? newData : []),
//             ...oldOther,
//             ...newOther
//         }
//     }
// }


export default home;
