import { ProductHandler } from "../usecases/product.handler";
import { ProductDIFactory } from "./productDI.factory";

export const ProductDI = {
    productHandler: new ProductHandler(ProductDIFactory.productLoader(null))
}