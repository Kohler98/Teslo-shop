"use client";
import { QuantitySelector } from "@/components";
import { useCartStore } from "@/store";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const ProductInCart = () => {
  const updateProductToCart = useCartStore(
    (state) => state.updateProductToCart
  );
  const removeProductToCart = useCartStore(
    (state) => state.removeProductToCart
  );
  const productsInCart = useCartStore((state) => state.cart);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);
  if (!loaded) {
    return <p>Loading...</p>;
  }
  return (
    <>
      {productsInCart.map((product) => (
        <div key={`${product.slug}-${product.size}`} className="flex mb-5">
          <Image
            src={`/products/${product.image}`}
            width={100}
            height={100}
            style={{
              width: "100px",
              height: "100px",
            }}
            alt={product.title}
            className="mr-5 rounded"
          />

          <div>
            <Link
              className="hover:underline cursor-pointer"
              href={`/product/${product.slug}`}
            >
              <p>
                {product.size} - {product.title}
              </p>
            </Link>
            <p>
              $ {product.price} x {product.quantity}
            </p>
            <p>Subtotal: $ {product.price * product.quantity}</p>
            <QuantitySelector
              quantity={product.quantity}
              onQuatityChanged={(value) => updateProductToCart(product, value)}
            />
            <button
              onClick={() => removeProductToCart(product)}
              className="underline mt-3"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
