import { all } from 'redux-saga/effects';
import home from './home/saga';
import admin from './admin/saga';


export default function* rootSagas() {
  yield all([
    ...home,
    ...admin,
  ]);
}
