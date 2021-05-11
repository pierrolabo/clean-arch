import { LocalJSONProductLoader } from "../adapters/secondaries/local/localJSONProductLoader";
import { RESTProductLoader } from "../adapters/secondaries/real/RESTProductLoader";
import { ProductLoader } from "../domain/loaders/productLoader";

export class ProductDIFactory {
    static productLoader(http: any) : ProductLoader {
        switch(process.env.SOURCE) {
            case "fake":
                return new LocalJSONProductLoader()
            case "rest-fake":
                return new RESTProductLoader(http)    
            default:
                return new LocalJSONProductLoader()
        }
    }
}