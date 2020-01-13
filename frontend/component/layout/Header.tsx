import React, { memo, Children, useEffect } from 'react';
// import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { AppBar, Toolbar, IconButton, Typography, Button, Grid, Hidden, Avatar, MenuItem, Popper, MenuList, ClickAwayListener } from '@material-ui/core';
import { Menu, Brightness4, Brightness7 } from '@material-ui/icons';
import localforage from 'localforage';


import { ROUTER_TABLE, DEFAULTSEO, ROUTERLEVEL, DEFAULTUSERINFO, THEME } from '@/constant';
import { SEOHead, ToTop, PageProgress } from '@/component';
import styles from './Layout.less';
import { RootState } from '@/model/rootReducer';
import { IAppReducer } from '@/interface/app';
import { changeUserInfo, changeTheme } from '@/model/app/action';


const LoginBtn = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const home: IAppReducer = useSelector((state: RootState) => { return state.app; });
    const { userInfo } = home;
    const { level, name, avatar } = userInfo;
    const [anchorEl, setAnchorEl] = React.useState(null);


    const Login = () => {
        router.push({
            pathname: '/admin/login',
        });
    };
    const openMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const closeMenu = () => {
        setAnchorEl(null);
    };
    const GoAdminList = () => {
        closeMenu();
        router.push({
            pathname: '/admin/adminHome',
        });
    };
    const Logout = async () => {
        await closeMenu();
        await localforage.removeItem('userInfo');
        await dispatch(changeUserInfo(DEFAULTUSERINFO));
    };
    return (
        <div className={styles.LoginBtn}>
            {
                level === ROUTERLEVEL.VISITOR
                    ? (
                        <Button onClick={Login}>
                            Login
                        </Button>
                    )
                    : (
                        <>
                            {/* <span onClick={openMenu} className={styles.avatar}>{name}</span> */}
                            <Avatar
                                imgProps={{ onError: (e: any) => { e.target.src = '/img/avatar.png'; } }}
                                src={avatar}
                                onClick={openMenu}
                                className={styles.avatar}
                                alt={name}
                            />
                            <Popper open={Boolean(anchorEl)} anchorEl={anchorEl}>
                                <ClickAwayListener onClickAway={closeMenu}>
                                    <MenuList style={{ border: '1px solid #fff' }}>
                                        {level === ROUTERLEVEL.ADMIN ? <MenuItem onClick={GoAdminList}>管理</MenuItem> : null}
                                        <MenuItem onClick={Logout}>退出</MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Popper>

                        </>
                    )
            }
        </div>
    )
};

const ThemeBtn = ({ theme, changeThemeFun }) => {
    return (
        theme === THEME.dark ?
            <IconButton onClick={() => { changeThemeFun(THEME.light) }} aria-label="turn on the light">
                <Brightness7 />
            </IconButton> :
            <IconButton onClick={() => { changeThemeFun(THEME.dark) }} aria-label="turn off the light">
                <Brightness4 />
            </IconButton>
    )
}

interface IMobileNav {
    pathname: string
}
const MobileNav: React.SFC<IMobileNav> = ({ children, pathname }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const closeMenu = () => {
        setAnchorEl(null);
    };
    useEffect(() => {
        closeMenu();
    }, [pathname])
    return (
        <>
            <IconButton onClick={openMenu} edge="start" className={styles.menuButton} color="inherit" aria-label="menu">
                <Menu />
            </IconButton>
            <Popper open={Boolean(anchorEl)} anchorEl={anchorEl}>
                <ClickAwayListener onClickAway={closeMenu}>
                    {children}
                </ClickAwayListener>
            </Popper>
        </>

    )
}

export const Header: React.SFC = memo((props) => {
    // console.log('Header', props);
    const app: IAppReducer = useSelector((state: RootState) => { return state.app; });
    const { pageProgressStart, theme } = app;
    const router = useRouter();
    const dispatch = useDispatch();
    const { pathname } = router;
    const hasNavRouter = ROUTER_TABLE.filter((e) => e.navBtn);
    const currentRouter = ROUTER_TABLE.filter((e) => e.pathname === pathname)[0];
    const isSpecialSEO = currentRouter && currentRouter.specialSEO;
    const isNoHeader = currentRouter && currentRouter.noHeader;

    const SEOHeadProps = {
        keywords: currentRouter && currentRouter.keywords ? currentRouter.keywords : DEFAULTSEO.keywords,
        description: currentRouter && currentRouter.description ? currentRouter.description : DEFAULTSEO.description,
        title: currentRouter && currentRouter.documentTitle ? currentRouter.documentTitle : DEFAULTSEO.documentTitle,
    };

    const goNav = (pathname: string) => {
        pageProgressStart();
        router.push({
            pathname,
        });
    };
    const goHome = () => {
        router.push({
            pathname: "/",
        });
    }
    const changeThemeFun = async (val) => {
        await localforage.setItem('theme', val);
        dispatch(changeTheme(val))
    }
    return (
        <>
            {/* 是否要 header */}
            {isSpecialSEO ? null : <SEOHead {...SEOHeadProps} />}
            {/* 是否要 nav */}
            {
                isNoHeader ? null
                    : (
                        <>
                            <PageProgress />
                            <AppBar position="static" className={styles.header}>
                                <Toolbar>
                                    <Grid container>
                                        <Grid item md={1} xs={6}>
                                            <div onClick={goHome} className={styles.logo}>
                                                <Typography variant="h6">TaoLand</Typography>
                                            </div>
                                        </Grid>
                                        <Grid item container md={11} xs={6} justify="flex-end">
                                            <Hidden xsDown>
                                                <ul className={styles.nav}>
                                                    {
                                                        hasNavRouter.map((e, i) => {
                                                            return (
                                                                <li key={i} className={e.pathname === pathname ? styles.currentNav : null}>
                                                                    <Typography onClick={() => { goNav(e.pathname); }} variant="subtitle1" className={styles.txt}>{e.navBtn}</Typography>
                                                                </li>
                                                            );
                                                        })
                                                    }
                                                </ul>
                                            </Hidden>
                                            <ThemeBtn theme={theme} changeThemeFun={changeThemeFun} />
                                            <LoginBtn />
                                            <Hidden smUp>
                                                <MobileNav pathname={pathname}>
                                                    <MenuList style={theme === THEME.light ? { border: '1px solid #fff', background: '#eee' } : { border: '1px solid #fff', background: '#000' }}>
                                                        {
                                                            hasNavRouter.map((e, i) => {
                                                                return (
                                                                    <MenuItem key={i} onClick={() => { goNav(e.pathname); }} >{e.navBtn}</MenuItem>
                                                                );
                                                            })
                                                        }
                                                    </MenuList>
                                                </MobileNav>
                                            </Hidden>
                                        </Grid>
                                    </Grid>
                                </Toolbar>
                            </AppBar>
                            <ToTop />
                        </>
                    )
            }
        </>
    );
});
