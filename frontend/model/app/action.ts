import { IUserInfo } from '@/interface/app';

export const changeDevice = (device: number) => ({
    type: 'CHANGEDEVICE',
    payload: {
        device,
    },
});

export const changeUserInfo = (userInfo: IUserInfo) => ({
    type: 'CHANGEUSERINFO',
    payload: {
        userInfo,
    },
});

export const changeTheme = (theme: string) => ({
    type: 'CHANGETHEME',
    payload: {
        theme,
    },
});

export const initPageProgress = (start, end) => ({
    type: 'INITPAGEPROGRESS',
    payload: {
        start, end,
    },
});
