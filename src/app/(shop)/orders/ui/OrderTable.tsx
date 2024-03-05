import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { IoCardOutline } from "react-icons/io5";
type OrderAddress = {
  firstName: string;
  lastName: string;
};
type Order = {
  id: string;
  isPaid: boolean;
  OrderAddress: OrderAddress | null;
};
interface Props {
  order: Order;
}
export const OrderTable = ({ order }: Props) => {
 
  return (
    <>
      <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {order.id}
        </td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
         {order.OrderAddress?.firstName} {order.OrderAddress?.lastName}
        </td>
        <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          <IoCardOutline className={clsx({
            "text-green-800":order.isPaid,
            "text-red-800": !order.isPaid
          })} />
          <span className={
            clsx("mx-2 ",{
                "text-green-800":order.isPaid,
                "text-red-800": !order.isPaid
            })
          }>{order.isPaid ? 'Pagado' : 'Pendiente'}</span>
        </td>
        <td className="text-sm text-gray-900 font-light px-6 ">
          <Link href={`/orders/${order.id}`} className="hover:underline">
            Ver orden
          </Link>
        </td>
      </tr>

  
    </>
  );
};
