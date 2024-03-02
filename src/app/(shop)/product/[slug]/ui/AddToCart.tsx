'use client'

import { QuantitySelector, SizeSelector } from "@/components";
import { CartProduct, Product, Size } from "@/interfaces";
import { useCartStore } from "@/store";
import React, { useEffect, useState } from "react";

interface Props{
    product:Product
}
export const AddToCart = ({product}:Props) => {

  const addProductToCart = useCartStore(state => state.addProductToCart)
    const [size,setSize] = useState<Size|undefined>()
    const [quantity,setQuatity] = useState<number>(1)
    const [posted, setPosted] = useState(false);
    const addToCart = () =>{
        setPosted(true)
        if(!size) return
        
        
        //TODO add to cart
        const cartProduct:CartProduct = {
          id: product.id,
          slug: product.slug,
          title: product.title,
          price: product.price,
          quantity: quantity,
          size: size,
          image: product.images[0]
        }
        addProductToCart(cartProduct)

        setPosted(false)
        setQuatity(1)
        setSize(undefined)
    }

 
    return (
    <>
    {
        posted  && !size && (
            <span className="mt-2 text-red-500 fade-in">
                Debe de seleccionar una talla*
            </span>

        )
    }
      {/* selector de tallas */}
      <SizeSelector
        selectedSize={size}
        availableSizes={product.sizes}
        onSizeChanged={setSize}
      />
      {/* selector de cantidad */}
      <QuantitySelector 
      quantity={quantity} 
      onQuatityChanged={setQuatity}
      />
      {/* button */}

      <button onClick={addToCart} className="btn-primary my-5">Agregar al carrito</button>
    </>
  );
};
