export interface StoreType {
  id: number;
  name: string;
  nickName: string;
  active: boolean;
}

export interface Brand {
  id: string;
  name: string;
  image: string;
  active: boolean;
}

export interface StoreAddress {
  id: string;
  storeId: string;
  street: string;
  number: string;
  zipCode: string;
  additional: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
  urlMaps: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: number;
  contactTypeId: number;
  contactTypeName: string;
}

export interface Modality {
  id: string;
  name: string;
  tag: string;
  active: boolean;
  order: number;
  canBlock: boolean;
}

export interface OpeningHour {
  id: string;
  storeModalityId: string;
  dayWeek: number;
  initialTime: string;
  endTime: string;
}

export interface SalesChannel {
  storeModalitySalesChannelId: string;
  salesChannelId: string;
  salesChannelName: string;
  token: string;
}

export interface StoreModality {
  storeModalityId: string;
  storeCode: string;
  cashierCode: string;
  modality: Modality;
  openingHours: OpeningHour[];
  salesChannel: SalesChannel[];
}

export interface Store {
  storeId: string;
  storeName: string;
  storeType?: StoreType;
  brand?: Brand;
  storeAddress?: StoreAddress;
  contacts?: Contact[];
  storeModalitys: StoreModality[];
}

export interface RootObject {
  stores: Store[];
}
