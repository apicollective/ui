// @flow
import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import * as request from 'superagent';

import type { Generator } from 'redux-saga';
import type { User } from 'login/models';
import type {
  LoginAction,
  DoingAction,
  SuccessAction,
  FailureAction,
} from 'login/reducers';
import type { Session } from 'login/Login';

type Authentication = {|
  user: User,
  session: Session,
|};

function api(githubCode: string): Promise<Authentication> {
  const host = process.env.APIDOC_HOST || '';
  return request
    .get(`${host}/authenticate_github`)
    .query({ token: githubCode });
}

const actions = {
  login: (githubCode: string): LoginAction => ({
    type: 'login/login',
    payload: githubCode,
  }),
  doing: (): DoingAction => ({
    type: 'login/doing',
  }),
  success: (session: Session): SuccessAction => ({
    type: 'login/success',
    payload: session,
  }),
  failure: (err: Error): FailureAction => ({
    type: 'login/failure',
    payload: err,
  }),
};

function* saga(action) {
  try {
    yield put(actions.doing());
    const { user } = yield call(api, action.payload.githubCode);
    yield put(actions.success(user));
  } catch (error) {
    yield put(actions.failure(error));
  }
}

function* takeLatestSaga(): Generator {
  yield* takeLatest('login/login', saga);
}

export { actions, takeLatestSaga };
