import { InMemoryProductLoader } from "../app/product/adapters/secondaries/inmemory/inMemoryProduct.loader";
import { Product } from "../app/product/domain/entities/product";
import { ProductLoader } from "../app/product/domain/loaders/productLoader";
import { ProductHandler } from "../app/product/usecases/product.handler"
import { StubProductBuilder } from "./stubs/stubProduct.builder";

describe('Product handler fetches', () => {
    let earphone: Product

    beforeEach(() => {
        earphone = new StubProductBuilder().withName("YX1 Wireless Earphones").build()
    })
    describe('A list', () => {
        it('With zero products if there is no product in the source', done => {
            const productHandler = createProductHandler([])
    
            productHandler.all().then((products: Product[]) => {
                verifyListOfProducts(products, []);
                done()
            })
        })
        it('With one product if there is one product in the source', done => {
            const productHandler = createProductHandler([earphone])
            
            productHandler.all().then((products: Product[]) => {
                verifyListOfProducts(products, [earphone]);
                done()
            })
        })
        it('With two product if there is two product in the source', done => {
            const speaker: Product = new StubProductBuilder().withName("speaker").withId(2).build();
            const productHandler = createProductHandler([earphone, speaker])
    
            productHandler.all().then((products: Product[]) => {
                verifyListOfProducts(products, [earphone, speaker]);
                done()
            })
        })

        function verifyListOfProducts(products: Product[], expectedProducts: Product[]) {
            expect(products.length).toEqual(expectedProducts.length);
            expectedProducts.forEach((expectedProduct, index) => verifyOneProduct(products[index], expectedProduct))
        }
    })
    it('A details of one product', done => {
        const speaker: Product = new StubProductBuilder().withName("speaker").withId(2).build();
        const productHandler = createProductHandler([earphone, speaker])

        productHandler.get(2).then((product: Product) => {
            verifyOneProduct(product, speaker);
            done()
        })
    })
    function createProductHandler(productPopulation: Product[]) {
        const productSource: ProductLoader = new InMemoryProductLoader(productPopulation);
        return new ProductHandler(productSource)
    }
    function verifyOneProduct(product: Product, expectedProduct: Product) {
        expect(product.id).toEqual(expectedProduct.id);
        expect(product.name).toEqual(expectedProduct.name);
        expect(product.category).toEqual(expectedProduct.category);
        expect(product.price).toEqual(expectedProduct.price);
    }
})


