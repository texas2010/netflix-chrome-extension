import { createSlice } from '@reduxjs/toolkit';

export const sortByDropdownInMyList = createSlice({
  name: 'sortByDropdownInMyList',
  initialState: {
    text: 'Default',
    sortBy: 'DEFAULT',
  },
  reducers: {
    sortByAction: (state, action) => {
      state.text = action.payload.text;
      state.sortBy = action.payload.sortBy;
    },
  },
});

export const { sortByAction } = sortByDropdownInMyList.actions;

export default sortByDropdownInMyList.reducer;
