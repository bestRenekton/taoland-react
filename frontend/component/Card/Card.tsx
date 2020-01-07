import React, { memo } from 'react';
import { Typography, Grid } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { RemoveRedEye, Message } from '@material-ui/icons';
import styles from './Card.less';
import { IArticleItem } from '@/interface/home';
import { BASE, THEME } from '@/constans';


interface ICard {
    type?: 'demo' | 'article', // article,demo
    theme?: string,
    dataSource: IArticleItem,
    go?: () => void
}
export const Card: React.SFC<ICard> = memo((props) => {
    const { type, dataSource, go, theme } = props;
    const { title, gist, date, previewImg, comments, looked, category } = dataSource;


    if (type === 'demo') {
        return (
            <div>
                <Typography variant="body1" component="p">{date}</Typography>
            </div>
        );
    } else {
        return (
            <div className={`bd-handle ${styles.cardArticle}`} style={theme === THEME.light ? { background: '#eee' } : {}} onClick={() => { go(); }}>
                <div className={`bd-box ${styles.l} ${theme}`}>
                    {/* <img src="/img/errImg.png" alt=""/> */}
                    <img
                        src={`${BASE}${previewImg}`}
                        onError={(e: any) => { e.target.onerror = null; e.target.src = '/img/errImg.png'; }}
                    />
                    <span className="bd-t" />
                    <span className="bd-r" />
                    <span className="bd-b" />
                    <span className="bd-l" />
                </div>
                <div className={styles.r}>
                    <Typography variant="h5" component="h5" gutterBottom>{title}</Typography>
                    <Typography variant="overline" component="p" style={{ color: '#999' }}>{gist}</Typography>
                    <Typography variant="overline" component="p" style={{ color: '#999' }}>{category && category.join(' , ')}</Typography>
                    <Typography variant="overline" component="p" style={{ color: '#999' }}>{date}</Typography>
                    <Typography variant="overline" component="p" style={{ color: '#999', display: 'flex', alignItems: 'center' }}>
                        {looked ? (
                            <>
                                <RemoveRedEye fontSize="small" style={{ marginRight: 6 }} />
                                {looked}
                            </>
                        ) : null}
                        {comments ? (
                            <>
                                <Message fontSize="small" style={{ margin: '0 6px 0 20px' }} />
                                {comments}
                            </>
                        ) : null}
                    </Typography>
                </div>

            </div>
        );
    }
});


interface ICardLoading {
    type?: 'demo' | 'article', // article,demo
}
export const CardLoading = memo(({ type = 'article' }: ICardLoading) => {
    if (type === 'article') {
        return (
            <Grid container className={styles.cardArticleLoading}>
                <Grid item md={4} className={styles.l}>
                    <Skeleton variant="rect" width="90%" height={200} />
                </Grid>
                <Grid item container direction="column" justify="center" md={8} xs={12}>
                    <Skeleton variant="rect" height={45} style={{ marginBottom: 30 }} />
                    <Skeleton variant="text" style={{ marginBottom: 10 }} />
                    <Skeleton variant="text" style={{ marginBottom: 10 }} />
                    <Skeleton variant="text" style={{ marginBottom: 10 }} />
                </Grid>
            </Grid>
        );
    } else {
        return (
            <div>loading</div>
        );
    }
});
