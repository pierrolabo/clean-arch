import { createContext, useCallback } from "react";
import { useImmerReducer } from "use-immer";
import { ProductDI } from "../../app/product/configuration/product.DI";
import { ACTIONS } from "../../constants/ProductAction";

const productsReducer = (productsState, action) => {
  switch (action.type) {
    case ACTIONS.SET_PRODUCTS:
      productsState.products = action.payload.products;
      return;
    case ACTIONS.SET_LOADING:
      productsState.isLoading = action.payload.isLoading;
      return;
    default:
      return productsState;
  }
};

const initialState = {
  products: [],
  isLoading: true,
};

const ProductsContext = createContext();
const DispatchContext = createContext();

const ProductsContextProvider = (props) => {
  const [state, dispatch] = useImmerReducer(productsReducer, initialState);
  const customDispatch = useCallback(async (action) => {
    switch (action.type) {
      case ACTIONS.GET_PRODUCTS: {
        dispatch({
          type: ACTIONS.SET_LOADING,
          payload: { isLoading: true },
        });
        const products = await getAllProducts();
        dispatch({
          type: ACTIONS.SET_LOADING,
          payload: { isLoading: false },
        });
        dispatch({
          type: ACTIONS.SET_PRODUCTS,
          payload: { products: products },
        });
      }
    }
  }, []);
  async function getAllProducts() {
    const products = await ProductDI.productHandler.all()
    return products
  }
  return (
    <DispatchContext.Provider value={{ dispatch: customDispatch }}>
      <ProductsContext.Provider value={{ state }}>
        {props.children}
      </ProductsContext.Provider>
    </DispatchContext.Provider>
  );
};

export {ProductsContext,  DispatchContext, ProductsContextProvider}