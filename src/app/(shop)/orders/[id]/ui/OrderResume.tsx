"use client";

import React from "react";

import { currencyFormat } from "../../../../utils/currencyFormat";
import { PaypalButton } from "@/components";
import { IsPaid } from "./IsPaid";

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
      <div className="mt-5 text-2xl text-right">
        {checkout.isPaid ? (
          <IsPaid isPaid={checkout.isPaid} />
        ) : (
          <PaypalButton amount={checkout!.total} orderId={checkout!.id} />
        )}
      </div>
    </div>
  );
};
