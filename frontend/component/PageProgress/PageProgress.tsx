import React, { memo, useState, useEffect, useRef } from 'react';
import { LinearProgress } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { initPageProgress } from '@/model/app/action';
import styles from './PageProgress.less';


export const PageProgress: React.SFC = memo(() => {
    const [value, setValue] = useState(0);
    const ref = useRef(0);
    const dispatch = useDispatch();
    let timer;
    // console.log('PageProgress',props)

    const start = () => {
        if (ref.current <= 89) {
            let diff = Math.random() * 10;
            ref.current += diff;
            setValue(ref.current);
            timer = setTimeout(start, 500);
        } else {
            clearInterval(timer);
        }
    };
    const end = () => {
        // 收尾
        clearInterval(timer);
        setValue(99);
        // 初始化
        setTimeout(() => {
            setValue(0);
            ref.current = 0;
        }, 300);
    };

    useEffect(() => {
        dispatch(initPageProgress(start, end));
    }, []);
    return value !== 0 && value !== 100 ? <LinearProgress variant="determinate" color="secondary" value={value} className={styles.progress} /> : null;
});
