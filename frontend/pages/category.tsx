import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


import { GetArticleList } from '@/model/category/server';
import { RootState } from '@/model/rootReducer';
import { IArticleItem } from '@/interface/home';
import { useInitHeight } from '@/hooks';
import styles from './category.less';
import { IAppReducer } from '@/interface/app';


interface ICategory {
    category: [{ type: string, list: [IArticleItem] }],
    // router: any
}
const Category = (props: ICategory) => {
    console.log('Category', props);
    //= =====================data======================
    const app: IAppReducer = useSelector((state: RootState) => { return state.app; });
    const { pageProgressStart, pageProgressEnd } = app;
    const router = useRouter();
    const [expanded, setExpanded] = useState<string | false>(false);

    //= =====================function======================
    const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };
    const goDetail = (id: string) => {
        pageProgressStart();
        router.push('/article/[id]', `/article/${id}`);
    };
    //= =====================effect======================
    useInitHeight();
    useEffect(() => {
        pageProgressEnd && pageProgressEnd();
    }, []);
    //= =====================render======================
    return (
        <div className={`mainPage ${styles.category}`}>
            {
                props.category.map((e, i) => {
                    return (
                        <ExpansionPanel expanded={expanded === e.type} onChange={handleChange(e.type)} key={i}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls={`${e.type}-content`}>
                                {e.type}
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails className={styles.detail}>
                                {e.list.map((e2, i2) => {
                                    return (
                                        <div
                                            className={styles.item}
                                            onClick={() => { goDetail(e2._id); }}
                                            key={i2}
                                        >
                                            <span className={styles.title}>
                                                《{e2.title}》
                                            </span>
                                            <span className={styles.date}>{e2.date}</span>
                                        </div>
                                    );
                                })}
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    );
                })
            }
        </div>
    );
};


Category.getInitialProps = async (props: any) => {
    try {
        const json = await GetArticleList({ type: 'categories' }, true);
        if (json.code !== 200) {
            return { category: [] };
        } else {
            return { category: json.data.list };
        }
    } catch (err) {
        return { category: [] };
    }
};

export default Category;
