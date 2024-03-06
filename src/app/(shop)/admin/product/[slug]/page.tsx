import { getCategories, getProductBySlug } from "@/app/actions";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { ProductForm } from "./ui/ProductForm";
 
interface Props{
    params:{
        slug: string
    },

}
export default async function ProductPage({params}:Props) {

    const {slug} = params
    const resp = await getCategories()
 
    if(!resp.ok){
        redirect('/admin/products')
    }
    const categories = resp.categories
    const product = await getProductBySlug(slug)
    //todo new
    if(!product && slug !== 'new'){
        redirect('/admin/products')
    }
    const title = slug === 'new' ? 'Nuevo producto' : 'Editar producto'
    return (
    <>
      <Title title={title}/>
      <ProductForm product={product ?? {}} categories={categories } />
    </>
  );
}