import data from '../../../../../assets/data.json';
import { Product } from "../../../domain/entities/product";
import { ProductLoader } from "../../../domain/loaders/productLoader";
import { ProductDTO } from '../real/DTO/ProductDTO';
import { ProductMapper } from '../real/mappers/product.mapper';

export class LocalJSONProductLoader implements ProductLoader {
    get(id: number): Promise<Product> {
        return new Promise((resolve, reject) => {
            const res = data.filter(data => data.id === id)[0]
            const productDTO: ProductDTO = res
            resolve(ProductMapper.mapToProduct(productDTO))
        })
    }
    all(): Promise<Product[]> {
      return new Promise((resolve, reject) => {
            //  map array of raw product to array of product from the DTO product
            let mappedProducts = data.map((data) => {
            const productDTO : ProductDTO = data;
            return ProductMapper.mapToProduct(productDTO)
              
          })
          resolve(mappedProducts)
      })
    }
    
}