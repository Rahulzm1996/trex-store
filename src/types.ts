export interface ITshirt {
  id: number;
  imageURL: string;
  name: string;
  type: string;
  price: number;
  currency: string;
  color: string;
  gender: string;
  quantity: number;
}

export interface ICartItem {
  id: number;
  qty: number;
  total: number;
  product: Partial<ITshirt>;
}

export type SelectedFilterType = {
  color: {
    Red: boolean;
    Green: boolean;
    Blue: boolean;
  };
  gender: {
    Men: boolean;
    Women: boolean;
  };
  price: {
    "0-Rs250": boolean;
    "Rs251-Rs450": boolean;
    Rs450: boolean;
  };
  type: {
    Polo: boolean;
    Hoodie: boolean;
    Basic: boolean;
  };
};

export interface IAppProvider {
  cartItemList: Array<ICartItem>;
  selectedFilters: SelectedFilterType;
  setCartItemList: React.Dispatch<React.SetStateAction<ICartItem[]>>;
  setSelectedFilters: React.Dispatch<React.SetStateAction<SelectedFilterType>>;
}

export interface ISearchBarProps {
  tshirts: ITshirt[];
  tshirtsList: ITshirt[];
  setTshirtsList: React.Dispatch<React.SetStateAction<ITshirt[]>>;
  selectedFilters: SelectedFilterType;
  setSelectedFilters: React.Dispatch<React.SetStateAction<SelectedFilterType>>;
}

export interface IFiltersProps {
  tshirts: ITshirt[];
  tshirtsList: ITshirt[];
  setTshirtsList: React.Dispatch<React.SetStateAction<ITshirt[]>>;
  selectedFilters: SelectedFilterType;
  setSelectedFilters: React.Dispatch<React.SetStateAction<SelectedFilterType>>;
}
