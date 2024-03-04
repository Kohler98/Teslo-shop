"use client";

import React from "react";
import {
  IoCloseOutline,
  IoLogIn,
  IoLogOut,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from "react-icons/io5";
import { SidebarItem } from ".";
import { useUiStore } from "@/store";
import clsx from "clsx";
import { logout } from "@/app/actions";
import { useSession } from "next-auth/react";
import { useRouter, redirect } from "next/navigation";

export const Sidebar = () => {
  const isSideMenuOpen = useUiStore((state) => state.isSideMenuOpen);
  const closeMenu = useUiStore((state) => state.closeSideMenu);

  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;

  return (
    <div>
      {/* background black */}
      {isSideMenuOpen && (
        <div className="fixed top-0 left-0 w-screenh-screen z-10 bg-black opacity-30 " />
      )}

      {/* blur */}
      {isSideMenuOpen && (
        <div
          onClick={() => closeMenu()}
          className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
        />
      )}
      {/* sidemenu */}

      <nav
        className={clsx(
          "fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
          {
            "translate-x-full": !isSideMenuOpen,
          }
        )}
      >
        <IoCloseOutline
          size={50}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => closeMenu()}
        />

        {/* input */}
        <div className="relative mt-14">
          <IoSearchOutline size={20} className="absolute top-2 left-2" />
          <input
            type="text"
            placeholder="Buscar"
            className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Menu */}
        {(session?.user.role == "admin" || session?.user.role == "user") && (
          <>
            <SidebarItem
              title="Perfil"
              icon={<IoPersonOutline size={30} />}
              href="/profile"
              onClick={() => closeMenu()}
            />
            <SidebarItem
              title="Ordenes"
              href="/orders"
              icon={<IoTicketOutline size={30} />}
              onClick={() => closeMenu()}
            />
          </>
        )}

        {!isAuthenticated && (
          <>
            <SidebarItem
              title="Ingresar"
              href="/auth/login"
              icon={<IoLogIn size={30} />}
              onClick={() => closeMenu()}
            />
            <SidebarItem
              title="Registrarse"
              href="/auth/register"
              icon={<IoPeopleOutline size={30} />}
              onClick={() => closeMenu()}
            />
          </>
        )}

        {isAuthenticated && (
          <SidebarItem
            title="Cerrar session"
            icon={<IoLogOut size={30} />}
            onClick={() => {
              logout();
              closeMenu();
              window.location.replace("/");
            }}
          />
        )}
        {session?.user.role == "admin" && (
          <>
            <div className="w-full h-px bg-gray-200 my-10" />

            <SidebarItem
              title="Productos"
              icon={<IoShirtOutline size={30} />}
              onClick={() => closeMenu()}
            />
            <SidebarItem
              title="Ordenes"
              icon={<IoTicketOutline size={30} />}
              onClick={() => closeMenu()}
            />
            <SidebarItem
              title="Usuarios"
              icon={<IoPeopleOutline size={30} />}
              onClick={() => closeMenu()}
            />
          </>
        )}
      </nav>
    </div>
  );
};
