
// 使用
// import { useSnackbar } from "notistack";
// const { enqueueSnackbar } = useSnackbar();
// const abc = () => {
//     let { data: adminInfo } = await SignIn({ account, password });
//     useFetchBack(enqueueSnackbar, adminInfo, async () => {
//         await localforage.setItem('userInfo', adminInfo);
//         await dispatch(changeUserInfo(adminInfo));
//     })
// }


interface IuseFetchBack {
    (
        alert,
        backInfo,
        succ?,
        fail?
    ): void
}

export const useFetchBack: IuseFetchBack = (alert, backInfo, succ, fail) => {
    if (backInfo.err) {
        alert(backInfo.err || '未知错误', {
            variant: 'error',
            autoHideDuration: 2000,
        });
        fail && fail();
    } else {
        succ && succ();
    }
};
