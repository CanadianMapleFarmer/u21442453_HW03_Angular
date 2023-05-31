import { Brand } from './brand';
import { ProductType } from './product-type';

export interface Product {
  productId: number;
  price: number;
  image?: string;
  name: string;
  brand?: Brand;
  productType?: ProductType;
  brandId?: number;
  productTypeId?: number;
  description: string;
  dateCreated: Date;
  dateModified: Date;
  isActive: boolean;
  isDeleted: boolean;
}
