import React, { useState, useEffect } from 'react';
import { CameraAlt, CheckCircle, CancelOutlined } from '@material-ui/icons';


import styles from './Upload.less';


/**
 * 压缩图片
 * @param {*} img
 * @return base64
 */
const compress = (img) => {
    let { width } = img;
    let { height } = img;
    // 如果图片大于四百万像素，计算压缩比并将大小压至300万以下
    let ratio;
    if ((ratio = width * height / 3000000) > 1) {
        ratio = Math.sqrt(ratio);
        width /= ratio;
        height /= ratio;
    } else {
        ratio = 1;
    }

    //  用于压缩图片的canvas
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    //    瓦片canvas
    let tCanvas = document.createElement('canvas');
    let tctx = tCanvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // 如果图片像素大于100万则使用瓦片绘制
    let count;
    if ((count = width * height / 1000000) > 1) {
        count = ~~(Math.sqrt(count) + 1); // 计算要分成多少块瓦片
        // 计算每块瓦片的宽和高
        let nw = ~~(width / count);
        let nh = ~~(height / count);

        tCanvas.width = nw;
        tCanvas.height = nh;
        for (let i = 0; i < count; i++) {
            for (let j = 0; j < count; j++) {
                tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
                ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
            }
        }
    } else {
        ctx.drawImage(img, 0, 0, width, height);
    }
    let newData = canvas.toDataURL('image/jpeg', 0.5); // file.type
    return newData;
};
// 将base64转换为file
export const dataURLtoFile = (dataurl, name) => {
    let arr = dataurl.split(',');
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], name, { type: mime });
};


// 各类型默认信息
const types = {
    default: { bgp: '', infoTxt: '上传预览图' },
    noInfo: { bgp: '', infoTxt: '' },
    // 'id1': { bgp: img_IDfront, infoTxt: '上传正面(照片面)' },
    // 'id2': { bgp: img_IDback, infoTxt: '上传背面(国徽面)' },
    // 'house1': { bgp: img_house1, infoTxt: '拍摄房产证影像' },
    // 'house2': { bgp: img_house2, infoTxt: '拍摄房产证附记页' },
    // 'license': { bgp: img_license, infoTxt: '拍摄营业执照' },
    // 'marry': { bgp: img_marry, infoTxt: '拍摄结婚证' },
};
/**
 * 上传组件
 * @param  width
 * @param  height
 * @param  bgp
 * @param  cameraOnly
 * @param  changeFun
 * @param  clearImg
 */

interface IUpload {
    fileType?: 'base64' | 'file', // 文件类型,base64或file
    cameraOnly?: boolean, // true为只能照相，false为照相或者选择文件
    type?: string,
    width?: number, // 长
    height?: number, // 宽
    style?: any,//样式
    bgp?: string, // 背景图
    infoTxt?: string, // 文字信息
    value?: string, // 反显的图片值
    status?: number, // 状态码，1成功，2失败
    changeFun?: any, // 回调，返回压缩后的base64或文件
}
export const Upload: React.SFC<IUpload> = React.memo(({
    fileType = 'base64',
    cameraOnly = false,
    type = 'default',
    width = 200,
    height = 200,
    style,
    bgp = types[type].bgp,
    infoTxt = types[type].infoTxt,
    value,
    status,
    changeFun,
}) => {
    const [previewImg, setPreviewImg] = useState(null);
    useEffect(() => {
        setPreviewImg(value);
    }, [value]);
    const handleChange = (e) => {
        let files = e.target.files || e.dataTransfer.files;
        // console.log(files)
        if (!files.length) return;

        if (typeof FileReader === 'undefined') {
            alert('您的浏览器不支持图片上传，请升级您的浏览器');
        }
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = function (e) {
            let image = new Image();
            image.src = (e.target.result as string); // 原始base64
            image.setAttribute('crossOrigin', 'anonymous'); // 允许图片跨域请求、必须后台也允许
            image.onload = () => {
                let base64 = null;
                if (files[0].size < 1048576) { // 1024*1024
                    base64 = image.src;
                } else {
                    base64 = compress(image); // 使用cavas压缩
                }
                // console.log(base64);
                setPreviewImg(base64);

                if (fileType === 'file') {
                    changeFun && changeFun(dataURLtoFile(base64, files[0].name));
                    return;
                }
                changeFun && changeFun(base64);
            };
        };
    };
    return (
        <div className={styles.upload} style={{ width, height, ...style }}>
            <input
                type="file"
                accept="image/*"
                {...cameraOnly ? { capture: 'camera' } : {}}
                onChange={handleChange}
                className={styles.upload_input}
            />
            <div className={styles.upload_info}>
                {/* <img src={img_camareIcon} className={styles.uploadInfo_camare} alt="照相机图标" /> */}
                <CameraAlt className={styles.uploadInfo_camare} />
                <p className={styles.uploadInfo_txt}>{infoTxt}</p>
                {
                    status === 1
                        ? <CheckCircle className={`${styles.uploadInfo_status} ${styles.uploadInfo_status__res}`} />
                        // <img src={img_done} className={styles.uploadInfo_status} alt="成功" />
                        : status === 2
                            ? <CancelOutlined className={`${styles.uploadInfo_status} ${styles.uploadInfo_status__rej}`} />
                            // <img src={img_fail} className={styles.uploadInfo_status} alt="失败" />
                            : null
                }
            </div>
            {
                previewImg
                    ? <img src={previewImg} className={styles.upload_bgp__filter} alt="" />
                    : bgp
                        ? <img src={bgp} className={styles.upload_bgp} alt="" />
                        : null
            }
        </div>
    );
});
