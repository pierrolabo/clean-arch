import { LocalJSONProductLoader } from "../app/product/adapters/secondaries/local/localJSONProductLoader";
import { ProductDTO } from "../app/product/adapters/secondaries/real/DTO/ProductDTO";
import { ProductMapper } from "../app/product/adapters/secondaries/real/mappers/product.mapper";
import { Product } from "../app/product/domain/entities/product";
import { ProductLoader } from "../app/product/domain/loaders/productLoader";
import { ProductHandler } from "../app/product/usecases/product.handler";

describe("Integration | local json fetches", () => {
    it("A list with some products", (done) => {
      const productLoader: ProductLoader = new LocalJSONProductLoader();
      const productHandler: ProductHandler = new ProductHandler(productLoader);
  
      productHandler.all().then((products) => {
        verifyInstanceOfListOfProducts(products);
        verifyPropertiesToBeDefined(products);
        verifyImagesLinks(products);
        done();
      });
    });
    it("A details of one product", (done) => {
      const productLoader: ProductLoader = new LocalJSONProductLoader();
      const productHandler: ProductHandler = new ProductHandler(productLoader);
      
      const fakeProduct = createFakeProduct();
      productHandler.get(1).then((product) => {
        expect(product).toEqual(fakeProduct);
        extractImages(product);
        verifyImagesLinks([product]);
        done();
      });
    });
    function verifyInstanceOfListOfProducts(products: Product[]) {
      products.forEach((product) => expect(product).toBeInstanceOf(Product));
    }
    function verifyPropertiesToBeDefined(products: Product[]) {
      products.forEach((product) => {
        Object.keys(product).forEach((key) => {
          expect(product[key as keyof Product]).toBeDefined();
        });
      });
    }
    function createFakeProduct() {
      const fakeProductDTO: ProductDTO = {
        id: 1,
        slug: "yx1-earphones",
        name: "YX1 Wireless Earphones",
        image: {
          mobile: "./assets/product-yx1-earphones/mobile/image-product.jpg",
          tablet: "./assets/product-yx1-earphones/tablet/image-product.jpg",
          desktop: "./assets/product-yx1-earphones/desktop/image-product.jpg",
        },
        category: "earphones",
        new: true,
        price: 599,
        description:
          "Tailor your listening experience with bespoke dynamic drivers from the new YX1 Wireless Earphones. Enjoy incredible high-fidelity sound even in noisy environments with its active noise cancellation feature.",
        features:
          "Experience unrivalled stereo sound thanks to innovative acoustic technology. With improved ergonomics designed for full day wearing, these revolutionary earphones have been finely crafted to provide you with the perfect fit, delivering complete comfort all day long while enjoying exceptional noise isolation and truly immersive sound.\n\nThe YX1 Wireless Earphones features customizable controls for volume, music, calls, and voice assistants built into both earbuds. The new 7-hour battery life can be extended up to 28 hours with the charging case, giving you uninterrupted play time. Exquisite craftsmanship with a splash resistant design now available in an all new white and grey color scheme as well as the popular classic black.",
        includes: [
          {
            quantity: 2,
            item: "Earphone unit",
          },
          {
            quantity: 6,
            item: "Multi-size earplugs",
          },
          {
            quantity: 1,
            item: "User manual",
          },
          {
            quantity: 1,
            item: "USB-C charging cable",
          },
          {
            quantity: 1,
            item: "Travel pouch",
          },
        ],
        gallery: {
          first: {
            mobile: "./assets/product-yx1-earphones/mobile/image-gallery-1.jpg",
            tablet: "./assets/product-yx1-earphones/tablet/image-gallery-1.jpg",
            desktop: "./assets/product-yx1-earphones/desktop/image-gallery-1.jpg",
          },
          second: {
            mobile: "./assets/product-yx1-earphones/mobile/image-gallery-2.jpg",
            tablet: "./assets/product-yx1-earphones/tablet/image-gallery-2.jpg",
            desktop: "./assets/product-yx1-earphones/desktop/image-gallery-2.jpg",
          },
          third: {
            mobile: "./assets/product-yx1-earphones/mobile/image-gallery-3.jpg",
            tablet: "./assets/product-yx1-earphones/tablet/image-gallery-3.jpg",
            desktop: "./assets/product-yx1-earphones/desktop/image-gallery-3.jpg",
          },
        },
        others: [
          {
            slug: "xx99-mark-one-headphones",
            name: "XX99 Mark I",
            image: {
              mobile: "./assets/shared/mobile/image-xx99-mark-one-headphones.jpg",
              tablet: "./assets/shared/tablet/image-xx99-mark-one-headphones.jpg",
              desktop:
                "./assets/shared/desktop/image-xx99-mark-one-headphones.jpg",
            },
          },
          {
            slug: "xx59-headphones",
            name: "XX59",
            image: {
              mobile: "./assets/shared/mobile/image-xx59-headphones.jpg",
              tablet: "./assets/shared/tablet/image-xx59-headphones.jpg",
              desktop: "./assets/shared/desktop/image-xx59-headphones.jpg",
            },
          },
          {
            slug: "zx9-speaker",
            name: "ZX9 Speaker",
            image: {
              mobile: "./assets/shared/mobile/image-zx9-speaker.jpg",
              tablet: "./assets/shared/tablet/image-zx9-speaker.jpg",
              desktop: "./assets/shared/desktop/image-zx9-speaker.jpg",
            },
          },
        ],
      };
      return ProductMapper.mapToProduct(fakeProductDTO);
    }
    function verifyImagesLinks(products: Product[]) {
      products.forEach((product) => {
        const imagesObj = extractImages(product);
        imagesObj.forEach((imageObj) => {
          Object.keys(imageObj).forEach((key) => {
            fileExists(imageObj[key]).then((result) => {
              expect(result).toBe(true);
            });
          });
        });
      });
    }
    function fileExists(file: String) {
      return new Promise((resolve) => {
        try {
          require(`.${file}`);
          resolve(true);
        } catch (err) {
          resolve(false);
        }
      });
    }
    function extractImages(product: Product) {
      const images = { ...product.image };
      const gallery = {
        ...product.gallery.first,
        ...product.gallery.second,
        ...product.gallery.third,
      };
      const others = product.others.map((other) => other.image);
      return [{ ...images }, { ...gallery }, ...others];
    }
  });
  