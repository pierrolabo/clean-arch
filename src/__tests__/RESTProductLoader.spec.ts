import { RESTProductLoader } from "../app/product/adapters/secondaries/real/RESTProductLoader"
import { Product } from "../app/product/domain/entities/product"
import { ProductLoader } from "../app/product/domain/loaders/productLoader"
import { ProductBuilder } from "../app/product/usecases/product.builder"
import { ProductHandler } from "../app/product/usecases/product.handler"
import axios from 'axios';
import MockAdapter from "axios-mock-adapter";
import { ProductDTO } from "../app/product/adapters/secondaries/real/DTO/ProductDTO"
import { RESTFakeHttpCLient } from "../app/product/adapters/secondaries/real/REST.fakeHttpClient"
import { ProductDIFactory } from "../app/product/configuration/productDI.factory"
import { LocalJSONProductLoader } from "../app/product/adapters/secondaries/local/localJSONProductLoader"
import { ProductMapper } from "../app/product/adapters/secondaries/real/mappers/product.mapper"

describe('Integration | REST product loader fetches', () => {
    it('A list with some products', done => {
        const expectedProducts = [new ProductBuilder()
        .withId(1)
        .withName('YX1 Wireless Earphones')
        .withCategory('earphones')
        .withPrice(599)
        .build(),
        new ProductBuilder()
        .withId(2)
        .withName('XX59 Headphones')
        .withCategory('headphones')
        .withPrice(899)
        .build()
    ]
        const fakeProductResponse: ProductDTO[] = [
            {
            id: 1,
            slug: "",
            name: 'YX1 Wireless Earphones',
            image: {},
            category: 'earphones',
            new: true,
            price: 599,
            description: "",
            features: "",
            includes: [],
            gallery: {},
            others: []  
            },
            {
                id: 2,
            slug: "",
                name: 'XX59 Headphones',
            image: {},
                category: 'headphones',
            new: false,

                price: 899,
                description: "",
                features: "",
                includes: [],
                gallery: {},
                others: []    
                }

    
        ]
        const mock = new MockAdapter(axios);
        const fakeHttpClient = new RESTFakeHttpCLient();
        mock.onGet().reply(200, fakeProductResponse)
        const axiosSpy = jest.spyOn(fakeHttpClient, 'get')

        const productLoader: ProductLoader = new RESTProductLoader(fakeHttpClient);    
        const productHandler: ProductHandler = new ProductHandler(productLoader)
        productHandler.all().then((products) => {
            expect(products).toEqual(expectedProducts)
            expect(axiosSpy).toHaveBeenCalled()
            expect(axiosSpy).toHaveBeenCalledWith('http://lol.com/')
            done()
        })
    })
    it('A details of one product', done => {
        const expectedProducts = new ProductBuilder()
            .withId(1)
            .withName('YX1 Wireless Earphones')
            .withCategory('earphones')
            .withPrice(599)
            .build()
        
            const fakeProductResponse: ProductDTO = 
                {
                id: 1,
                name: 'YX1 Wireless Earphones',
                category: 'earphones',
                price: 599  
                }
        
            
            const mock = new MockAdapter(axios);
            const fakeHttpClient = new RESTFakeHttpCLient();
            mock.onGet().reply(200, fakeProductResponse)
            const axiosSpy = jest.spyOn(fakeHttpClient, 'get')
            const productLoader: ProductLoader = new RESTProductLoader(fakeHttpClient);    
            const productHandler: ProductHandler = new ProductHandler(productLoader)

            productHandler.get(1).then((product) => {
                expect(product).toEqual(expectedProducts)
                expect(axiosSpy).toHaveBeenCalledWith(`http://apiurl/product/1`)
                expect(axiosSpy).toHaveBeenCalledTimes(1)
                done()
            })

    })
})

describe('Integration | local json fetches', () => {

    it('A list with some products', done => {
        const productHandler: ProductHandler = new ProductHandler(ProductDIFactory.productLoader(new LocalJSONProductLoader()))
        
        productHandler.all().then((products) => {
            verifyInstanceOfListOfProducts(products)
            verifyPropertiesToBeDefined(products)
            done()
        })
    })
    it('A details of one product', done => {
        const productHandler: ProductHandler = new ProductHandler(ProductDIFactory.productLoader(new LocalJSONProductLoader()))
        const fakeProduct = createFakeProduct()
        productHandler.get(1).then((product) => {
            expect(product).toEqual(fakeProduct)
            done()
        })
    })
    function verifyInstanceOfListOfProducts(products: Product[]) {
        products.forEach((product) => expect(product).toBeInstanceOf(Product))
    }
    function verifyPropertiesToBeDefined(products: Product[]) {
        products.forEach((product) => {
            Object.keys((product)).forEach((key) => {
                expect(product[key as keyof Product]).toBeDefined()
            })

        })
    }
    function createFakeProduct() {
        const fakeProductDTO : ProductDTO = {
            "id": 1,
            "slug": "yx1-earphones",
            "name": "YX1 Wireless Earphones",
            "image": {
              "mobile": "./assets/product-yx1-earphones/mobile/image-product.jpg",
              "tablet": "./assets/product-yx1-earphones/tablet/image-product.jpg",
              "desktop": "./assets/product-yx1-earphones/desktop/image-product.jpg"
            },
            "category": "earphones",
            "new": true,
            "price": 599,
            "description": "Tailor your listening experience with bespoke dynamic drivers from the new YX1 Wireless Earphones. Enjoy incredible high-fidelity sound even in noisy environments with its active noise cancellation feature.",
            "features": "Experience unrivalled stereo sound thanks to innovative acoustic technology. With improved ergonomics designed for full day wearing, these revolutionary earphones have been finely crafted to provide you with the perfect fit, delivering complete comfort all day long while enjoying exceptional noise isolation and truly immersive sound.\n\nThe YX1 Wireless Earphones features customizable controls for volume, music, calls, and voice assistants built into both earbuds. The new 7-hour battery life can be extended up to 28 hours with the charging case, giving you uninterrupted play time. Exquisite craftsmanship with a splash resistant design now available in an all new white and grey color scheme as well as the popular classic black.",
            "includes": [
              {
                "quantity": 2,
                "item": "Earphone unit"
              },
              {
                "quantity": 6,
                "item": "Multi-size earplugs"
              },
              {
                "quantity": 1,
                "item": "User manual"
              },
              {
                "quantity": 1,
                "item": "USB-C charging cable"
              },
              {
                "quantity": 1,
                "item": "Travel pouch"
              }
            ],
            "gallery": {
              "first": {
                "mobile": "./assets/product-yx1-earphones/mobile/image-gallery-1.jpg",
                "tablet": "./assets/product-yx1-earphones/tablet/image-gallery-1.jpg",
                "desktop": "./assets/product-yx1-earphones/desktop/image-gallery-1.jpg"
              },
              "second": {
                "mobile": "./assets/product-yx1-earphones/mobile/image-gallery-2.jpg",
                "tablet": "./assets/product-yx1-earphones/tablet/image-gallery-2.jpg",
                "desktop": "./assets/product-yx1-earphones/desktop/image-gallery-2.jpg"
              },
              "third": {
                "mobile": "./assets/product-yx1-earphones/mobile/image-gallery-3.jpg",
                "tablet": "./assets/product-yx1-earphones/tablet/image-gallery-3.jpg",
                "desktop": "./assets/product-yx1-earphones/desktop/image-gallery-3.jpg"
              }
            },
            "others": [
              {
                "slug": "xx99-mark-one-headphones",
                "name": "XX99 Mark I",
                "image": {
                  "mobile": "./assets/shared/mobile/image-xx99-mark-one-headphones.jpg",
                  "tablet": "./assets/shared/tablet/image-xx99-mark-one-headphones.jpg",
                  "desktop": "./assets/shared/desktop/image-xx99-mark-one-headphones.jpg"
                }
              },
              {
                "slug": "xx59-headphones",
                "name": "XX59",
                "image": {
                  "mobile": "./assets/shared/mobile/image-xx59-headphones.jpg",
                  "tablet": "./assets/shared/tablet/image-xx59-headphones.jpg",
                  "desktop": "./assets/shared/desktop/image-xx59-headphones.jpg"
                }
              },
              {
                "slug": "zx9-speaker",
                "name": "ZX9 Speaker",
                "image": {
                  "mobile": "./assets/shared/mobile/image-zx9-speaker.jpg",
                  "tablet": "./assets/shared/tablet/image-zx9-speaker.jpg",
                  "desktop": "./assets/shared/desktop/image-zx9-speaker.jpg"
                }
              }
            ]
          }
          return ProductMapper.mapToProduct(fakeProductDTO)
    }
})