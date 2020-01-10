import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import localforage from 'localforage';
import { GitHub } from '@material-ui/icons';


import { TextField, Button, CircularProgress } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { useInputValue, useFetchBack } from '@/hooks';
import { GITHUB_OAUTH_URL } from '@/constant';
import styles from './login.less';
import { SignIn } from '@/model/login/server';
import { changeUserInfo } from '@/model/app/action';
import { IAppReducer } from '@/interface/app';
import { RootState } from '@/model/rootReducer';


const Login: NextPage = (props) => {
    //= =====================data======================
    const app: IAppReducer = useSelector((state: RootState) => { return state.app; });
    const { theme } = app;
    const [loginType, setLoginType] = useState(null);
    const router = useRouter();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    let [account, setAccount, accountProps] = useInputValue('');
    let [password, setPassword, passwordProps] = useInputValue('');
    let [loading, setLoading] = useState(false);

    //= =====================function======================
    const setGithubInfo = async (userInfo) => {
        await localforage.setItem('userInfo', userInfo);
        await dispatch(changeUserInfo(userInfo));
        router.push({
            pathname: '/',
        });
    };
    const adminLogin = async () => {
        let win: any = window;
        let newPassword = win.md5(password);
        let { data: adminInfo } = await SignIn({ account, password: newPassword });
        useFetchBack(enqueueSnackbar, adminInfo, async () => {
            await localforage.setItem('userInfo', adminInfo);
            await dispatch(changeUserInfo(adminInfo));
            setTimeout(() => {
                router.push({
                    pathname: '/admin/adminHome',
                });
            }, 300);
        });
    };
    //= =====================effect======================
    useEffect(() => {
        let { account, name, level, avatar, token } = router.query;

        if (account) {
            setLoading(true);
            setGithubInfo({ name, account, level, avatar, token });
        }
    }, []);
    //= =====================render======================
    return (
        <div className={styles.login}>
            <div className={styles.loginBox}>
                <div className={`${styles.loginGithub} ${loginType === 1 ? styles.on : ''} ${theme === 'light' ? styles.light : ''}`} onClick={() => { setLoginType(1); }} />
                <div className={`${styles.loginAdmin} ${loginType === 2 ? styles.on : ''} ${theme === 'light' ? styles.light : ''}`} onClick={() => { setLoginType(2); }} />
                <div className={styles.loading}>
                    {loading ? (
                        <>
                            <CircularProgress color="secondary" />
                            {' '}
                            <p>登录中...</p>
                            {' '}
                        </>
                    ) : null}
                </div>
                <div className={styles.loginInfo}>
                    {
                        loginType === 1
                            ? (
                                <div className="animated fadeInUp" key={1}>
                                    <p>游客登录</p>
                                    <a href={GITHUB_OAUTH_URL} className={styles.loginGithubBtn}><GitHub color="secondary" fontSize="large" /></a>
                                </div>
                            )
                            : loginType === 2
                                ? (
                                    <div className="animated fadeInUp" key={2}>
                                        <p>管理员登录</p>
                                        <p>第一次为 "注册" 管理员！！！</p>
                                        <form noValidate autoComplete="off" className={styles.inputContent}>
                                            <TextField color="secondary" label="账号" {...accountProps} />
                                            <TextField color="secondary" label="密码" type="password" autoComplete="new-password" {...passwordProps} />
                                            <Button onClick={adminLogin} className={styles.loginAdminBtn}>登录</Button>
                                        </form>
                                    </div>
                                )
                                : null

                    }
                </div>
            </div>
        </div>
    );
};


export default Login;
