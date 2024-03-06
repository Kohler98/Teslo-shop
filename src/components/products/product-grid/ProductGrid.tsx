import { Product } from "@/interfaces"
import { ProductGridItems } from "./ProductGridItems";

interface Props{
    products: Product[];
 }

export const ProductGrid:React.FC<Props> = ({products}) => {
  return (  
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 mb-10">
        {
            products.map((product)=>(
                <ProductGridItems 
                product={product}
                key={product.slug}/>
            ))
        }
    </div>
  )
}
