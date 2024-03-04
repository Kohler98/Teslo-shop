import {  Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

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

            {productsInCart.map((product) => (
              <div key={product.slug} className="flex mb-5">
                <Image
                  src={`/products/${product.images[0]}`}
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
                  <p>{product.title}</p>
                  <p>{product.price}</p>
  
                </div>
              </div>
            ))}
          </div>

          {/* checkout - Resumen de orden*/}
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl font-bold mb-2">Direccion de entrega</h2>

            <div className="mb-10">
              <p>Victor leon</p>
              <p>Av. Siempre viva 123</p>
              <p>Col. Centro</p>
              <p>Alcaldia Cuauhtemoc</p>
              <p>Ciudad Mexico</p>
              <p>Cp 123123</p>
              <p>123.123.123</p>
            </div>

            {/* divider */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-100" />
            <h2 className="text-2xl mb-2">Resumen de orden</h2>

            <div className="grid grid-cols-2">
              <span>No, Productos</span>
              <span className="text-right">3 Articulos</span>

              <span>Subtotal (15%)</span>
              <span className="text-right">$ 100</span>

              <span className="mt-5 text-2xl">Total</span>
              <span className="mt-5 text-2xl text-right">$ 100</span>
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
              <Link
                className="flex btn-primary justify-center"
                href={"/orders/1234"}
              >
                Colocar orden
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
