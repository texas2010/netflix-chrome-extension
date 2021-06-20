/* eslint-disable prettier/prettier */
import React from 'react';

type FilterArrType = {
  text: string;
  active?: boolean;
  hide?: boolean;
}[];

// type FilterTagsType = (params: { filterArr: FilterArrType }) => JSX.Element;

interface FilterTagsType {
  // eslint-disable-next-line no-undef
  (props: { filterArr: FilterArrType }): JSX.Element;
}

const FilterTags: FilterTagsType = ({ filterArr }) => {
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
