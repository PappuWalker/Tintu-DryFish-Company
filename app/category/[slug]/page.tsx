"use client";

import { useState, useEffect } from "react";
import { ProductSection } from "@/components/product-section";
import { fetchProducts, Product } from "@/lib/products";
import { useParams } from "next/navigation";

export default function CategoryPage() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const params = useParams<{ slug: string }>();
  const decodedSlug = decodeURIComponent(String(params.slug));
  const category = decodedSlug.replace(/-/g, ' ');

  useEffect(() => {
    const loadProducts = async () => {
      const allProducts = await fetchProducts();
      const productsForCategory = allProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());
      setFilteredProducts(productsForCategory);
    };
    loadProducts();
  }, [category]);

  return (
    <div className="container mx-auto px-4 py-10">
      <ProductSection title={category.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} products={filteredProducts} />
    </div>
  );
}
