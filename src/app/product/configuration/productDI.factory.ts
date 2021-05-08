import { InMemoryProductLoader } from "../adapters/secondaries/inmemory/inMemoryProduct.loader";
import { LocalJSONProductLoader } from "../adapters/secondaries/local/localJSONProductLoader";
import { RESTProductLoader } from "../adapters/secondaries/real/RESTProductLoader";
import { ProductLoader } from "../domain/loaders/productLoader";
import { ProductBuilder } from "../usecases/product.builder";

export class ProductDIFactory {
    static productLoader(http: any) : ProductLoader {
        switch(process.env.SOURCE) {
            case "fake":
                return new LocalJSONProductLoader()
            default:
                return new LocalJSONProductLoader()
        }
    }
}