"use client";

import { placeOrder } from "@/app/actions";
import { currencyFormat, sleep } from "@/app/utils";
import { useAddressStore, useCartStore } from "@/store";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export const PlaceOrder = () => {

  const router = useRouter()
  const [loaded, setLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const address = useAddressStore((state) => state.address);
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const { totalItems, subTotal, total } = useCartStore((state) =>
    state.getSummaryInformation()
  );

  useEffect(() => {
    setLoaded(true);
  }, []);

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);
    const productsToOrder = cart.map(product=>({
        productId:product.id,
        quantity:product.quantity,
        size:product.size
    }))
    const {rememberAddress, ...rest} = address
 
    // server action
    const resp = await placeOrder(productsToOrder,rest)
    if(!resp.ok){
      setIsPlacingOrder(false);
      setErrorMessage(resp.message)
      return
    }
    //* Todo salio bien
    clearCart();
    router.replace(`/orders/${resp.order!.id}`)
  };

  if (!loaded) {
    return <p>Cargando...</p>;
  }
  return (
    <div className="bg-white rounded-xl shadow-xl p-7">
      <h2 className="text-2xl font-bold mb-2">Direccion de entrega</h2>

      <div className="mb-10">
        <p>
          {address.firstName} {address.lastName}
        </p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>{address.postalCode}</p>
        <p>
          {address.city}, {address.country}
        </p>
        <p>{address.phone}</p>
      </div>

      {/* divider */}
      <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />
      <h2 className="text-2xl mb-2">Resumen de orden</h2>

      <div className="grid grid-cols-2">
        <span>N° Productos</span>
        <span className="text-right">{totalItems} Articulos</span>

        <span>Subtotal (15%)</span>
        <span className="text-right">{currencyFormat(subTotal)}</span>

        <span className="mt-5 text-2xl">Total</span>
        <span className="mt-5 text-2xl text-right">
          {currencyFormat(total)}
        </span>
      </div>
      <div className="mt-5 mb-2 w-full">
        <p className="mb-5">
          <span className="text-xs">
            Al hacer click en "Colocar orden", aceptas nuestros{" "}
            <a href="#" className="underline">
              Terminos y condiciones
            </a>
          </span>
        </p>

        <p className="text-red-500">{errorMessage}</p>
        <button
          onClick={onPlaceOrder}
          className={clsx({
            "btn-primary": !isPlacingOrder,
            "btn-disabled": isPlacingOrder,
          })}
          // href={"/orders/1234"}
        >
          Colocar orden
        </button>
      </div>
    </div>
  );
};
