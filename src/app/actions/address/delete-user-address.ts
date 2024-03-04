'use server'

import prisma from "@/lib/prisma";

export const deleteUserAddress = async(userId:string) =>{
    try {
        const borrar =  await prisma.userAddress.delete({
            where:{userId:userId}
        })
        return {
            ok: true,
 
          };
    } catch (error) {
        return {
            ok: false,
 
          };
    }
}

 