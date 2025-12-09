import ProductsContainer from "@/components/ProductsContainer";
import { ProductsContainerSkeleton } from "@/components/Skeletons";
import { getAllProducts } from "@/lib/api";
import { Suspense } from "react";

export default function AllProductsPage() {
   const allProducts = getAllProducts();
 
   return (
     <Suspense fallback={<ProductsContainerSkeleton />}>
       <ProductsContainer items={allProducts}  />
     </Suspense>
   );
}
