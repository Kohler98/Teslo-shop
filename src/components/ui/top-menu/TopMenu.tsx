"use client";
import { titleFont } from "@/config/fonts";
import { useCartStore, useUiStore } from "@/store";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoSearchOutline, IoCartOutline } from "react-icons/io5";
export const TopMenu = () => {
  const openMenu = useUiStore((state) => state.openSideMenu);

  const totalItemsInCart = useCartStore((state) => state.getTotalItems());
  const [loaded, setLoaded] = useState(false)

  useEffect(()=>{
    setLoaded(true)
  },[])
  return (
    <nav className="flex px-2 justify-between items-center w-full">
      {/* logo */}

      <div>
        <Link href={"/"}>
          <span className={`${titleFont.className} antialiased font-bold`}>
            Teslo
          </span>
          <span>| Shop</span>
        </Link>
      </div>

      {/* center menu */}

      <div className="hidden sm:block">
        <Link
          href={"/gender/men"}
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >
          Hombres
        </Link>
        <Link
          href={"/gender/women"}
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >
          Mujeres
        </Link>
        <Link
          href={"/gender/kid"}
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >
          Niños
        </Link>
      </div>

      {/* search,cart, menu */}
      <div className="flex items-center">
        <Link href={"/search"} className="mx-2">
          <IoSearchOutline className="w-5 h-5" />
        </Link>
        <Link href={
          ((totalItemsInCart === 0) && loaded)
          ? 
          '/empty'
          :
          "/cart"
        }>
          <div className="relative ">
            {(loaded && totalItemsInCart > 0) && (
              <span className="absolute fade-in text-xs rounded-full px-1 font-bold -top-2 -right-2  bg-blue-700 text-white">
                {totalItemsInCart}
              </span>
            )}
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>
        <button
          onClick={() => openMenu()}
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >
          Menu
        </button>
      </div>
    </nav>
  );
};
