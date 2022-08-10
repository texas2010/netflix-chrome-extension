import { configureStore } from '@reduxjs/toolkit';

import {
  sortByDropdownInMyListReducer,
  showOrHideTitleInMyListReducer,
} from '@content-scripts/features';

export const store = configureStore({
  reducer: {
    sortByDropdownInMyList: sortByDropdownInMyListReducer,
    showOrHideTitleInMyList: showOrHideTitleInMyListReducer,
  },
});
