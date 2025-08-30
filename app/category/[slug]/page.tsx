import { ProductSection } from "@/components/product-section";
import { products } from "@/lib/products";

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const decodedSlug = decodeURIComponent(params.slug);
  const category = decodedSlug.replace(/-/g, ' ');
  const filteredProducts = products.filter(p => p.category.toLowerCase() === category.toLowerCase());

  return (
    <div className="container mx-auto px-4 py-10">
      <ProductSection title={category.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} products={filteredProducts} />
    </div>
  );
}
