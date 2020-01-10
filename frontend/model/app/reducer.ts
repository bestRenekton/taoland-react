import { DEVICE, DEFAULTUSERINFO, THEME } from '@/constant';
import { IAppReducer } from '@/interface/app';

const initState: IAppReducer = {
    device: DEVICE.PC,
    userInfo: DEFAULTUSERINFO,
    theme: THEME.dark,
    pageProgressStart: () => { },
    pageProgressEnd: () => { },
};


const app = (state = initState, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'CHANGEDEVICE':
            return { ...state, device: payload.device };
        case 'CHANGEUSERINFO':
            return { ...state, userInfo: payload.userInfo };
        case 'CHANGETHEME':
            return { ...state, theme: payload.theme };
        case 'INITPAGEPROGRESS':
            return { ...state, pageProgressStart: payload.start, pageProgressEnd: payload.end };
        default:
            return state;
    }
};

export default app;
