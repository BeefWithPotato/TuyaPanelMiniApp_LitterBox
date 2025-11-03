import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TabType } from '@/constant';

export interface UIState {
  tab: TabType;
}

const initialState: UIState = {
  tab: TabType.Home,
};

/**
 * Slice
 */
const uiSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    updateUI(state, action: PayloadAction<Partial<UIState>>) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

/**
 * Actions
 */
export const { updateUI } = uiSlice.actions;

export default uiSlice.reducer;
