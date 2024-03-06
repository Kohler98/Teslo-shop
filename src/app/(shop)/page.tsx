export const revalidate = 60
import { Pagination, ProductGrid, Title } from "@/components";

import { getPaganitedProductsWithImages } from "../actions";
import { redirect } from "next/navigation";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function Home({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { products,currentPage,totalPages } = await getPaganitedProductsWithImages({page});

 
  if(products.length ==0){
    redirect('/')
  }
  return (
    <>
      <Title title="Tienda" subTitle="Todos los productos" className="mb-2" />
      <ProductGrid products={products} />

      <Pagination totalPage={totalPages}/>
    </>
  );
}
