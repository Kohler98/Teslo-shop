'use server'
 
import prisma from "@/lib/prisma"

export const getStockBySlug = async(slug:string) =>{
 
    try {
        const stock = await prisma.product.findFirst({

            where:{
                slug:slug
            },
            select:{inStock:true}
        })

        if(!stock) return null

        return stock.inStock ?? 0
    } catch (error) {
        return 0
    }
}