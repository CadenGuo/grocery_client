import { put, call, takeEvery, CallEffect } from 'redux-saga/effects';
import { notification } from 'antd';
import getErrorMsg, { genericError } from '../errors';
import { ACTION_STATUS } from '../constants';
import { ApiFun } from '../api';

const LOGOUT_FAILED = 'LOGOUT_FAILED';

export interface IBaseAction {
  type: string;
  [key: string]: any;
}

export interface IBaseActionType {
  REQUESTED: string;
  SUCCEEDED: string;
  FAILED: string;
  name: string;
}

const createRequestType = (name: string) => {
  return {
    [name]: {
      name,
      REQUESTED: `${name}_REQUESTED`,
      SUCCEEDED: `${name}_SUCCEEDED`,
      FAILED: `${name}_FAILED`,
    },
  };
};

const createRequestTypes = <T extends string>(...names: T[]): { [P in T]: IBaseActionType } => {
  return Object.assign({}, ...names.map((name) => createRequestType(name as any)));
};

const createRequestStatus = (name: string) => {
  return {
    [name]: null,
  };
};

const createActionStatusManager = <T extends string>(...names: T[]) =>
  (state = Object.assign({}, ...names.map(createRequestStatus)), action: IBaseAction) => {
    const actionTypeName = action.type.split('_').slice(0, -1).join('_');
    const actionTypeState = action.type.split('_').slice(-1).join('_');
    if (!Object.keys(state).includes(actionTypeName)) {
      return state;
    }
    if (actionTypeState === 'REQUESTED'
      || actionTypeState === 'SUCCEEDED'
      || actionTypeState === 'FAILED') {
      return {
        ...state,
        [actionTypeName]: actionTypeState,
      };
    }
    return state;
  };

type SagaFunction = ({ params }: { params: any }) => CallEffect;
const createSaga = (apiFn: SagaFunction, actionType: IBaseActionType) => {
  // tslint:disable-next-line
  return function* (args: any) {
    try {
      const response = yield apiFn(args);
      if (!response.error) {
        yield put({
          type: actionType.SUCCEEDED,
          data: response.data || response,
          extras: args.extras,
          name: actionType.name,
        });
      } else {
        yield put({
          type: actionType.FAILED,
          error: getErrorMsg(response.error_msg),
          name: actionType.name,
        });
      }
    } catch (error) {
      yield put({
        type: actionType.FAILED,
        error: genericError(error),
        name: actionType.name,
      });
    }
  };
};

const createSagaWatcherWrapper = (actionType: IBaseActionType, api: ApiFun<object> | ApiFun<FormData>) => {
  const sagaFunction: SagaFunction = ({ params }) => call(api, params || {});
  const sagaWrapper = createSaga(sagaFunction, actionType);
  return takeEvery(actionType.REQUESTED, sagaWrapper);
};

const isActionSuccess = (actionStatus: string) => {
  return actionStatus === ACTION_STATUS.SUCCEEDED;
};

const isActionPending = (actionStatus: string) => {
  return actionStatus === ACTION_STATUS.REQUESTED;
};

const isAllActionSuccess = (...actions: string[]) => {
  return actions.reduce((acc, curr) => (curr === ACTION_STATUS.SUCCEEDED && acc), true);
};

const isBatchActionsPending = (...actionStatuses: string[]) => {
  return actionStatuses.map(isActionPending).filter(isOneActionPending => isOneActionPending).length > 0;
};

export const isBatchActionsChanged = (
  prevProps: { [key: string]: any },
  actionsStatusObject: { [key: string]: string },
) => {
  const actionsStatusArray = Object.entries(actionsStatusObject);
  const actionChangedInfoArray = actionsStatusArray.map(actionStatus => actionStatus[1] !== prevProps[actionStatus[0]]);
  const actionSucceedInfoArray = actionsStatusArray.map(actionStatus => actionStatus[1] === ACTION_STATUS.SUCCEEDED);

  return (
    Boolean(actionChangedInfoArray
      .filter(actionChangedInfo => actionChangedInfo)[0])
    && Boolean(actionSucceedInfoArray
      .filter(actionSucceedInfo => actionSucceedInfo)[0])
  );
};

export const isBatchActionsFailed = (
  prevProps: { [key: string]: any },
  actionsStatusObject: { [key: string]: string },
) => {
  const actionsStatusArray = Object.entries(actionsStatusObject);
  const actionChangedInfoArray = actionsStatusArray.map(actionStatus => actionStatus[1] !== prevProps[actionStatus[0]]);
  const actionSucceedInfoArray = actionsStatusArray.map(actionStatus => actionStatus[1] === ACTION_STATUS.FAILED);

  return (
    Boolean(actionChangedInfoArray
      .filter(actionChangedInfo => actionChangedInfo)[0])
    && Boolean(actionSucceedInfoArray
      .filter(actionSucceedInfo => actionSucceedInfo)[0])
  );
};

const notifySuccess = (message = '') => {
  return notification['success']({
    message: 'Success',
    description: message,
    duration: 8,
  });
};

const notifyError = (message = '') => {
  return notification['error']({
    message: 'Error',
    description: message,
    duration: 8,
  });
};

const notifyWarning = (message = '') => {
  return notification['warning']({
    message: 'Warning',
    description: message,
    duration: 8,
  });
};

export {
  createSaga,
  createActionStatusManager,
  createSagaWatcherWrapper,
  isActionPending,
  isActionSuccess,
  isAllActionSuccess,
  isBatchActionsPending,
  notifySuccess,
  notifyError,
  notifyWarning,
  LOGOUT_FAILED,
};

export default createRequestTypes;
