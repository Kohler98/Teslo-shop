'use server'

import prisma from "@/lib/prisma";
// import {v2 as cloudinary} from 'cloudinary';
import { revalidatePath } from 'next/cache';
// cloudinary.config( process.env.CLOUDINARY_URL ?? '' );


export const deleteProductImage = async (imageId: number, imageUrl:string)=>{
    if(!imageUrl.startsWith('')){
        return{
            ok:false,
            error:'No se puede borrar las imagenes'
        }
    }

    // await cloudinary.uploader.destroy( imageName );
    const imageName = imageUrl.split('/').pop()?.split('.')[0] ?? '';
    try {
        const deletedImage = await prisma.productImage.delete({
            where:{
                id: imageId
            },
            select:{
                product:{
                    select:{
                        slug:true
                    }
                }
            }
        })

        //revalidar path

        revalidatePath(`/admin/products`)
        revalidatePath(`/admin/product/${deletedImage.product.slug}`)
        revalidatePath(`/products/${deletedImage.product.slug}`)
    } catch (error) {
        console.log(error)
        return{
            ok:false,
            message:'No se pudo borrar la imagen'
        }
    }


}