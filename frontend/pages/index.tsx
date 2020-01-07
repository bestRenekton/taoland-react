import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { CircularProgress } from '@material-ui/core';


import { deviceJudge } from '@/util/index';
import { setArticleList, getArticleList } from '@/model/home/action';
import { GetArticleList } from '@/model/home/server';
import { RootState } from '@/model/rootReducer';
import { IHomeReducer } from '@/interface/home';
import { useInitHeight, useEventListener } from '@/hooks';
import styles from './index.less';
import { LoadableCard } from '@/component';
import { IAppReducer } from '@/interface/app';


interface IIndex {
    // home: IHomeReducer,
    // initTitle: (title: string) => void,
}
const Index: NextPage = (props: IIndex) => {
    // console.log('indexindexindexindexindex', props);
    //= =====================data======================
    const app: IAppReducer = useSelector((state: RootState) => { return state.app; });
    const home: IHomeReducer = useSelector((state: RootState) => { return state.home; });
    const { pageProgressStart, pageProgressEnd, theme } = app;
    const { articleList } = home;
    const { data: dataSourceArticle, more, page, row, loading } = articleList;
    const dispatch = useDispatch();
    const router = useRouter();
    const Card = LoadableCard();


    //= =====================function======================
    const scrollHandler = () => {
        let windowH = document.documentElement.clientHeight;
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        let bodyH = document.body.scrollHeight;
        // console.log(windowH, scrollTop, bodyH);
        if (windowH + scrollTop > bodyH - 100) {
            fetchArticleList();
        }
    };
    const fetchArticleList = () => {
        if (!loading && more) {
            dispatch(getArticleList({ page: page + 1, row }));
        }
    };
    const goDetail = (id: string) => {
        pageProgressStart();
        router.push('/article/[id]', `/article/${id}`);
        // router.push({
        //     pathname: `/article`,
        //     query: { id },
        // });
    };
    //= =====================effect======================
    useInitHeight();
    useEventListener('scroll', scrollHandler);
    useEffect(() => {
        pageProgressEnd && pageProgressEnd();
    }, []);
    //= =====================render======================
    return (
        <div className={`mainPage ${styles.home}`}>
            <div className={styles.homeList}>
                <div className={styles.homeList_content}>
                    {
                        dataSourceArticle && dataSourceArticle.length > 0 && dataSourceArticle.map((e, i) => <Card dataSource={e} theme={theme} go={() => { goDetail(e._id); }} key={i} />)
                    }
                </div>
                <div className={styles.homeList_footer}>
                    {loading ? <CircularProgress color="secondary" /> : null}
                    {dataSourceArticle && dataSourceArticle.length > 0 && !more ? <p>THE END OF THE WORLD ~~~</p> : null}
                </div>
            </div>
        </div>
    );
};


Index.getInitialProps = async (props: any) => {
    const { store, req } = props;
    req && deviceJudge(store, req.headers['user-agent']);// 服务端判断ua
    const isInit = !(store.getState().home.articleList.data.length > 0);// redux中有无数据

    if (isInit) { // 第一次加载
        const json = await GetArticleList({ page: 1, row: 10 }, true);
        if (json.code !== 200) {
            await store.dispatch(setArticleList({ more: false }));
        } else {
            await store.dispatch(setArticleList({ data: json.data.list }));
        }
    }
    return { test: 1 };
};

export default Index;
