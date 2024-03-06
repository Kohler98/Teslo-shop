// https://tailwindcomponents.com/component/hoverable-table
import { getPaganitedProductsWithImages } from "@/app/actions";
import { auth } from "@/auth.config";
import { Pagination, Title } from "@/components";

import Link from "next/link";
import { redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";
import { ProductTable } from "./ui/ProductTable";
interface Props {
  searchParams: {
    page?: string;
  };
}
export default async function ProductsAdminPage ({searchParams}:Props) {

  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { products,currentPage,totalPages } = await getPaganitedProductsWithImages({page});
 
 
  return (
    <>
      <Title title="Mantenimiento de Productos" />
      <div className="flex justify-end mb-5">
        <Link href={'/admin/product/new'} className="btn-primary">
          Crea un nuevo producto
        </Link>
      </div>
      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Imagen
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Titulo
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Precio
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Genero
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Inventario
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Tallas
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <ProductTable key={product.id} product={product} />
            ))}
          </tbody>
        </table>
        <Pagination totalPage={totalPages}/>
      </div>
    </>
  );
}
