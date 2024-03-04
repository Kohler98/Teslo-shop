import { ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props{
  params:{
    id:Category
  }
}
export default function CategoryPage({params}:Props) {
  const {id} = params
  const products = initialData.products.filter((product)=> product.gender == id);
  // if(id == 'kids'){
  //   notFound()
  // }
 
  const labels:Record<Category,string> = {
    'men': 'Hombres',
    'women': 'Mujeres',
    'kid': 'Niños',
    'unisex':'Todos'
  }
  return (
    <>
    <Title
      title={`Articulos para ${labels[id]}`}
      subTitle={`Todos los productos para ${labels[id]}`}
      className="mb-2"
    />
      {/* <ProductGrid
        products={products}/> */}
      
    </>
  );
}