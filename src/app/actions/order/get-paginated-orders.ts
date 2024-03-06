import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getPaginatedOrders = async (id :string) => {
  const session = await auth();

  try {
    if (session?.user.role !== 'admin') {
      return {
        ok: false,
        message: "Debe de estar autenticado",
      };
    }
 
    const order = await prisma.order.findMany({
        orderBy:{
            createdAt:'desc'
        },
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
