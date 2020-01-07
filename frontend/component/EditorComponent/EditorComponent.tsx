import React, { memo } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { useSnackbar } from 'notistack';
import styles from './EditorComponent.less';
import tomororrow from './tomorrow.json';


/**
 * 复制
 * @param val
 * @param cb
 */
function copyFunciton(val: string, cb: () => void) {
    let area = document.getElementById('COPYAREA');
    (area as HTMLInputElement).value = val;
    (area as HTMLInputElement).select(); // 选择对象
    document.execCommand('Copy'); // 执行浏览器复制命令
    cb();
    // var temp = document.createElement('textarea');
    // temp.value = val;
    // document.body.appendChild(temp);
    // temp.select(); // 选择对象
    // document.execCommand("Copy"); // 执行浏览器复制命令
    // temp.style.display = 'none';
    // console.log('复制成功');
}

/**
 * 代码块
 */
interface ICodeBlock {
    value: string
}
const CodeBlock: React.SFC<ICodeBlock> = memo((props) => {
    // console.log('CodeBlock', props)
    const { enqueueSnackbar } = useSnackbar();

    const copy = () => {
        copyFunciton(props.value, () => {
            enqueueSnackbar('复制成功~~', {
                variant: 'success',
                autoHideDuration: 2000,
            });
        });
    };
    return (
        <div className={styles.codeBlock}>
            <span className={styles.codeBlock_copyBtn} onClick={copy}>copy</span>
            <SyntaxHighlighter language="javascript" style={tomororrow}>
                {props.value}
            </SyntaxHighlighter>
        </div>
    );
});


/**
 * 图片
 */
interface IImage {
    alt: string,
    src: string
}
const Image = memo((props: IImage) => {
    return (
        <>
            <img {...props} className={styles.image} alt={props.alt} />
            <span className={styles.imageAlt}>{props.alt}</span>
        </>
    );
});


/**
 * 引用
 */
const Blockquote = memo((props) => <blockquote {...props} className={styles.blockquote} />);


/**
 * 列表
 */
interface IUl {
    depth: number,
    ordered: boolean,
    start: number,
    tight: boolean
}
const Ul = memo((props: IUl) => {
    // console.log(props);
    let { ordered, tight, ...other } = props;
    return (
        ordered
            ? <ol {...other} className={styles.ul} />
            : <ul {...other} className={styles.ul} />
    );
});


export const EditorComponent = {
    CodeBlock,
    Image,
    Blockquote,
    Ul,
};
