"use client";
import clsx from "clsx";
import React from "react";
import { IoCardOutline } from "react-icons/io5";
import { currencyFormat } from "../../../../utils/currencyFormat";

type Checkout = {
  id: string;
  subTotal: number;
  tax: number;
  total: number;
  itemsInOrder: number;
  isPaid: boolean;
  paidAt?: null;
  createdAt?: Date;
  updatedAt?: Date;
  userId?: string;
};
type OrderAddress = {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  postalCode: string;
  city: string;
  phone: string;
  countryId: string;
  orderId: string;
};

interface Props {
  orderAddress: OrderAddress;
  checkout: Checkout;
}
export const OrderResume = ({ orderAddress, checkout }: Props) => {
  return (
    <div className="bg-white rounded-xl shadow-xl p-7">
      <h2 className="text-2xl font-bold mb-2">Direccion de entrega</h2>

      <div className="mb-10">
        <p>
          Nombre completo {orderAddress.firstName} {orderAddress.lastName}
        </p>
        <p>Direccion:</p>
        <p>{orderAddress.address}</p>
        <p>{orderAddress.address2}</p>
        <p>Ciudad: {orderAddress.city}</p>
        <p>Postal Code: {orderAddress.postalCode}</p>
        <p>Phone : {orderAddress.phone}</p>
      </div>

      {/* divider */}
      <div className="w-full h-0.5 rounded bg-gray-200 mb-100" />
      <h2 className="text-2xl mb-2">Resumen de orden</h2>

      <div className="grid grid-cols-2">
        <span>No, Productos</span>
        <span className="text-right">{checkout.itemsInOrder} Articulos</span>

        <span>Subtotal (15%)</span>
        <span className="text-right">{currencyFormat(checkout.subTotal)}</span>
        <span>Tax</span>
        <span className="text-right">{currencyFormat(checkout.tax)}</span>

        <span className="mt-5 text-2xl">Total</span>
        <span className="mt-5 text-2xl text-right">
          {currencyFormat(checkout.total)}
        </span>
      </div>
      <div
        className={clsx(
          "flex items-center rounded-lg py-2 mt-6 px-3.5 text-xs font-bold text-white mb-5",
          {
            "bg-red-500": !checkout.isPaid,
            "bg-green-700": checkout.isPaid,
          }
        )}
      >
        <IoCardOutline size={30} />
        <span className="mx-2">{checkout.isPaid ? 'Pagado' : 'Pendiente'}</span>
      </div>
    </div>
  );
};
