import { call, put, select } from 'redux-saga/effects';


// 分页类型的reducer,saga生成器
// 使用:
// modelBuilderPageList('home', 'articleList', GetArticleList, setArticleList).reducer

interface IModelBuilderPageList {
    (
        nameSpace: string,
        listName: string,
        getFun: any,
        setFun: any,
    ): { reducer, saga }
}
export const modelBuilderPageList: IModelBuilderPageList = (
    nameSpace,
    listName,
    getFun,
    setFun,
) => {
    return {
        reducer: (
            state,
            payload,
        ) => {
            let { data: oldData, ...oldOther } = state[listName];
            let { data: newData, ...newOther } = payload;

            return {
                ...state,
                [listName]: {
                    data: oldData.concat(newData || []),
                    ...oldOther,
                    ...newOther,
                },
            };
        },
        *saga(params) {
            try {
                // console.log('saga--getArticleList', params)
                const state = yield select((state) => state[nameSpace]);
                const { page, row, more, loading } = state[listName];
                const { page: newPage, row: newRow } = params.payload;


                yield put(setFun({ loading: true }));
                // const json = yield call(getFun, params.payload);
                const json = yield getFun(params.payload);

                if (json.code !== 200) {
                    throw 'error';
                }
                let newData = {
                    loading: false,
                    page: newPage,
                    row: newRow,
                    data: json.data.list,
                    more: true,
                };
                if (json.data.list.length < row) { // 没有更多
                    newData.more = false;
                } else {
                    newData.more = true;
                }
                yield put(setFun(newData));
            } catch (error) {
                yield put(setFun({ loading: false, more: false }));
            }
        },
    };
};
