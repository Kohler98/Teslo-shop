'use client'
import { currencyFormat } from "@/app/utils";
import { useCartStore } from "@/store";
import Link from "next/link";
import { useEffect, useState } from "react";
 

export const CheckoutResumeOrder = () => {
    const {totalItems,subTotal,total} = useCartStore((state) => state.getSummaryInformation());
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
      setLoaded(true);
    }, []);
    if (!loaded) {
      return <p>Loading...</p>;
    }
  return (
    <>
      <div className="bg-white rounded-xl h-fit shadow-xl p-7">
        <h2 className="text-2xl mb-2">Resumen de orden</h2>

        <div className="grid grid-cols-2">
          <span>N° Productos</span>
          <span className="text-right">{totalItems} Articulos</span>

          <span>Subtotal (15%)</span>
          <span className="text-right">{currencyFormat(subTotal)}</span>

          <span className="mt-5 text-2xl">Total</span>
          <span className="mt-5 text-2xl text-right">{currencyFormat(total)}</span>
        </div>
        <div className="mt-5 mb-2 w-full">
          <Link className="flex btn-primary justify-center" href={"/checkout/address"}>
            Checkout
          </Link>
        </div>
      </div>
    </>
  );
};
