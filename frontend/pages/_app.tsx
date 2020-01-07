import React from 'react';
import { Provider } from 'react-redux';
import App from 'next/app';
import localforage from 'localforage';
import withReduxSaga from 'next-redux-saga';
import withRedux from 'next-redux-wrapper';


import createStore from '@/model/store';
import { Layout } from '@/component';
import { changeUserInfo, changeTheme } from '@/model/app/action';
import { IUserInfo } from '@/interface/app';


class MyApp extends App {
    props: any;

    componentDidMount() {
        this.setTheme();
        this.setUserInfo();
        this.leaveWelcomePage();
        // this.props.router.events.on('routeChangeStart', this.handleRouteChange)
    }

    // handleRouteChange = url => {
    //     console.log('App is changing to: ', url)
    // }
    leaveWelcomePage = () => {
        let welcomePage = document.getElementById('WELCOME');
        if (welcomePage) {
            let parent = welcomePage.parentNode;
            parent.removeChild(welcomePage);
        }
    }

    setUserInfo = async () => {
        const userInfo: IUserInfo = await localforage.getItem('userInfo');
        userInfo && this.props.store.dispatch(changeUserInfo(userInfo));
    }

    setTheme = async () => {
        const theme: string = await localforage.getItem('theme');
        theme && this.props.store.dispatch(changeTheme(theme));
    }

    render() {
        const { Component, pageProps, store, router } = this.props;
        return (
            // <React.Profiler id="app" onRender={Profiler}>
            <Provider store={store}>
                <Layout
                    Component={Component}
                    pageProps={pageProps}
                    router={router}
                />
            </Provider>
            // </React.Profiler>
        );
    }
}

export default withRedux(createStore)(withReduxSaga(MyApp));
