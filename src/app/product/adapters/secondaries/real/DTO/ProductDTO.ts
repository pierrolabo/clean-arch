export interface ProductDTO {
    id: String
    slug: String
    name: String
    image: Object
    category: String
    new: String
    price: number
    description: String
    features: String
    includes: Array<Object>
    gallery: Object
    others: Array<Object>
}