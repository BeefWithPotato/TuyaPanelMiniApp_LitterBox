import { publishDps } from '@ray-js/ray';
import { Action, configureStore, Middleware, ThunkDispatch } from '@reduxjs/toolkit';
import { createDpKitMiddleware } from '@ray-js/tuya-dp-kit';
import { createLogger } from 'redux-logger';
import devInfoReducer from './modules/devInfoSlice';
import dpStateReducer, { DpState, DpStateKey } from './modules/dpStateSlice';
import themeReducer from './modules/themeSlice';
import systemInfoReducer from './modules/systemInfoSlice';
import uiReducer from './modules/uiSlice';
import { getDevId, getDpIdByCode } from '@/utils';
import { shallowEqual, useDispatch, useSelector as useSelectorBase } from 'react-redux';

const isDebug = process.env.NODE_ENV === 'development';
const logger = createLogger({
  predicate: () => isDebug,
  collapsed: true,
  duration: true,
});

const dpKitMiddleware: Middleware = createDpKitMiddleware<DpState, ReduxState>({
  putDeviceData: (dpState: Partial<DpState>) => {
    const dps = {};
    Object.keys(dpState).forEach((dpCode: DpStateKey) => {
      dps[getDpIdByCode(dpCode)] = dpState[dpCode];
    });

    console.log('下发dp', dpState);

    publishDps({
      deviceId: getDevId(),
      dps,
      mode: 2,
      pipelines: [],
      options: {}, // 0，静音； 1，震动；2,声音； 3，震动声音
      fail: d => {
        console.log('-----返回结果错误?', d);
      },
    });
  },
});

const middlewares = isDebug ? [logger, dpKitMiddleware] : [dpKitMiddleware];

const store = configureStore({
  reducer: {
    devInfo: devInfoReducer,
    dpState: dpStateReducer,
    uiState: uiReducer,
    theme: themeReducer,
    systemInfo: systemInfoReducer,
  },
  /**
   * toolkit默认有检测serializable的中间件 state.theme有很多函数 会导致serializable检测的报错 是否考虑重新对theme的组织？
   * https://redux.js.org/faq/organizing-state#can-i-put-functions-promises-or-other-non-serializable-items-in-my-store-state
   */
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }).concat(middlewares),
});

export type ReduxState = ReturnType<typeof store.getState>;
export type ThunkAppDispatch = ThunkDispatch<ReduxState, void, Action>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useSelector = <TSelected>(
  selector: (state: ReduxState) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean
) => useSelectorBase<ReduxState, TSelected>(selector, equalityFn || shallowEqual);

export default store;
