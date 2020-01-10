import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { IconButton } from '@material-ui/core';
import { MailOutline, GitHub, MusicVideo } from '@material-ui/icons';

import styles from './about.less';
import { useInitHeight } from '@/hooks';
import { IAppReducer } from '@/interface/app';
import { RootState } from '@/model/rootReducer';
import { CommentLoadable } from '@/component';
import { ROUTERLEVEL } from '@/constant';



const About: NextPage = (props) => {
    //= =====================data======================
    // console.log('about', props);
    const router = useRouter();
    const app: IAppReducer = useSelector((state: RootState) => { return state.app; });
    const { pageProgressEnd, userInfo } = app;
    const { level } = userInfo;

    //= =====================function======================
    // 去登陆
    const goLogin = () => {
        router.push('/admin/login');
    };
    //= =====================effect======================
    useInitHeight();
    useEffect(() => {
        pageProgressEnd && pageProgressEnd();
    }, []);
    //= =====================render======================
    return (
        <div className={`mainPage ${styles.about}`}>
            <div className={styles.main}>
                <div className={styles.card}>
                    <p className={styles.title} id="anchor-about">关于我</p>
                    <div className={styles.body}>
                        <p className={styles.txt}>并不是科班出身，学的是物理，后来从事不喜欢的工作，直到遇到前端.</p>
                        <p className={styles.txt}>非常喜欢,开始自学,遇到过很多坑,但是一直坚持,坚信终有一天自己也会变强!</p>
                    </div>
                </div>
                <div className={styles.card}>
                    <p className={styles.title} id="anchor-contact">联系我</p>
                    <div className={styles.body}>
                        <div className={styles.contact}>
                            <IconButton aria-label="https://github.com/bestRenekton">
                                <a href="https://github.com/bestRenekton" target="_blank"><GitHub fontSize="large" /></a>
                            </IconButton>
                            <IconButton aria-label="342060286@qq.com">
                                <a href="mailto:342060286@qq.com"><MailOutline fontSize="large" /></a>
                            </IconButton>
                            <IconButton aria-label="http://music.163.com/#/user/home?id=272667179">
                                <a href="http://music.163.com/#/user/home?id=272667179" target="_blank"><MusicVideo fontSize="large" /></a>
                            </IconButton>
                        </div>
                    </div>
                </div>
                <div className={styles.card}>
                    <p className={styles.title} id="anchor-us">关于本站</p>
                    <ul>
                        <li>这个博客主要用于记录一个菜鸟程序猿的Growth之路.</li>
                        <li>这也是自己第一次做博客，希望和大家多多交流，一起成长！</li>
                        <li>老站为vue,express,地址：<a href="https://github.com/bestRenekton/taoLand" target="_blank">vue老站</a></li>
                        <li>2020年用TypeScript,React,Koa重构了前后端,支持SSR,PWA了,UI总的来说更简洁,暗黑了...,地址：<a href="https://github.com/bestRenekton/taoland-react" target="_blank">react重构</a></li>
                        <ul>
                            <li>实现了用户Github三方注册、登录、检测登录、博客管理（增删改查）、图片上传、标签分类等功能。</li>
                            <li>前端使用TypeScript,React,Hooks,Redux,Saga技术栈,没用dva</li>
                            <li>框架选的Next,实现了SSR,UI用的MaterialUI</li>
                            <li>后端使用Node,框架用的Koa</li>
                            <li>数据库采用MongoDB</li>
                            <li>配置了PWA离线设置</li>
                            <li>使用Docker来进行部署</li>
                            <li>服务器是CentOS的</li>
                        </ul>
                    </ul>
                </div>
                <div className={styles.card}>
                    <p className={styles.title} id="anchor-contact">更新</p>
                    <div className={styles.body}>
                        <div className={styles.update}>
                            <p><em>2018.2.28 v1.0.1</em></p>
                            <ul>
                                <li>个人博客vue第一版上线</li>
                            </ul>
                            <p><em>2018.3.20 v1.1.1</em></p>
                            <ul>
                                <li>新增流量统计功能,新增token功能,升到https,若干bug</li>
                            </ul>
                            <p><em>2018.6.10 v1.2.1</em></p>
                            <ul>
                                <li>大幅提高首页渲染速度,看板娘上线,若干优化</li>
                            </ul>
                            <p><em>2018.7.23 v1.3.1</em></p>
                            <ul>
                                <li>游客登陆/注册/检测,图片上传,评论留言,文章分享功能,上一篇下一篇,BGM</li>
                            </ul>
                            <p><em>2018.8.12 v1.3.2</em></p>
                            <ul>
                                <li>评论表情,默认头像优化,看板娘组件化</li>
                            </ul>
                            <p><em>2018.10.17 v1.3.3</em></p>
                            <ul>
                                <li>小屏幕适配问题</li>
                            </ul>
                            <p><em>2019.2.8 v1.3.4</em></p>
                            <ul>
                                <li>后端配合路由history模式,首页返回记住位置</li>
                            </ul>
                            <p><em>2019.4.13 v1.4.0</em></p>
                            <ul>
                                <li>分页功能,若干bug</li>
                            </ul>
                            <p><em>2019.7.21 v1.5.0</em></p>
                            <ul>
                                <li>life模块,评论bug</li>
                            </ul>
                            <p><em>2020.1.05 v2.0.1</em></p>
                            <ul>
                                <li>react,koa,暗黑重构版上线...</li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* <div className="card">
                    <p className="card-title" id="anchor-wx">小程序版</p>
                    <p className="txt">此为个人博客小程序版，平时可能会用来做一些小程序的东西。</p>
                    <img src="/img/wx.jpg" alt="wx" />
                </div> */}
                <div className={styles.card}>
                    <p className={styles.title} id="anchor-friend">友情链接</p>
                    <div className={styles.body}>
                        <div className={styles.link}>
                            <a className="link" href="https://blog.yuanaaa.top/home" target="_blank">博客|吴予安</a>|
                        <a className="link" href="http://www.wujingfeng.cn" target="_blank">博客|wjf</a>
                        </div>
                    </div>
                </div>
            </div>
            {/* 评论 */}
            <CommentLoadable
                articleId="message"
                goLogin={goLogin}
                canComment={level >= ROUTERLEVEL.LOGIN}
            />
        </div>

    );
};

export default About;
