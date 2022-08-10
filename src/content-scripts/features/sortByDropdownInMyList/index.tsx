import { useEffect, useState } from 'react';

import { CreateRootElementPortal } from '@content-scripts/components';
import { useAppSelector, useAppDispatch } from '@content-scripts/hooks';

import { sortByAction } from './sortByDropdownInMyListSlice';
import styles from './SortByDropdownInMyList.module.scss';

export const SortByDropdownInMyList = () => {
  const sortByText = useAppSelector(
    (state) => state.sortByDropdownInMyList.text
  );

  console.log('sortByText', sortByText);

  const dispatch = useAppDispatch();
  const [dropdownMenuToggle, setDropdownMenuToggle] = useState<boolean>(false);

  const dropdownMenuArr = [
    {
      text: 'Default',
      sortBy: 'DEFAULT',
    },
    {
      text: 'Title: A - Z',
      sortBy: 'TITLE_ASC',
    },
    {
      text: 'Title: Z - A',
      sortBy: 'TITLE_DESC',
    },
  ];

  const buttonClassNames = [
    styles.button,
    `${dropdownMenuToggle ? styles.buttonOpened : styles.buttonClosed}`,
    'dropdown-toggle',
  ].join(' ');

  useEffect(() => {
    (async () => {
      const data = await chrome.storage.sync.get(['userSettings']);
      switch (data.userSettings.sortByDropdown) {
        case 'DEFAULT':
          dispatch(
            sortByAction({
              text: 'Default',
              sortBy: 'DEFAULT',
            })
          );
          break;
        case 'TITLE_ASC':
          dispatch(
            sortByAction({
              text: 'Title: A - Z',
              sortBy: 'TITLE_ASC',
            })
          );
          break;
        case 'TITLE_DESC':
          dispatch(
            sortByAction({
              text: 'Title: Z - A',
              sortBy: 'TITLE_DESC',
            })
          );
          break;

        default:
          dispatch(
            sortByAction({
              text: 'Default',
              sortBy: 'DEFAULT',
            })
          );
          break;
      }
    })();
  }, [dispatch]);

  return (
    <CreateRootElementPortal
      selector='.sub-header-wrapper'
      rootId='nSortByDropdownInMyList'
    >
      <div className={styles.wrapperDropdown}>
        <div className={`title ${styles.sortByTitle}`}>Sort By</div>
        <div className={styles.selectorDropdown}>
          <div className={styles.containerStyle}>
            <button
              className={buttonClassNames}
              onClick={() => {
                setDropdownMenuToggle((prevState) => !prevState);
              }}
            >
              {sortByText}
            </button>

            {dropdownMenuToggle && (
              <ul className={styles.dropdownMenu}>
                {dropdownMenuArr.map((item, i) => (
                  <li
                    key={i}
                    className={styles.dropdownMenuItem}
                    onClick={() => {
                      dispatch(sortByAction(item));
                      setDropdownMenuToggle(false);

                      chrome.storage.sync
                        .get(['userSettings'])
                        .then(({ userSettings }) => {
                          chrome.storage.sync.set({
                            userSettings: {
                              ...userSettings,
                              sortByDropdown: item.sortBy,
                            },
                          });
                        });
                    }}
                  >
                    {item.text}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </CreateRootElementPortal>
  );
};
