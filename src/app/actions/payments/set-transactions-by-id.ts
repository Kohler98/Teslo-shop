'use server'
import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const setTransactionById = async (
  orderId: string,
  transactionId: string
) => {
  try {
    const session = await auth();
    if (!session?.user) {
      return {
        ok: false,
        message: "Debe de estar autenticado",
      };
    }
    const order = await prisma.order.update({
        where:{id:orderId},
        data:{
            transactionId:transactionId 
        }
    })
    if(!order){
 
      return{
        ok:false,
        message:`No se encontro la orden`
      }
      
    }
    return {
        ok: true,
        resp:order,
        message: "Transacction Id actualizada con exito",
      };
  } catch (error) {
    return {
        ok: false,
        message: "Error al tratar de actualizar",
      };
  }
};
