import axios from "axios";
import data from '../../../../../../data.json';
import { Product } from "../../../domain/entities/product";
import { ProductLoader } from "../../../domain/loaders/productLoader";
import { ProductBuilder } from "../../../usecases/product.builder";

export class LocalJSONProductLoader implements ProductLoader {
    get(id: string): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    all(): Promise<Product[]> {
      return new Promise((resolve, reject) => {
          let parsedProducts = data.map((data) => new ProductBuilder(data))
          resolve(parsedProducts)
      })
    }
    
}