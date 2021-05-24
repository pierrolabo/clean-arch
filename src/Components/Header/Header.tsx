import React from 'react'
import {useContext, useEffect} from 'react';
import { ACTIONS } from '../../constants/ProductAction';
import {ProductsContext, DispatchContext} from '../../Hooks/ProductsContext/ProductsContext';

export default function Header() {
    const {state} = useContext(ProductsContext)
    const {dispatch} = useContext(DispatchContext)

    useEffect(() => {
      dispatch({
          type: ACTIONS.GET_PRODUCTS,
          payload: {...state}
      })
    }, [])
    console.log("render")
    console.log(state)
    return (
        <>
        <h2>I the header</h2>
        {state?.products.map(product => {
            const keys = Object.keys(product)
            return (
            <div key={product.id}>
                <h1>{product.name}</h1>
                <ol>
                   {
                    Object.keys(product).map(key => {
                        return (
                            <li>{key}</li>
                        )
                    })

                   }
                </ol>
            </div>

            )
        })}
        </>
       
    )
}