/* eslint-disable prettier/prettier */
import React, { createContext, useContext, useReducer } from 'react';

import { StateValueI } from '../types';

interface ActionI {
  type: string;
  payload: unknown;
}

interface StoreProviderI {
  (props: {
    children: React.ReactNode;
    initialState: StateValueI;
    reducer: React.Reducer<StateValueI, ActionI>;
    // eslint-disable-next-line no-undef
  }): JSX.Element;
}

const filterArr = [
  { text: 'Show All' },
  { text: 'Must Watch' },
  { text: 'Movie' },
  { text: 'Tv Show' },
  { text: 'Complete' },
  { text: 'Incomplete' },
  { text: 'Watching' },
];

export const stateDefaultValue: StateValueI = {
  filterArr,
};

const StateContext = createContext<StateValueI>(stateDefaultValue);
const DispatchContext = createContext<React.Dispatch<ActionI>>(() => undefined);

export const useStore = (): StateValueI => useContext(StateContext);

export const useDispatch = (): React.Dispatch<ActionI> =>
  useContext(DispatchContext);

export const StoreProvider: StoreProviderI = ({
  children,
  initialState,
  reducer,
}) => {
  const [globalState, dispatch] = useReducer(reducer, initialState);
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={globalState}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
