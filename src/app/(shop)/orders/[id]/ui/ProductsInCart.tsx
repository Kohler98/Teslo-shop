"use client";
import React from "react";

import Image from "next/image";
import { Size } from "@/interfaces";
import { currencyFormat } from "@/app/utils";

type url = {
  url: string;
};
type Product = {
  slug: string;
  title: string;
  ProductImage: url[];
};
type OrderItem = {
  price: number;
  quantity: number;
  size: Size;
  product: Product;
};
interface Props {
  orderItems: OrderItem[];
}
export const ProductsInCart = ({ orderItems }: Props) => {
  console.log(orderItems)
  return (
    <>
      {orderItems.map((orderItem) => (
        <div key={orderItem.product.slug} className="flex mb-5">
          <Image
            src={`/products/${orderItem.product.ProductImage[0].url}`}
            width={100}
            height={100}
            style={{
              width: "100px",
              height: "100px",
            }}
            alt={orderItem.product.title}
            className="mr-5 rounded"
          />

          <div>
            <p>{orderItem.product.title} </p>
            <p>{currencyFormat(orderItem.price)} X {orderItem.quantity}</p>
            <p className="font-bold">Subtotal: {currencyFormat(orderItem.price * orderItem.quantity)}</p>
          </div>
        </div>
      ))}
    </>
  );
};
