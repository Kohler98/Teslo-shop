"use server";

 
import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
 
export const getOrderById = async (id: string) => {

  try {
    const session = await auth();
    if(!session?.user){
        return {
            ok: false,
            message: 'Debe de estar autenticado'
          }
    }

    const order = await prisma.order.findUnique({
      where: { id: id },
      include: {
        OrderAddress:true,
        OrderItem: { 
            select:{
                price:true,
                quantity:true,
                size:true,
                product:{
                    select:{
                        title:true,
                        slug:true,
                        ProductImage:{
                            select:{
                                url:true
                            },
                            take:1
                        }
                    }
                }
            }
        },
      },
    });
    if ( session.user.role === 'user' ) {
        if ( session.user.id !== order?.userId ) {
          throw `${ id } no es de ese usuario`
        }
      }

    return{
        ok:true,
        order:order
    }
    // console.log(order);
  } catch (error) {
    console.log(error)

    return{
        ok:false,
        message:'Orden no existe'
    }
  }
};
