 
import {Title } from "@/components";
 
import Link from "next/link";
import { redirect } from "next/navigation";
import { ProductInCart } from "./ui/ProductInCart";
import { useCartStore } from "@/store";
import { CheckoutResumeOrder } from "./ui/CheckoutResumeOrder";
 

 
export default function CartPage() {

  // redirect('empty')

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Carrito" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* carrito */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Ajustar elementos</span>

            <Link href={"/cart"} className="underline mb-5">
              Seguir comprando
            </Link>

            {/* items */}

            <ProductInCart/>
          </div>

          {/* checkout - Resumen de orden*/}

          <CheckoutResumeOrder/>
 
        </div>
      </div>
    </div>
  );
}
