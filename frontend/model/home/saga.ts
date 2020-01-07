import { takeEvery } from 'redux-saga/effects';
import { ACTION_TYPE_HOME, setArticleList } from './action';
import { GetArticleList } from './server';
import { modelBuilderPageList } from '@/util';


// let back = {
//   code: 200,
//   msg: "success",
//   data: {
//     page: 1,
//     row: 10,
//     total: 251,
//     list: [
//       {
//         id: 1,
//         name: "XXX",
//         code: "H001"
//       },
//       {
//         id: 2,
//         name: "XXX",
//         code: "H001"
//       }],
//   }
// }

const getArticleList = modelBuilderPageList('home', 'articleList', GetArticleList, setArticleList).saga;
// function* getArticleList(params) {
//   try {
//     // console.log('saga--getArticleList', params)
//     const home: IHomeReducer = yield select(state => state.home);
//     const { page, row, more, loading, } = home.articleList;
//     const { page: newPage, row: newRow } = params.payload;


//     yield put(setArticleList({ loading: true }))
//     const json = yield call(GetArticleList, params.payload);
//     let newData: IArticleList = {
//       loading: false,
//       page: newPage,
//       row: newRow,
//       data: json
//     }
//     // if (json.code !== 200) {
//     //   throw 'error'
//     // }

//     if (json.length < row) {//没有更多
//       newData.more = false;
//     } else {
//       newData.more = true;
//     }
//     yield put(setArticleList(newData))
//   } catch (error) {
//     yield put(setArticleList({ loading: false }))
//   }
// }


export default [
  takeEvery(ACTION_TYPE_HOME.GET_ARTICLE_LIST, getArticleList),
];
