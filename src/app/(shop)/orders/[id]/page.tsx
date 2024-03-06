import { Title } from "@/components";
import clsx from "clsx";

import { IoCardOutline } from "react-icons/io5";
import { OrderResume } from "./ui/OrderResume";
import { ProductsInCart } from "./ui/ProductsInCart";
import { getOrderById } from "@/app/actions";
import { auth } from "@/auth.config";
import { notFound, redirect } from "next/navigation";
import { IsPaid } from './ui/IsPaid';

interface Props {
  params: {
    id: string;
  };
}
export default async function OrderPage({ params }: Props) {
  const session = await auth();
  if (!session?.user) {
    // redirect('/auth/login?returnTo=perfil')
    redirect("/");
  }
  const { id } = params;
  //llamar el server actions
  const order = (await getOrderById(id)) as any;
  if (!order.ok) {
    notFound();
  }
  const { OrderItem, OrderAddress, ...rest } = order.order;
 
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Order #${id}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* carrito */}
          <div className="flex flex-col mt-5">
          <IsPaid isPaid={rest.isPaid}/>

            {/* items */}
            <ProductsInCart orderItems={OrderItem} />
          </div>

          {/* checkout - Resumen de orden*/}
          <OrderResume orderAddress={OrderAddress} checkout={rest} />
        </div>
      </div>
    </div>
  );
}
