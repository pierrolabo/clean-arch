import { Product } from "../entities/product";

export interface ProductLoader {
    get(id: string): Promise<Product>;
    all(): Promise<Product[]>  
}