import { Product } from "../entities/product";

export interface ProductLoader {
    get(id: number): Promise<Product>;
    all(): Promise<Product[]>  
}