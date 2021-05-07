export class Product {
    constructor(
        private _id: String,
        private _slug: String,
        private _name: String,
        private _image: Object,
        private _category: String,
        private _new: String,
        private _price: number,
        private _description: String,
        private _features: String,
        private _includes: Array<Object>,
        private _gallery: Object,
        private _others: Array<Object>,
        ) {
    }
    get id(): String {
        return this._id;
    }         
    get name(): String {
        return this._name
    }
    get category(): String {
        return this._category
    }
    get price(): number {
        return this._price
    }
}