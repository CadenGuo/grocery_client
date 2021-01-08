import { all, fork } from 'redux-saga/effects';
import watchConnectivity from './connectivity';

export default function*() {
  yield all([
    fork(watchConnectivity),
  ]);
}
