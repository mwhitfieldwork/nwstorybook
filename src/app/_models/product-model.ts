import { Category } from "./category";
import { OrderDetails } from "./order-details";
import { Supplier } from "./supplier";

export interface ProductModel {
    categoryId: number;
    discontinued: boolean;
    productName: string;
    quantityPerUnit: string;
    reorderLevel: number;
    supplierId: number;
    unitPrice: number;
    unitsInStock: number;
    unitsOnOrder: number;
}
