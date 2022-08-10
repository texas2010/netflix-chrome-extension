import { useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '@content-scripts/hooks';
import { isElementExist } from '@content-scripts/services';

import { setShowOrHideTitle } from './showOrHideTitleInMyListSlice';
import './ShowOrHideTitleInMyList.scss';

export const ShowOrHideTitleInMyList = () => {
  const showOrHideTitleBoolean = useAppSelector(
    (state) => state.showOrHideTitleInMyList.value
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const data = await chrome.storage.sync.get(['userSettings']);
      dispatch(setShowOrHideTitle(data.userSettings.showTitleInMyList));
    })();
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      if (await isElementExist('.galleryLockups')) {
        if (showOrHideTitleBoolean) {
          // add class for show title
          document.querySelector('.galleryLockups')?.classList.add('showTitle');
        } else {
          document
            .querySelector('.galleryLockups')
            ?.classList.remove('showTitle');
        }
      }
    })();
  }, [showOrHideTitleBoolean]);

  return <></>;
};
