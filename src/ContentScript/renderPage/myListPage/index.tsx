/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import Portal from '../Portal';
import FilterTags from './FilterTags';

import './styles.scss';

// eslint-disable-next-line no-undef
const MyListParent = (): JSX.Element => {
  const [filterArr] = useState([
    { text: 'Show All' },
    { text: 'Must Watch' },
    { text: 'Movie' },
    { text: 'Tv Show' },
    { text: 'Complete' },
    { text: 'Incomplete' },
    { text: 'Watching' },
  ]);
  return (
    <>
      <Portal id="n-filter-tags">
        <FilterTags filterArr={filterArr} />
      </Portal>
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

  if (myListParentRoot) {
    ReactDOM.render(<MyListParent />, myListParentRoot);
  }
  if (rowList) {
    rowList.setAttribute('id', 'n-row-list');
  }
};

export default render;

// need to install parent with state
// need to install two child.
