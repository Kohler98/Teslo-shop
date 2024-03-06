import { initialData } from "./seed"
import prisma from '../lib/prisma';
import { countries } from "./seed-countries";

async function main() {

    // 1. Borrar los registros previos
    await prisma.orderAddress.deleteMany()
    await prisma.orderItem.deleteMany()
    await prisma.order.deleteMany()

    await prisma.userAddress.deleteMany()
    await prisma.user.deleteMany()
    await prisma.countries.deleteMany()
    
    await prisma.productImage.deleteMany()
    await prisma.product.deleteMany()
    await prisma.category.deleteMany()
    // categorias
    const {categories, products,users} = initialData
    await prisma.countries.createMany({
        data:countries
    })
    await prisma.user.createMany({
        data:users
    })

    const categoriesData = categories.map((name) =>({name}))
    await prisma.category.createMany({
        data:categoriesData
    })
    const categoriesDB = await prisma.category.findMany();
    const categoriesMap = categoriesDB.reduce((map,category)=>{
        map[category.name.toLowerCase()] = category.id
        
        return map
    },{} as Record<string,string>); // string=shirt,categoryId
    // console.log("ejecutado correctamente")

    // productos
    // const {images,type,...product1} = products[0]

    // await prisma.product.create({
    //     data:{
    //         ...product1,
    //         categoryId:categoriesMap['shirts']
    //     }
    // })
    products.forEach(async(product)=>{

        const {images,type,...rest} = product
        const dbProduct = await prisma.product.create({
            data:{
                ...rest,
                categoryId:categoriesMap[type]
            }
        })

        const imagesData = images.map(image=>({
            url:image,
            productId:dbProduct.id
        }))

        await prisma.productImage.createMany({
            data:imagesData
        })
    })
    console.log("DB procesada correctamente")
}

(()=>{
    main()
})()