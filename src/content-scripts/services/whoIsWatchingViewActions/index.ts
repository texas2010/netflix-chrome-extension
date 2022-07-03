/*
    Parameter: name
*/

interface WhoIsWatchingViewActions {
  (name: string): void;
}

export const whoIsWatchingViewActions: WhoIsWatchingViewActions = (name) => {
  console.log(name);
};
