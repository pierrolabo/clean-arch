import React from 'react';
import {useEffect} from "react";
import { ProductDI } from './app/product/configuration/product.DI';

function App() {

  useEffect(()=> {
    ProductDI.productHandler.all().then((res) => {
      console.log("fetched products: ", res)

    });
  }, [])
  return (
    <div className="App">
      <h1>Hello from tsx react</h1>
    </div>
  );
}

export default App;
