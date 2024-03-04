"use server";

import { Address } from "@/interfaces";
import prisma from "@/lib/prisma";

export const setUserAddress = async (address: Address, userId: string) => {
  try {
    const newAddres = await createOrReplaceAddress(address,userId)

    return {
        ok: true,
        address:newAddres
      };
  } catch (error) {
    return {
      ok: false,
      message: "No se pudo grabar la direccion",
    };
  }
};

const createOrReplaceAddress = async (address: Address, userId: string) => {
  try {
    const storedAddress = await prisma.userAddress.findUnique({
      where: {
        userId: userId,
      },
    });
    const addresToSave = {
      userId: userId,
      address: address.address,
      address2: address.address2,
      countriesId: address.country,
      firstName: address.firstName,
      lastName: address.phone,
      postalCode: address.postalCode,
      phone: address.phone,
      city:address.city,
    };
    if (!storedAddress) {
      const newAddress = await prisma.userAddress.create({
        data: addresToSave,
      });

      return newAddress
    }

    const updatedAddress = await prisma.userAddress.update({
        where:{userId},
        data:addresToSave
    })

    return updatedAddress
  } catch (error) {
    console.log(error);
    throw new Error("No se pudo grabar la direccion");
  }
};
