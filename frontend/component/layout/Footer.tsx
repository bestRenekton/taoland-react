import React, { memo, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GitHub } from '@material-ui/icons';

import { ROUTER_TABLE, THEME, DEVICE } from '@/constans';
import { MusicPlayer } from '../MusicPlayer/MusicPlayer';
import styles from './Layout.less';
import { VisitCount } from '@/model/home/server';
import { getSurvivalTime } from '@/util';
import { useSelector } from 'react-redux';
import { RootState } from '@/model/rootReducer';
import { IAppReducer } from '@/interface/app';

interface IFooter {

}


export const Footer: React.SFC<IFooter> = memo(() => {
    //= =====================data======================
    const router = useRouter();
    const { pathname } = router;
    const app: IAppReducer = useSelector((state: RootState) => { return state.app; });
    const { theme, device } = app;
    const currentRouter = ROUTER_TABLE.filter((e) => e.pathname === pathname)[0];
    const isNoFooter = currentRouter && currentRouter.noFooter;
    const [visit, setVisit] = useState(51246);
    const [timer, setTimer] = useState('1 year 314 days 03:46:04');
    //= =====================function======================
    const init = async () => {
        let { data: viewData } = await VisitCount();
        if (viewData.view) {
            setVisit(viewData.view);
        }

        setInterval(() => {
            setTimer(getSurvivalTime());
        }, 1000);
    };
    //= =====================effect======================
    useEffect(() => {
        init();
    }, []);
    //= =====================render======================
    return (
        isNoFooter
            ? null
            : (
                <div className={styles.footer} style={theme === THEME.light ? { background: '#eee' } : {}}>
                    <div className={styles.info}>
                        <p>Contact me at:<a href="https://github.com/bestRenekton" target="_blank" rel="noopener noreferrer"><GitHub fontSize="small" color="secondary" /></a></p>
                        <p>Welcome to TaoLand，live for {timer}，{visit} visits</p>
                        <p>TaoLand built with react and node.Theme designed by YYT.</p>
                    </div>
                    {
                        device === DEVICE.PC ?
                            <div className={styles.music}>
                                <MusicPlayer />
                            </div>
                            : null
                    }
                </div>
            )
    );
});
