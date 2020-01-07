import React, { memo, useState, useEffect } from 'react';
import { TextField, FormControl, InputLabel, Select, Input, MenuItem, Chip, TextareaAutosize, Grid, Button } from '@material-ui/core';
import ReactMarkdown from 'react-markdown';
import { useSnackbar } from 'notistack';

import styles from './FormAdmin.less';
import { useInputValue, useFetchBack } from '@/hooks';
import { EditorComponent, Upload } from '@/component';
import { GetArticleDetail, CreateArticle, UpdateArticle, AddImg } from '@/model/admin/server';
import { BASE } from '@/constans';


interface IFormAdmin {
    type: string,
    _id?: string,
    categoryCheckbox: any[],
    changeFormOpen: (flag: boolean) => void,
    ArticleListInit
}


export const FormAdmin: React.SFC<IFormAdmin> = memo((props) => {
    // console.log('FormAdmin',props)
    //= =====================data======================
    const { type, changeFormOpen, ArticleListInit, categoryCheckbox } = props;
    let [title, setTitle, titleProps] = useInputValue('');
    let [gist, setGist, gistProps] = useInputValue('');
    let [level, setLevel, levelProps] = useInputValue(0);
    let [content, setContent, contentProps] = useInputValue('');
    const [previewImg, setPreviewImg] = useState<string>(null);
    const { enqueueSnackbar } = useSnackbar();


    const [category, setCategory] = useState([]);
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 48 * 4.5 + 8,
                width: 250,
            },
        },
    };


    //= =====================function======================
    const changeCategory = (event: React.ChangeEvent<{ value: unknown }>) => {
        setCategory(event.target.value as string[]);
    };
    const init = async (_id) => {
        if (!_id) { return; }
        const json = await GetArticleDetail({ id: _id });
        const detail = json.data.current;
        console.log(detail);
        setTitle(detail.title);
        setGist(detail.gist);
        setLevel(detail.level);
        setContent(detail.content);
        setCategory(detail.category);
        setPreviewImg(detail.previewImg);
        // console.log(json);
    };
    const addImg = async (img, folderName) => {
        const { data: backInfo } = await AddImg({ img, folderName });
        useFetchBack(enqueueSnackbar, backInfo, async () => {
            enqueueSnackbar(backInfo.msg, {
                variant: 'success',
                autoHideDuration: 2000,
            });
            setContent(`${content}![](${BASE}${backInfo.imgPath})`);
        });
    };
    const canSubmit = () => {
        if (!title || !gist || !content || !previewImg || category.length === 0) {
            enqueueSnackbar('填写不完整', {
                variant: 'error',
                autoHideDuration: 2000,
            });
        } else {
            return true;
        }
    };
    const submit = async () => {
        if (type === 'article') {
            if (canSubmit()) {
                if (props._id) { // 更新
                    const { data: backInfo } = await UpdateArticle({
                        articleInformation: {
                            _id: props._id, title, gist, level, previewImg, content, category,
                        },
                    });
                    useFetchBack(enqueueSnackbar, backInfo, async () => {
                        enqueueSnackbar(backInfo.msg, {
                            variant: 'success',
                            autoHideDuration: 2000,
                        });
                        changeFormOpen(false);
                        ArticleListInit();
                    });
                } else { // 新增
                    const { data: backInfo } = await CreateArticle({
                        articleInformation: {
                            title, gist, level, previewImg, content, category, date: new Date().toLocaleString(),
                        },
                    });
                    useFetchBack(enqueueSnackbar, backInfo, async () => {
                        enqueueSnackbar(backInfo.msg, {
                            variant: 'success',
                            autoHideDuration: 2000,
                        });
                        changeFormOpen(false);
                        ArticleListInit();
                    });
                }
            }
        }
    };
    //= =====================effect======================
    useEffect(() => {
        init(props._id);
    }, [props._id]);
    //= =====================render======================
    if (type === 'article') {
        return (
            <form autoComplete="off" className={styles.form}>
                <TextField
                    {...titleProps}
                    label="标题"
                    placeholder="请输入标题"
                    fullWidth
                    margin="normal"
                    color="secondary"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    className={styles.item}
                />
                <TextField
                    {...gistProps}
                    label="摘要"
                    placeholder="请输入摘要"
                    fullWidth
                    margin="normal"
                    color="secondary"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    className={styles.item}
                />
                <TextField
                    {...levelProps}
                    label="顶置"
                    placeholder="数字越大越靠前"
                    fullWidth
                    margin="normal"
                    color="secondary"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    className={styles.item}
                />
                <FormControl className={`${styles.item} ${styles.category}`}>
                    <InputLabel>分类</InputLabel>
                    <Select
                        multiple
                        value={category}
                        onChange={changeCategory}
                        input={<Input />}
                        MenuProps={MenuProps}
                        renderValue={(selected) => (
                            <div className={styles.chips}>
                                {(selected as string[]).map((value) => (
                                    <Chip key={value} label={value} className={styles.chip} />
                                ))}
                            </div>
                        )}
                    >
                        {categoryCheckbox.map((name) => (
                            <MenuItem key={name} value={name}>
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth className={`${styles.item}`}>
                    <InputLabel>预览图</InputLabel>
                    <Upload
                        changeFun={(val) => setPreviewImg(val)}
                        value={previewImg && !previewImg.includes("data:image") ? `${BASE}${previewImg}` : previewImg}
                    />
                </FormControl>

                <FormControl fullWidth className={`${styles.item}`}>
                    <InputLabel>上传图片</InputLabel>
                    <Upload changeFun={(val) => addImg(val, 'article')} width={70} height={70} infoTxt="上传图片" />
                </FormControl>

                <FormControl fullWidth className={`${styles.item} ${styles.content}`}>
                    <Grid container spacing={4}>
                        <Grid item md={6}>
                            <TextareaAutosize
                                {...contentProps}
                                placeholder="请输入正文"
                            />
                        </Grid>
                        <Grid item md={6}>
                            <ReactMarkdown
                                source={content}
                                renderers={{
                                    image: EditorComponent.Image,
                                    code: EditorComponent.CodeBlock,
                                    blockquote: EditorComponent.Blockquote,
                                    list: EditorComponent.Ul,
                                }}
                            />
                        </Grid>
                    </Grid>
                </FormControl>
                <div style={{ textAlign: 'center', marginTop: 20 }}>
                    <Button onClick={submit} variant="contained">提交</Button>
                </div>
            </form>
        );
    } else if (type === 'demo') {
        return (
            <div>demo</div>
        );
    }
});
