export const revalidate = 60
import { getPaganitedProductsWithImages } from "@/app/actions";
import { Pagination, ProductGrid, Title } from "@/components";
 
import { redirect } from "next/navigation";

interface Props{
  params:{
    id:string
  };
  searchParams: {
    page?: string;
  };
}
export default async function CategoryPage({params,searchParams}:Props) {
  const {id} = params
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const {products,totalPages} = await getPaganitedProductsWithImages({page:page,gender:id}) ?? []
 
  if(products.length ==0){
    redirect('/')
  }
  const labels:Record<string,string> = {
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
      <ProductGrid
        products={products}/>
      <Pagination totalPage={totalPages}/>
    </>
  );
}