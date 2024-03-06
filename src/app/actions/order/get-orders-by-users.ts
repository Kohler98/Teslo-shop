import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getOrdersByUser = async (id :string) => {
  const session = await auth();

  try {
    if (!session?.user) {
      return {
        ok: false,
        message: "Debe de estar autenticado",
      };
    }
 
    const order = await prisma.order.findMany({
        where:{userId:id},
        select:{
            id:true,
            isPaid:true,
            OrderAddress:{
                select:{
                    firstName:true,
                    lastName:true
                }
            }
        }
    })
    return {
        ok: true,
        message: "Exito",
        order:order
      };
  } catch (error) {
    return {
        ok: false,
        message: "No hay orders",
      };
  }
};
