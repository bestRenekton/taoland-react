import { combineReducers } from 'redux';
import app from './app/reducer';
import home from './home/reducer';
import admin from './admin/reducer';


const RootRuducer = combineReducers({
    app,
    home,
    admin,
});
export default RootRuducer;

export type RootState = ReturnType<typeof RootRuducer>
