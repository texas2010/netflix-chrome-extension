export interface FilterTagsI {
  // eslint-disable-next-line no-undef
  (): JSX.Element;
}

export interface FilterI {
  text: string;
  active?: boolean;
  hide?: boolean;
}

export interface FilterArrI {
  filterArr: FilterI[];
}

export interface StateValueI {
  filterArr: FilterI[];
}
