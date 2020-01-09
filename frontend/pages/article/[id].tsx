import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';

import { GetArticleDetail } from '@/model/articleDetail/server';
import { IArticleDetailItem } from '@/interface/home';
import { SEOHead, EditorComponent, CommentLoadable } from '@/component';
import { IAppReducer } from '@/interface/app';
import { RootState } from '@/model/rootReducer';
import { useInitHeight } from '@/hooks';
import styles from './articleDetail.less';
import { ROUTERLEVEL, THEME, BASE } from '@/constans';
import { deviceJudge } from '@/util';
import { Typography } from '@material-ui/core';


interface IArticleDetail {
    json: IArticleDetailItem,
    children?: any
}
const ArticleDetail: NextPage = (props: IArticleDetail) => {
    //= =====================data======================
    const app: IAppReducer = useSelector((state: RootState) => { return state.app; });
    const { pageProgressStart, pageProgressEnd, userInfo, theme } = app;
    const { level } = userInfo;
    const { json } = props;
    const { _id, title, category, gist, date, content, next, prev, previewImg, looked } = json;
    // console.log(props.json);
    const router = useRouter();
    const SEOHeadProps = {
        keywords: category.join(','),
        description: gist,
        title: `${title} - TaoLand`,
    };

    //= =====================function======================
    // 上一篇下一篇
    const goOther = (id) => {
        pageProgressStart();
        router.push('/article/[id]', `/article/${id}`);
    };
    // 去登陆
    const goLogin = () => {
        router.push('/admin/login');
    };
    //= =====================effect======================
    useInitHeight();
    useEffect(() => {
        pageProgressEnd && pageProgressEnd();
    }, [router.query.id]);
    //= =====================render======================
    return (
        <>
            <SEOHead {...SEOHeadProps} />

            <div className={styles.articleDetail}>
                <div className={styles.header}>
                    <h1>{title}</h1>
                    <p>
                        {category.join(',')}
                        <span>{date}</span>
                        <span>
                            阅读数
                            {looked}
                        </span>
                    </p>
                </div>
                <div className={`${styles.body} ${theme === THEME.light ? styles.light : ''}`}>
                    <img
                        className={styles.previewImg}
                        src={`${BASE}${previewImg}`}
                        onError={(e: any) => { e.target.onerror = null; e.target.src = '/img/errImg.png'; }}
                    />
                    <Typography className={styles.gist} variant="h6">{gist}</Typography>
                    <ReactMarkdown
                        source={content}
                        renderers={{
                            image: EditorComponent.Image,
                            code: EditorComponent.CodeBlock,
                            blockquote: EditorComponent.Blockquote,
                            list: EditorComponent.Ul,
                        }}
                    />
                    <textarea id="COPYAREA" />
                </div>
                <div className={styles.footer}>
                    <div className={styles.l} onClick={() => { prev._id && goOther(prev._id); }}>
                        <div className={styles.imgBox}>
                            {
                                prev.previewImg ? <img src={`${BASE}${prev.previewImg}`} onError={(e: any) => { e.target.onerror = null; e.target.src = '/img/errImg.png'; }} /> : <img src="/img/errImg.png" />
                            }
                        </div>
                        <p className={styles.p1}>PREV</p>
                        <p className={styles.p2}>{prev.title ? prev.title : 'NO MORE'}</p>
                    </div>
                    <div className={styles.r} onClick={() => { next._id && goOther(next._id); }}>
                        <div className={styles.imgBox}>
                            {
                                next.previewImg ? <img src={`${BASE}${next.previewImg}`} onError={(e: any) => { e.target.onerror = null; e.target.src = '/img/errImg.png'; }} /> : <img src="/img/errImg.png" />
                            }
                        </div>
                        <p className={styles.p1}>NEXT</p>
                        <p className={styles.p2}>{next.title ? next.title : 'NO MORE'}</p>
                    </div>
                </div>
            </div>
            {/* 评论 */}
            <CommentLoadable
                articleId={_id}
                goLogin={goLogin}
                canComment={level >= ROUTERLEVEL.LOGIN}
            />
        </>
    );
};

ArticleDetail.getInitialProps = async (props: any) => {
    const { store, asPath, req } = props;
    req && deviceJudge(store, req.headers['user-agent']);// 服务端判断ua
    const id = asPath.split('/article/')[1];
    try {
        const json = await GetArticleDetail({ id }, true);
        if (json.code !== 200) {
            return { json: {} };
        } else {
            const { data } = json;
            return { json: { ...data.current, prev: data.prev, next: data.next } };
        }
    } catch (err) {
        return { json: {} };
    }

};


export default ArticleDetail;
