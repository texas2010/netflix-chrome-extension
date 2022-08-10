import { useEffect, useState } from 'react';
import { useAppSelector } from '@content-scripts/hooks';

interface titleAndTitleRef {
  title: string;
  titleCardRef: Element;
}

export const SortMyListItems = () => {
  const [defaultArr, setDefaultArr] = useState<Array<titleAndTitleRef>>();
  const [defaultOnce, setDefaultOnce] = useState(false);

  const sortBy = useAppSelector((state) => state.sortByDropdownInMyList.sortBy);

  useEffect(() => {
    const listItemsArr = document.querySelectorAll(
      '.galleryLockups .slider-item .title-card-container'
    );
    const newListItemsArr = [];

    if (listItemsArr.length > 1) {
      // more than 1.
      for (let i = 0; i < listItemsArr.length; i++) {
        const element = listItemsArr[i];
        const titleEl = element.querySelector('.title-card .fallback-text');
        const titleCardRef = element.querySelector('.title-card');

        if (!titleCardRef || !titleEl || !titleEl.textContent) {
          break;
        }

        newListItemsArr.push({
          title: titleEl.textContent,
          titleCardRef,
        });
      }

      if (!defaultOnce) {
        setDefaultArr(newListItemsArr);
        setDefaultOnce(true);
      }

      let sortedArr;
      switch (sortBy) {
        case 'TITLE_ASC':
          sortedArr = newListItemsArr.sort((a, b) => {
            if (a.title < b.title) {
              return -1;
            } else if (a.title > b.title) {
              return 1;
            }
            return 0;
          });
          break;

        case 'TITLE_DESC':
          sortedArr = newListItemsArr.sort((a, b) => {
            if (a.title > b.title) {
              return -1;
            } else if (a.title < b.title) {
              return 1;
            }
            return 0;
          });
          break;
        default:
          if (defaultArr) {
            sortedArr = [...defaultArr];
          }
          break;
      }

      console.log(sortedArr);
      if (sortedArr) {
        for (let j = 0; j < listItemsArr.length; j++) {
          const element = listItemsArr[j];
          if (element.firstChild) {
            element.removeChild(element.firstChild);
          }
          element.appendChild(sortedArr[j].titleCardRef);
        }
      }
    }
  }, [defaultArr, defaultOnce, sortBy]);

  return <></>;
};
