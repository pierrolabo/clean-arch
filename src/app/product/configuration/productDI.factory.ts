import { InMemoryProductLoader } from "../adapters/secondaries/inmemory/inMemoryProduct.loader";
import { LocalJSONProductLoader } from "../adapters/secondaries/local/localJSONProductLoader";
import { RESTProductLoader } from "../adapters/secondaries/real/RESTProductLoader";
import { ProductLoader } from "../domain/loaders/productLoader";
import { ProductBuilder } from "../usecases/product.builder";

export class ProductDIFactory {
    static productLoader(http: any) : ProductLoader {
        console.log("process: ", process.env.SOURCE)
        switch(process.env.SOURCE) {
            case "fake":
                return new LocalJSONProductLoader()
            default:
                /*
                const earphone = new ProductBuilder()
                    .withId('1')
                    .withName('YX1 Wireless Earphones')
                    .withCategory('earphones')
                    .withPrice(599)
                    .build()

                const headphone = new ProductBuilder()
                    .withId('2')
                    .withName('XX59 Headphones')
                    .withCategory('headphones')
                    .withPrice(899)
                    .build()
                    return new InMemoryProductLoader([earphone, headphone])     
                    */
                return new LocalJSONProductLoader()

        }
    }
}