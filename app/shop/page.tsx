"use client"

import { useState, useEffect } from "react";
import { ProductSection } from "@/components/product-section";
import { fetchProducts, Product } from "@/lib/products";
import { Button } from "@/components/ui/button";

export default function ShopPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all products");
  const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setAllProducts(fetchedProducts);

      const categoriesFromApi = Array.from(new Set(fetchedProducts.map(p => p.category)));
      // Ensure "frozen" and "non frozen" tabs are always present
      const allPossibleCategories = ["all products", ...categoriesFromApi, "frozen", "non frozen"];
      setUniqueCategories(Array.from(new Set(allPossibleCategories)));
    };
    loadProducts();
  }, []);

  const filteredProducts = selectedCategory === "all products"
    ? allProducts
    : allProducts.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Shop Our Products</h1>
      <div className="flex space-x-4 mb-8 overflow-x-auto">
        {uniqueCategories.map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className="capitalize flex-shrink-0"
          >
            {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </Button>
        ))}
      </div>
      <ProductSection title={`${selectedCategory.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Products`} products={filteredProducts} />
    </div>
  );
}
