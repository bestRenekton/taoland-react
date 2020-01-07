import React from 'react'
// import Loadable from 'react-loadable';
import loadable from '@loadable/component';

import { CardLoading } from './Card/Card';
import { CommentLoading } from './Comment/Comment';







// 总体布局
export { Layout } from './layout/Layout';
export { Header } from './layout/Header';
export { Footer } from './layout/Footer';
export { SEOHead } from './layout/SEOHead';
export { ToTop } from './ToTop/ToTop';
export { PageProgress } from './PageProgress/PageProgress';
export { ErrorBoundary } from './ErrorBoundary/ErrorBoundary';
export { MusicPlayer } from './MusicPlayer/MusicPlayer';

// 列表卡片
export const LoadableCard: (type?: 'demo' | 'article') => any = (type) => {
    return loadable(() => import('./Card/Card').then(({ Card }) => Card), {
        fallback: <CardLoading type={type} />,
    });
};

// 编辑器渲染
export { EditorComponent } from './EditorComponent/EditorComponent';
// 分页
export { ListPagination } from './ListPagination/ListPagination';
// admin表格
export { TableAdmin } from './TableAdmin/TableAdmin';
// admin表单
export { FormAdmin } from './FormAdmin/FormAdmin';
// 上传图片
export { Upload } from './Upload/Upload';
// 评论
export const CommentLoadable = loadable(() => import('./Comment/Comment').then(({ Comment }) => Comment), {
    fallback: <CommentLoading />,
});
