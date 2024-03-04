import { getProductBySlug } from "@/app/actions";
import { ProductMobileSlideshow, ProductSlideShow, QuantitySelector, SizeSelector, StockLabel } from "@/components";
import { titleFont } from "@/config/fonts";
import { Metadata, ResolvingMetadata } from "next";
 
import { notFound } from "next/navigation";
import { AddToCart } from "./ui/AddToCart";

interface Props {
  params: {
    slug: string;
  };
}
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug
 
  // fetch data
  const product = await getProductBySlug(slug)
 
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: product?.title ?? 'Producto no encontrado',
    description:product?.description ?? '',
    openGraph: {
      title: product?.title ?? 'Producto no encontrado',
      description:product?.description ?? '',
      // images: ['/some-specific-page-image.jpg', ...previousImages],
      images:[`/products/${product?.images[1]}`]
    },
  }
}
 
export default async function ProductPage({ params }: Props) {
  const { slug } = params;

  const product = await getProductBySlug(slug)
  if (!product) {
    notFound();
  }
  return (
    <div className="mt-5 mb-20 grid md:grid-cols-3 gap-3">

      {/* slideshow */}
      <div className="col-span-1 md:col-span-2">
      {/* mobile slideshow */}

      <ProductMobileSlideshow
        title={product.title}
        images={product.images}
        className="block md:hidden"
        />

      {/* desktop slideshow */}
      <ProductSlideShow
        title={product.title}
        images={product.images}
        className="md:block hidden"
      />
      </div>
      {/* detalles */}
      <div className="col-span-1 px-5">
        <StockLabel slug={slug}/>
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">${product.price}</p>
      <AddToCart product={product}/>
        {/* descripcion */}
        <h3 className="font-bold text-sm">Descripcion</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
