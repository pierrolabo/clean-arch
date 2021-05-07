import { Product } from "../../../domain/entities/product";
import { ProductLoader } from "../../../domain/loaders/productLoader";

export class InMemoryProductLoader implements ProductLoader {
    
    constructor(private products: Product[]) {

    }
    all(): Promise<Product[]> {
        return new Promise((resolve, reject) => {
            resolve(this.products)
        })
    }
    get(id: string): Promise<Product> {
        return new Promise((resolve, reject) => {
            resolve(this.products.filter(product => product.id === id)[0])
        })
    }
}