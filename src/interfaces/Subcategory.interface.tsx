// Generated by https://quicktype.io

import {Image} from './Image.interface';

export interface SubcategoryResp {
  count: number;
  page: number;
  totalPages: number;
  data: Subcategory[];
}

export interface Subcategory {
  status: boolean;
  soldOut: boolean;
  name: string;
  category: Category;
  createdAt: string;
  updatedAt: string;
  images: Image[];
  description: Description[];
  aviableSizes?: AviableSize[];
  id: string;
  price: number;
  priceGalore: number;
  priceDiscount: number;
  priceGaloreDiscount: number;
  weight: number;
  currency: string;
  aviableColors: string[];
}

export interface Category {
  name: string;
  id: string;
}

export interface AviableSize {
  talla: string;
  peso: number;
}

export interface Description {
  title: string;
  content: string;
}
