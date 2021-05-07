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

describe('Integration | REST product loader fetches', () => {
    it('A list with some products', done => {
        const expectedProducts = [new ProductBuilder()
        .withId('1')
        .withName('YX1 Wireless Earphones')
        .withCategory('earphones')
        .withPrice(599)
        .build(),
        new ProductBuilder()
        .withId('2')
        .withName('XX59 Headphones')
        .withCategory('headphones')
        .withPrice(899)
        .build()
    ]
        const fakeProductResponse: ProductDTO[] = [
            {
            id: '1',
            name: 'YX1 Wireless Earphones',
            category: 'earphones',
            price: 599  
            },
            {
                id: '2',
                name: 'XX59 Headphones',
                category: 'headphones',
                price: 899  
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
            .withId('1')
            .withName('YX1 Wireless Earphones')
            .withCategory('earphones')
            .withPrice(599)
            .build()
        
            const fakeProductResponse: ProductDTO = 
                {
                id: '1',
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

            productHandler.get("1").then((product) => {
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
            console.log("done: ", products)
            done()
        })
    })
})