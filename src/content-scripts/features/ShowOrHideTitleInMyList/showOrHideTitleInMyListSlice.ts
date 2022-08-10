import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: false,
};
export const showOrHideTitleInMyListSlice = createSlice({
  name: 'showOrHideTitleInMyList',
  initialState,
  reducers: {
    showOrHideTitleToggle: (state) => {
      state.value = !state.value;
    },
    setShowOrHideTitle: (state, { payload }) => {
      state.value = payload;
    },
  },
});

export const { showOrHideTitleToggle, setShowOrHideTitle } =
  showOrHideTitleInMyListSlice.actions;

export default showOrHideTitleInMyListSlice.reducer;
