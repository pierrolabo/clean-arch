import { ProductBuilder } from "../../app/product/usecases/product.builder";

export class StubProductBuilder extends ProductBuilder {
    protected _id: String = "1"
    protected _name: String = "YX1 Wireless Earphones"
    protected _category: String = "earphones"
    protected _price: number = 599
}