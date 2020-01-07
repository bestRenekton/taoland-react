import React, { useEffect, useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NextPage } from 'next';
import { Paper, Tabs, Tab, Button, Modal, Slide, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@material-ui/core';
import localforage from 'localforage';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { TransitionProps } from '@material-ui/core/transitions/transition';

import { useRouterLevel, useInputValue, useFetchBack } from '@/hooks';
import styles from './adminHome.less';
import { getArticleList } from '@/model/admin/action';
import { IAdminReducer } from '@/interface/admin';
import { RootState } from '@/model/rootReducer';
import { ListPagination, FormAdmin, TableAdmin } from '@/component';
import { CheckToken, GetCategory, CreateCategory, DelArticle } from '@/model/admin/server';
import { changeUserInfo } from '@/model/app/action';
import { DEFAULTUSERINFO, THEME } from '@/constans';
import { IAppReducer } from '@/interface/app';


// tab 面板
interface TabPanelProps {
    children?: any;
    index: number,
    currentTab: number,
}
const TabPanel = (props: TabPanelProps) => {
    const { index, currentTab, children } = props;
    return currentTab === index
        ? (
            <div className={styles.TabPanel}>
                {children}
            </div>
        )
        : null;
};
// 动画
const Transition = React.forwardRef<unknown, TransitionProps>((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});
// 分类input
interface ICategoryInput {
    addCategoryFun: (category: string) => void
}
const CategoryInput: React.SFC<ICategoryInput> = memo(({ addCategoryFun }) => {
    let [addCategory, setAddCategory, addCategoryProps] = useInputValue('');

    return (
        <div className={styles.inputRow}>
            <div className={styles.input}>
                <TextField
                    {...addCategoryProps}
                    label="增加分类"
                    placeholder="请输入分类"
                    fullWidth
                    margin="normal"
                    color="secondary"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    className={styles.item}
                />
            </div>
            <Button variant="contained" onClick={() => { addCategoryFun(addCategory); }}>添加分类</Button>
        </div>
    );
});


const adminHome: NextPage = (props) => {
    //= =====================data======================
    const dispatch = useDispatch();
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const admin: IAdminReducer = useSelector((state: RootState) => { return state.admin; });
    const app: IAppReducer = useSelector((state: RootState) => { return state.app; });
    const { theme } = app;
    // console.log(admin);
    const RouterLevel = useRouterLevel();
    const [currentTab, setCurrentTab] = useState(0);
    const [editItem, setEditItem] = useState<string>(null);
    const [formOpen, setFormOpen] = useState(false);
    const [delOpen, setDelOpen] = useState(false);
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [categoryCheckbox, setCategoryCheckbox] = useState([]);

    const tabs = [
        { type: 'article' },
        // { type: 'demo' },
    ];


    //= =====================function======================
    // 初始表格
    const init = async () => {
        let { data: checkInfo } = await CheckToken();
        useFetchBack(enqueueSnackbar, checkInfo, async () => {
            await dispatch(getArticleList({ page: 1, row: 10 }));
            await initCategory();
        }, async () => {
            await localforage.removeItem('userInfo');
            await dispatch(changeUserInfo(DEFAULTUSERINFO));
            router.push({
                pathname: '/',
            });
        });
    };
    // 初始分类
    const initCategory = async () => {
        const backInfo = await GetCategory();

        useFetchBack(enqueueSnackbar, backInfo, async () => {
            if (backInfo.data.length !== 0) {
                setCategoryCheckbox(backInfo.data.list);
            }
        });
    };
    // 新增分类
    const addCategoryFun = async (category) => {
        const backInfo = await CreateCategory({ category });

        useFetchBack(enqueueSnackbar, backInfo, async () => {
            initCategory();
        });
    };
    // 切换tab
    const changeTabs = (event: React.ChangeEvent<{}>, newValue: number) => {
        setCurrentTab(newValue);
    };
    // 翻页
    const changePage = (page: number, row: number) => {
        dispatch(getArticleList({ page, row }));
    };
    // 打开编辑框
    const changeFormOpen = (flag: boolean, _id?: string) => {
        setFormOpen(flag);
        setEditItem(_id);
    };
    // 打开删除框
    const delFun = (id: string) => {
        setDelOpen(true);
        setEditItem(id);
    };
    // 删除文章
    const delArticle = async () => {
        let { data: backInfo } = await DelArticle({ id: editItem });

        useFetchBack(enqueueSnackbar, backInfo, async () => {
            enqueueSnackbar(backInfo.msg, {
                variant: 'success',
                autoHideDuration: 2000,
            });
            setDelOpen(false);
            init();
        });
    };

    //= =====================effect======================
    useEffect(() => {
        init();
    }, []);
    //= =====================render======================
    return (
        <RouterLevel>
            <Paper className={`mainPage ${styles.adminHome}`}>
                <Tabs
                    value={currentTab}
                    onChange={changeTabs}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    {tabs.map((e, i) => <Tab key={i} label={e.type} />)}
                </Tabs>
                {
                    tabs.map((e, i) => (
                        <TabPanel currentTab={currentTab} index={i} key={i}>
                            <div className={styles.btnsRow}>
                                <Button onClick={() => { changeFormOpen(true); }} variant="contained">新建</Button>
                                <Button onClick={() => { setCategoryOpen(true); }} variant="contained">编辑分类</Button>
                            </div>
                            <ListPagination
                                page={admin[e.type].page}
                                row={admin[e.type].row}
                                loading={admin[e.type].loading}
                                more={admin[e.type].more}
                                change={changePage}
                            >
                                {/* {e.type} */}
                                <TableAdmin
                                    data={admin[e.type].data}
                                    editFun={changeFormOpen}
                                    delFun={delFun}
                                />
                            </ListPagination>
                        </TabPanel>
                    ))
                }
                {/* 编辑框 */}
                <Modal
                    open={formOpen}
                    onClose={() => { changeFormOpen(false); }}
                >
                    <div className={`${styles.editModal} ${theme === THEME.light ? styles.light : ''}`}>
                        <FormAdmin
                            type={tabs[currentTab].type}
                            categoryCheckbox={categoryCheckbox}
                            _id={editItem}
                            changeFormOpen={changeFormOpen}
                            ArticleListInit={init}
                        />
                    </div>
                </Modal>
                {/* 删除框 */}
                <Dialog
                    className={`${styles.delModal} ${theme === THEME.light ? styles.light : ''}`}
                    open={delOpen}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => { setDelOpen(false); }}
                    aria-labelledby="delModal"
                    aria-describedby="delModal"
                >
                    <DialogTitle>删除</DialogTitle>
                    <DialogContent className={styles.content}>
                        <DialogContentText>
                            是否删除该文章?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { setDelOpen(false); }}>取消</Button>
                        <Button onClick={delArticle} color="primary">删除</Button>
                    </DialogActions>
                </Dialog>
                {/* 分类框 */}
                <Modal
                    open={categoryOpen}
                    onClose={() => { setCategoryOpen(false); }}
                >
                    <div className={`${styles.categoryModal} ${theme === THEME.light ? styles.light : ''}`}>
                        <CategoryInput addCategoryFun={addCategoryFun} />
                        <ul className={styles.category}>
                            {
                                categoryCheckbox.map((e, i) => <li key={i}>{e}</li>)
                            }
                        </ul>
                    </div>
                </Modal>
            </Paper>
        </RouterLevel>
    );
};


export default adminHome;
