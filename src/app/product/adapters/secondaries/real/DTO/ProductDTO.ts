export interface ProductDTO {
    id: number
    slug: String
    name: String
    image: Object
    category: String
    new: boolean
    price: number
    description: String
    features: String
    includes: Array<Object>
    gallery: Object
    others: Array<Object>
}