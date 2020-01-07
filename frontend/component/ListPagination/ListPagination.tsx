import React, { memo, useEffect } from 'react';
import { IconButton, CircularProgress } from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import styles from './ListPagination.less';


interface IListPagination {
    children: React.ReactNode,
    page: number,
    row: number,
    loading: boolean,
    more: boolean,
    total?: number,
    change: (page: number, row: number) => void
}


export const ListPagination: React.SFC<IListPagination> = memo((props) => {
    const { children, page, row, loading, more, total, change } = props;
    // console.log('ListPagination', props)
    //= =====================data======================
    //= =====================function======================
    //= =====================effect======================
    //= =====================render======================
    return (!total && total !== 0) || total >= row ?
        <div className={styles.paginationBox}>
            <div className={styles.body}>
                {children}
                {loading ? <CircularProgress color="secondary" className={styles.loading} /> : null}
            </div>
            <div className={styles.pagination}>
                <IconButton
                    onClick={() => { change(page - 1, row); }}
                    disabled={page === 1}
                    aria-label="previous page"
                >
                    <KeyboardArrowLeft />
                </IconButton>
                <span>第{page}页</span>
                <IconButton
                    onClick={() => { change(page + 1, row); }}
                    disabled={!more}
                    aria-label="next page"
                >
                    <KeyboardArrowRight />
                </IconButton>
            </div>
        </div>
        : <>{children}</>
});
