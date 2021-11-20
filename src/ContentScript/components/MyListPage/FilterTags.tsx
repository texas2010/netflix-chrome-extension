/* eslint-disable prettier/prettier */
import React from 'react';
import { useStore } from '../../store';

import { FilterTagsI, FilterArrI } from '../../types';

const FilterTags: FilterTagsI = () => {
  const { filterArr }: FilterArrI = useStore();
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
