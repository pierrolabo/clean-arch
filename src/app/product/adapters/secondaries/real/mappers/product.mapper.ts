import { Product } from "../../../../domain/entities/product";
import { ProductBuilder } from "../../../../usecases/product.builder";
import { ProductDTO } from "../DTO/ProductDTO";

export class ProductMapper {

    static mapToProduct(product: ProductDTO): Product {
        return new ProductBuilder()
            .withId(product.id)
            .withSlug(product.slug)
            .withName(product.name)
            .withImage(product.image)
            .withCategory(product.category)
            .withNew(product.new)
            .withPrice(product.price)
            .withDescription(product.description)
            .withFeatures(product.features)
            .withIncludes(product.includes)
            .withGallery(product.gallery)
            .withOthers(product.others)
            .build()   
    }
}