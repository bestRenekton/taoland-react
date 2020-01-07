import React from 'react';
import Head from 'next/head';


interface ISEOHead {
    keywords: string,
    description: string,
    title: string,
}


export const SEOHead: React.SFC<ISEOHead> = (props) => {
    return (
        <Head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover" />
            {/* SEO 优化 */}
            <meta name="keywords" content={props.keywords} />
            <meta name="description" content={props.description} />
            <meta name="author" content="yyt" />
            <meta name="robots" content="index,follow" />
            <link rel="shortcut icon" type="image/ico" href="/img/tao.ico" />
            {/* css */}
            <link rel="stylesheet" href="/css/normalize.css" />
            <link rel="stylesheet" href="/css/animate.min.css" />
            <link rel="stylesheet" href="/css/main.css" />
            {/* <link rel="stylesheet" href="/font/RobotoFont.css" /> */}
            {/* <script src="https://res2.wx.qq.com/open/js/jweixin-1.4.0.js" type="text/javascript"></script> */}
            <script src="/js/md5.js" type="text/javascript" />
            <title>{props.title}</title>
        </Head>
    );
};
