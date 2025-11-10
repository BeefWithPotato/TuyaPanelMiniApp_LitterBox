import { UIState, updateUI as updateUIAction } from '@/redux/modules/uiSlice';
import store from '@/redux';

export const updateUI = (data: Partial<UIState>) => {
  store.dispatch(updateUIAction(data));
};

export const getExcessiveData = async () => {
  const state = store.getState();
  return state;
};
