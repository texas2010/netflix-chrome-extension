/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import Portal from '../Portal';
import FilterTags from './FilterTags';

import './styles.scss';

// eslint-disable-next-line no-undef
const MyListParent = (): JSX.Element => {
  const realRowListArr: Element[] = Array.from(
    document.querySelectorAll('.rowListItem')
  );

  const [filterArr] = useState([
    { text: 'Show All' },
    { text: 'Must Watch' },
    { text: 'Movie' },
    { text: 'Tv Show' },
    { text: 'Complete' },
    { text: 'Incomplete' },
    { text: 'Watching' },
  ]);

  // const getRowListIDs = (): string[] => {
  //   return realRowListArr.map((listItem) => `#${listItem.id}`);
  // };

  return (
    <>
      <Portal selector="#n-filter-tags">
        <FilterTags filterArr={filterArr} />
      </Portal>
      {realRowListArr
        .map((listItem) => `#${listItem.id}`)
        .map((id: string): React.ReactPortal => {
          const el = document.querySelector(`${id} .notes`) as Element;
          return ReactDOM.createPortal(<h2>Test Message</h2>, el);
        })}
    </>
  );
};

const render = (): void => {
  const myListParentRoot: Element | null = document.getElementById(
    'my-list-parent-root'
  );
  const myListHeading: Element | null = document.querySelector(
    '.sub-header .galleryHeader'
  );
  const rowList: Element | null = document.querySelector('.mainView .rowList');

  const myListFilterTags: Element = document.createElement('div');
  myListFilterTags.setAttribute('id', 'n-filter-tags');
  myListHeading?.appendChild(myListFilterTags);
  console.log('starting to install feature in the my list page');

  if (rowList) {
    rowList.setAttribute('id', 'n-row-list');
  }
  if (myListParentRoot) {
    ReactDOM.render(<MyListParent />, myListParentRoot);
  }
};

export default render;

// need to install parent with state
// need to install two child.
