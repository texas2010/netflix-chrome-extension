/* eslint-disable prettier/prettier */
import React from 'react';

interface FilterTagsProps {
  filterArr: {
    text: string;
    active?: boolean;
    hide?: boolean;
  }[];
}

// eslint-disable-next-line no-undef
const FilterTags = (props: FilterTagsProps): JSX.Element => {
  const { filterArr } = props;
  return (
    <>
      {filterArr.map((item) => {
        return (
          <button
            type="button"
            key={item.text}
            className={`btn n-btn n-btn-sm${
              item.active ? ' n-btn-active' : ''
            }${item.hide ? ' n-btn-hide' : ''}`}
            onClick={(e): void => {
              console.log(e);
            }}
          >
            {item.text}
          </button>
        );
      })}
    </>
  );
};

export default FilterTags;
