/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';

import Portal from '../Portal';
import FilterTags from './FilterTags';

import './styles.scss';
// const MyListParent = (): JSX.Element => {
//   const realRowListArr: Element[] = Array.from(
//     document.querySelectorAll('.rowListItem')
//   );

//   return (
//     <>
//       <Portal selector="#n-filter-tags">
//         <FilterTags filterArr={filterArr} />
//       </Portal>
//       {realRowListArr
//         .map((listItem) => `#${listItem.id}`)
//         .map((id: string): React.ReactPortal => {
//           const el = document.querySelector(`${id} .notes`) as Element;
//           return ReactDOM.createPortal(<h2>Test Message</h2>, el);
//         })}
//     </>
//   );
// };

const checkElementExist = (
  selector: string,
  setCallback: (data: boolean) => void
): (() => void) => {
  const started = Date.now();
  const timerID = setTimeout(function tick() {
    console.log('tick');
    const isElementExist: Element | null = document.querySelector(selector);
    if (Date.now() - started > 10000) {
      clearTimeout(timerID);
      console.log('tick stopped');
    } else if (isElementExist) {
      setCallback(true);
    } else {
      console.log('tick again');
      setTimeout(tick, 1000);
    }
  }, 1000);
  return (): void => {
    clearTimeout(timerID);
    console.log('clean tick');
  };
};

// eslint-disable-next-line no-undef
const MyListPage = (): JSX.Element => {
  const myListHeading: Element | null = document.querySelector(
    '.sub-header .galleryHeader'
  );
  const rowList: Element | null = document.querySelector('.mainView .rowList');
  const [isMyListHeadingExist, setMyListHeadingExist] = useState(false);
  const [isRowListExist, setRowListExist] = useState(false);

  useEffect(() => {
    const clear = checkElementExist(
      '.sub-header .galleryHeader',
      setMyListHeadingExist
    );
    return (): void => {
      clear();
    };
  }, []);

  useEffect(() => {
    const clear = checkElementExist('.mainView .rowList', setRowListExist);
    return (): void => {
      clear();
    };
  }, []);

  useEffect(() => {
    const myListFilterTags: Element = document.createElement('div');
    myListFilterTags.setAttribute('id', 'n-filter-tags');
    if (isMyListHeadingExist) {
      myListHeading?.appendChild(myListFilterTags);
      console.log('myListFilterTags added');
    }
    return (): void => {
      myListFilterTags.remove();
      console.log('myListFilterTags removed');
    };
  }, [myListHeading, isMyListHeadingExist]);

  if (isMyListHeadingExist && myListHeading && isRowListExist && rowList) {
    return (
      <>
        <h1>My List Page</h1>
        <h2>load finished</h2>
        <Portal selector="#n-filter-tags">
          <FilterTags />
        </Portal>
      </>
    );
  }
  return (
    <>
      <h1>My List Page</h1>
    </>
  );
};

export default MyListPage;
