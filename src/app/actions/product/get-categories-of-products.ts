import prisma from "@/lib/prisma"

export const getCategories = async() =>{
    try {
        const categories = await prisma.category.findMany({
            orderBy:{
                name:'desc'
            }
        })
        if(!categories){
            return{
                ok:false,
                message:'no hay categorias',
                categories:[]
            }
        }
        return{
            ok:true,
            categories:categories
        }
    } catch (error) {
        return{
            ok:'false',
            categories:[],
            message:'no se pudo encontrar las categorias'
        }
    }

    
}