import React, { memo, useEffect, useState } from 'react';
import { Grid, Slide, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextareaAutosize } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import { useSnackbar } from 'notistack';


import styles from './Comment.less';
import { CreateComment, GetComment, ReplyComment } from '@/model/articleDetail/server';
import { useInputValue, useFetchBack } from '@/hooks';
import { Icomments } from '@/interface/home';
import { ROUTERLEVEL } from '@/constant';
import { ListPagination } from '..';
import admin from '@/model/admin/reducer';


// 评论框
const Transition = React.forwardRef<unknown, TransitionProps>((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});
interface IDialogComment {
    commentOpen: boolean,
    contentProps: any,
    commentFun: () => void,
    closeCommentOpen: () => void
    toName: string
}
const DialogComment: React.SFC<IDialogComment> = memo(({
    commentOpen,
    contentProps,
    commentFun,
    closeCommentOpen,
    toName,
}) => {
    return (
        <Dialog
            className={styles.commentModal}
            open={commentOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={closeCommentOpen}
            aria-labelledby="commetnModal"
            aria-describedby="commetnModal"
        >
            <DialogTitle>评论</DialogTitle>
            <DialogContent className={styles.content}>
                <TextareaAutosize
                    {...contentProps}
                    placeholder={toName ? `回复“${toName}”` : '发表评论'}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeCommentOpen}>取消</Button>
                <Button onClick={commentFun}>评论</Button>
            </DialogActions>
        </Dialog>
    );
});


interface IComment {
    articleId: string,
    goLogin: () => void,
    canComment: boolean
}
export const Comment: React.SFC<IComment> = memo((props) => {
    // console.log('Comment',props)
    //= =====================data======================
    const { enqueueSnackbar } = useSnackbar();
    const { articleId, goLogin, canComment } = props;
    const [commentList, setCommentList] = useState<Array<Icomments>>([]);// 评论列表
    const [page, setPage] = useState(1);// 页数
    const [row, setRow] = useState(5);// 每页条数
    const [total, setTotal] = useState(0);// 总数
    const [loading, setLoading] = useState(false);
    const [more, setMore] = useState(true);// 是否还有

    const [commentOpen, setCommentOpen] = useState(false);// 评论框
    const [commentId, setCommentId] = useState(null);// null为评论文章
    let [content, setContent, contentProps] = useInputValue('');// 内容
    let [toName, setToName] = useState(null);// 回复对象

    //= =====================function======================
    const init = () => {
        setPage(1);
        setRow(5);
        setTotal(0);
        setLoading(false);
        setMore(true);
        changePage(1, 5);
    }
    // 翻页
    const changePage = async (page: number, row: number) => {
        setLoading(true);
        const { data: backInfo } = await GetComment({ articleId, page, row });
        useFetchBack(enqueueSnackbar, backInfo, async () => {
            let { page, row, total, list } = backInfo;

            if (list.length < row) {
                setMore(false)
            } else {
                setMore(true)
            }
            setLoading(false);
            setPage(page);
            setRow(row);
            setTotal(total);
            setCommentList(backInfo.list);
        });
    };
    // 打开评论
    const openComment = () => {
        if (!canComment) {
            enqueueSnackbar('请登录后评论', {
                variant: 'error',
                autoHideDuration: 2000,
                action: <Button onClick={() => { goLogin(); }}>登录</Button>,
            });
        } else {
            setCommentOpen(true);
            setCommentId(null);
        }
    };
    // 打开回复
    const openReply = (commentId, toName) => {
        if (!canComment) {
            enqueueSnackbar('请登录后评论', {
                variant: 'error',
                autoHideDuration: 2000,
                action: <Button onClick={() => { goLogin(); }}>登录</Button>,
            });
        } else {
            setCommentId(commentId);
            setCommentOpen(true);
            setToName(toName);
        }
    };
    // 关闭
    const closeCommentOpen = () => {
        setCommentOpen(false);
        setContent('');
        setToName(null);
    };
    // 发表评论
    const commentFun = async () => {
        // 字数
        if (content.length === 0 || content.length >= 200) {
            enqueueSnackbar('字数限制：0-200', {
                variant: 'error',
                autoHideDuration: 2000,
            });
            return;
        }
        if (!commentId) { // 新评论
            const { data: backInfo } = await CreateComment({ articleId, content });
            useFetchBack(enqueueSnackbar, backInfo, async () => {
                enqueueSnackbar(backInfo.msg, {
                    variant: 'success',
                    autoHideDuration: 2000,
                });
                closeCommentOpen();
                changePage(page, row);
            }, async () => {
                if (backInfo.err === '非法用户') {
                    goLogin();
                }
            });
        } else { // 回复
            const { data: backInfo } = await ReplyComment({ articleId, commentId, toName, content });
            useFetchBack(enqueueSnackbar, backInfo, async () => {
                enqueueSnackbar(backInfo.msg, {
                    variant: 'success',
                    autoHideDuration: 2000,
                });
                closeCommentOpen();
                changePage(page, row);
            }, async () => {
                if (backInfo.err === '非法用户') {
                    goLogin();
                }
            });
        }
    };
    //= =====================effect======================
    useEffect(() => {
        init();
    }, [articleId]);
    //= =====================render======================
    return (
        <div className={styles.comment}>
            <div className={styles.commentBtn} onClick={openComment}>
                {canComment ? 'COMMENT' : 'LOGIN&FUN'}
            </div>
            <ListPagination
                page={page}
                row={row}
                total={total}
                loading={loading}
                more={more}
                change={changePage}
            >
                <div className={styles.commentBody}>
                    {
                        commentList.map((e, i) => {
                            return (
                                <div className={styles.commentRow} key={i}>
                                    <div className={styles.commentRow_l}>
                                        <img
                                            src={e.fromAvatar}
                                            onError={(e: any) => { e.target.onerror = null; e.target.src = '/img/errImg.png'; }}
                                            className={styles.avatar}
                                        />
                                        <div className={styles.name}>
                                            {e.fromName}
                                            {
                                                e.fromLevel === ROUTERLEVEL.ADMIN
                                                    ? (
                                                        <span className={styles.admin}>
                                                            <span className={styles.admin_l} />
                                                            <span className={styles.admin_r} />
                                                        </span>
                                                    ) : null
                                            }
                                        </div>
                                    </div>
                                    <div className={styles.commentRow_r}>
                                        <div className={styles.mainComment}>
                                            <div className={styles.content}>{e.content}</div>
                                            <div className={styles.date}>{new Date(e.date).toLocaleString()}</div>
                                            <div className={styles.replyBtn} onClick={() => { openReply(e._id, e.fromName); }}>回复</div>
                                        </div>
                                        <div className={styles.mainReply}>
                                            {
                                                e.child.map((e2, i2) => {
                                                    return (
                                                        <div className={styles.replyRow} key={i2}>
                                                            <div className={styles.replyRow_l}>
                                                                <img
                                                                    src={e2.fromAvatar}
                                                                    onError={(e: any) => { e.target.onerror = null; e.target.src = '/img/errImg.png'; }}
                                                                    className={styles.replyRow_avatar}
                                                                />
                                                            </div>
                                                            <div className={styles.replyRow_r}>
                                                                <div className={styles.replyRow_content}>
                                                                    <span>{e2.fromName}</span>
                                                                    {
                                                                        e2.fromLevel === ROUTERLEVEL.ADMIN
                                                                            ? (
                                                                                <span className={styles.admin}>
                                                                                    <span className={styles.admin_l} />
                                                                                    <span className={styles.admin_r} />
                                                                                </span>
                                                                            ) : null
                                                                    }
                                                                    <span style={{ margin: '0 6px' }}>回复</span>
                                                                    <span>{e2.toName}</span>
                                                                    ：
                                                                <span className={styles.txt}>{e2.content}</span>
                                                                </div>
                                                                <div className={styles.replyRow_date}>{new Date(e2.date).toLocaleString()}</div>
                                                                <div className={styles.replyRow_replyBtn} onClick={() => { openReply(e._id, e2.fromName); }}>回复</div>
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            }
                                        </div>
                                    </div>

                                </div>
                            );
                        })
                    }
                </div>
            </ListPagination>

            {/* 评论框 */}
            <DialogComment
                commentOpen={commentOpen}
                contentProps={contentProps}
                commentFun={commentFun}
                closeCommentOpen={closeCommentOpen}
                toName={toName}
            />
        </div>
    );
});

export const CommentLoading = memo(() => {
    return (
        <Grid container className={styles.commentLoading}>
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
});
