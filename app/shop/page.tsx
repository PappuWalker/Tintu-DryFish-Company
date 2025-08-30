"use client"

import { useState } from "react";
import { ProductSection } from "@/components/product-section";
import { products } from "@/lib/products";
import { Button } from "@/components/ui/button";

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("all products");

  const uniqueCategories = ["all products", ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = selectedCategory === "all products"
    ? products
    : products.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());

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
