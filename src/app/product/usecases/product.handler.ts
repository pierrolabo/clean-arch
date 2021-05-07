import { Product } from "../domain/entities/product"
import { ProductLoader } from "../domain/loaders/productLoader"

export class ProductHandler {
    constructor(private productSource: ProductLoader) {

    }
    all(): Promise<Product[]> {
        return this.productSource.all()
    }
    get(id: string): Promise<Product> {
        return this.productSource.get(id)
    }
}