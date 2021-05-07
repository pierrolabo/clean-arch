import { Product } from "../../../domain/entities/product";
import { ProductLoader } from "../../../domain/loaders/productLoader";
import { ProductBuilder } from "../../../usecases/product.builder";

export class RESTProductLoader implements ProductLoader {
    constructor(private http: any) {

    }
    get(id: string): Promise<Product>{
        return this.http.get(`http://apiurl/product/${id}`).then((product: Product) => {
            let res = new ProductBuilder()
                        .withId(product.id)
                        .withName(product.name)
                        .withCategory(product.category)
                        .withPrice(product.price)
                        .build()
            return new Promise((resolve, reject) => {
                resolve(res)
            })
        })
    };
    all(): Promise<Product[]> {
        return this.http.get("http://lol.com/").then((products: Product[]) => {
            let res = products.map(product => {
                return new ProductBuilder()
                .withId(product.id)
                .withName(product.name)
                .withCategory(product.category)
                .withPrice(product.price)
                .build()
            })
            
            return new Promise((resolve, reject) => {
                resolve(res)
            })
        })
    }  

}