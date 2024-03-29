import {  Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";
import { ProductInCart } from "./ui/ProductInCart";
import { PlaceOrder } from "./ui/PlaceOrder";

 

export default function CheckoutPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Verificar Cuentas" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* carrito */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Agregar mas item</span>

            <Link href={"/"} className="underline mb-5">
              Editar carrito
            </Link>

            {/* items */}

            <ProductInCart/>
          </div>

          {/* checkout - Resumen de orden*/}
          <PlaceOrder/>
        </div>
      </div>
    </div>
  );
}
