import React from 'react';
import {useEffect} from "react";
import { ProductDI } from './app/product/configuration/product.DI';
import { ProductsContextProvider } from './Hooks/ProductsContext/ProductsContext';
import Header from './Components/Header/Header';

function App() {

  return (
    <div className="App">
      <ProductsContextProvider>
        <Header />
      <h1>Hello from tsx react</h1>
      </ProductsContextProvider>
    </div>
  );
}

export default App;
