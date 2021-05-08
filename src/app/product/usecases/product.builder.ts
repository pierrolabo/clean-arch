import { Product } from "../domain/entities/product"

export class ProductBuilder {
    
    protected _id!: number
    protected _slug!: String
    protected _name!: String
    protected _image!: Object
    protected _category!: String
    protected _new!: boolean
    protected _price!: number
    protected _description!: String
    protected _features!: String
    protected _includes!: Array<Object>
    protected _gallery!: Object
    protected _others!: Array<Object>

    withId(value: number): ProductBuilder {
        this._id = value
        return this;    
    }
    withSlug(value: String): ProductBuilder {
        this._slug = value
        return this;
    }
    withName(value: String): ProductBuilder {
        this._name = value
        return this
    }
    withImage(value: Object): ProductBuilder {
        this._image = value
        return this;
    }
    withCategory(value: String): ProductBuilder {
        this._category = value
        return this
    }
    withNew(value: boolean): ProductBuilder {
        this._new = value
        return this;
    }
    withPrice(value: number): ProductBuilder {
        this._price = value
        return this;
    }
    withDescription(value: String): ProductBuilder {
        this._description = value
        return this
    }
    withFeatures(value: String): ProductBuilder {
        this._features = value
        return this
    }
    withIncludes(value: Array<Object>): ProductBuilder {
        this._includes= value
        return this
    }
    withGallery(value: Object): ProductBuilder {
        this._gallery = value
        return this
    }
    withOthers(value: Array<Object>): ProductBuilder {
        this._others = value;
        return this;
    }
    build(): Product {
        return new Product (
            this._id,
            this._slug,
            this._name,
            this._image,
            this._category,
            this._new,
            this._price,
            this._description,
            this._features,
            this._includes,
            this._gallery,
            this._others
        )
    }
}