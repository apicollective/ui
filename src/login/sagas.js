// @flow
import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import * as superagent from 'superagent';

import type { Generator } from 'redux-saga';
import type {
  LoginAction,
  DoingAction,
  SuccessAction,
  FailureAction,
} from 'login/reducers';
import type { Session } from 'login/Login';

export type Authentication = {|
  session: Session,
|};

function api(githubCode: string): Promise<Response> {
  const host = process.env.APIDOC_HOST || '';
  const res = superagent
    .get(`${host}/authenticate_github`)
    .query({ token: githubCode });
  return res;
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
    const { body } = yield call(api, action.payload.body);
    yield put(actions.success(body.session));
  } catch (error) {
    yield put(actions.failure(error));
  }
}

function* takeLatestSaga(): Generator {
  yield* takeLatest('login/login', saga);
}

export { actions, takeLatestSaga };
