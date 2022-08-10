import {
  ShowOrHideTitleInMyList,
  SortByDropdownInMyList,
} from '@content-scripts/features';

import { SortMyListItems } from './SortMyListItems';

export const MyList = () => {
  return (
    <>
      <ShowOrHideTitleInMyList />
      <SortByDropdownInMyList />
      <SortMyListItems />
    </>
  );
};
