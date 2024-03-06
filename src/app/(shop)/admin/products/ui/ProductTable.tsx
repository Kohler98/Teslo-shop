import { currencyFormat } from "@/app/utils";
import { ProductImage } from "@/components";
import { Product } from "@/interfaces";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoCardOutline } from "react-icons/io5";
 
interface Props {
  product: Product;
}
export const ProductTable = ({ product }: Props) => {
 
  return (
    <>
      <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          <Link
            href={`/product/${product.slug}`}
          >
          <ProductImage
            src={product.images[0]}
            width={80}
            height={80}
            alt={product.title}
            className="w-20 h-20 object-cover"
            
            />
            </Link>
        </td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          <Link 
          href={`/admin/product/${product.slug}`}
          className="hover:underline"
          >
            {product.title}
          </Link>
        </td>
        <td className=" text-sm  text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
    {currencyFormat(product.price)}
        </td>
        <td className=" text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
    {product.gender}
        </td>
        <td className=" text-sm  text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
    {product.inStock}
        </td>
        <td className=" text-sm  text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
    {product.sizes.join(', ')}
        </td>
 
      </tr>

  
    </>
  );
};
