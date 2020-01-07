// import { take, call, put, fork, select, takeLatest, takeEvery } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga/effects';
import { ACTION_TYPE_ADMIN, setArticleList } from './action';
import { GetArticleList } from './server';
// import { IAdminReducer } from '@/interface/admin';
// import { RootState } from '../rootReducer';
// import { IArticleList } from '@/interface/home';
import { modelBuilderPageList } from '@/util';


const getArticleList_saga = modelBuilderPageList('admin', 'article', GetArticleList, setArticleList).saga;

// function* getArticleList_saga(params) {
//     try {
//         const admin: IAdminReducer = yield select((state: RootState) => state.admin);

//         //     const home: IHomeReducer = yield select(state => state.home);
//         const { page, row, more, loading } = admin.article;
//         const { page: newPage, row: newRow } = params.payload;

//         yield put(setArticleList({ loading: true }))
//         // const json = yield call(GetArticleList, params.payload);
//         // yield put(setArticleList(json))

//         const json = yield call(GetArticleList, params.payload);
//         let newData: IArticleList = {
//             loading: false,
//             page: newPage,
//             row: newRow,
//             data: json
//         }
//         // if (json.code !== 200) {
//         //   throw 'error'
//         // }

//         if (json.length < row) {//没有更多
//             newData.more = false;
//         } else {
//             newData.more = true;
//         }
//         yield put(setArticleList(newData))
//     } catch (error) {
//         yield put(setArticleList({ loading: false }))
//     }
// }


export default [
    takeEvery(ACTION_TYPE_ADMIN.GET_ARTICLE_LIST, getArticleList_saga),
];
