import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { responseUpdateDpCreator, updateDpCreator } from '@ray-js/tuya-dp-kit';
import { excretionTimeDay, excretionTimesDay } from '@/config/dpCodes';
import { devInfoChange } from './devInfoSlice';
import { ReduxState } from '..';

export type DpState = {
  /**
   * 在此自定义你的当前项目 dp type
   */
  [excretionTimeDay]: number;
  [excretionTimesDay]: number;
};

export type DpStateKey = keyof DpState;

type UpdateDpStatePayload = Partial<DpState>;

export const responseUpdateDp = responseUpdateDpCreator();
/**
 * 请全程使用该方法进行下发!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  dispatch(updateDp({ switch: true }, options))
 */
export const updateDp = updateDpCreator<UpdateDpStatePayload>();

/**
 * Slice
 */
const dpStateSlice = createSlice({
  name: 'dpState',
  initialState: {} as DpState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(devInfoChange, (state, action) => {
      const { state: devState } = action.payload;
      return { ...state, ...(devState as DpState) };
    });
    builder.addCase(responseUpdateDp, (state, action: PayloadAction<UpdateDpStatePayload>) => ({
      ...state,
      ...action.payload,
    }));
  },
});

export default dpStateSlice.reducer;

/**
 * Selectors
 */
export const selectDpState = (state: ReduxState) => state.dpState;

type SelectDpState = <T extends DpStateKey>(dpCode: T) => (state: ReduxState) => DpState[T];
/* 选择一个dp值 */
export const selectDpStateByCode: SelectDpState = dpCode => state => state.dpState[dpCode];

/* 选择多个dp值的集合 */
export const selectDpStateMultiple =
  <T extends DpStateKey>(keys: T[]) =>
  (state: ReduxState) =>
    keys.map(key => state.dpState[key]);
