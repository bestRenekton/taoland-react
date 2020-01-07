import React, { memo, useState } from 'react';
import { Navigation } from '@material-ui/icons';
import styles from './ToTop.less';
import { useEventListener, useAnimation } from '@/hooks';


interface IToTop {

}


export const ToTop: React.SFC<IToTop> = memo(() => {
    const [show, setShow] = useState(false);
    const handler = () => {
        let top = document.documentElement.scrollTop || document.body.scrollTop;
        if (top >= 300) {
            setShow(true);
        } else {
            setShow(false);
        }
    };
    const goTop = () => {
        let top = document.documentElement.scrollTop || document.body.scrollTop;
        useAnimation(top, 0, 500, 'Quint.easeOut', 0, (e) => {
            document.documentElement.scrollTop = e;
            document.body.scrollTop = e;
        });
    };
    useEventListener('scroll', handler);
    return (
        <div className={`${styles.toTop} ${show ? styles.on : ''}`} onClick={goTop}>
            <Navigation fontSize="large" />
        </div>
    );
});
