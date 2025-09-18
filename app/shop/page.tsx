"use client"

import { useState, useEffect } from "react";
import { ProductSection } from "@/components/product-section";
import { fetchProducts, Product } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language-context";

export default function ShopPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all products");
  const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);
  const { t } = useLanguage();

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

  const localizeCategory = (category: string) => {
    const c = category.toLowerCase();
    if (c === 'all products') return t('shop.allProducts', 'all products');
    if (c === 'frozen') return t('shop.frozen', 'frozen');
    if (c === 'non frozen') return t('shop.nonFrozen', 'non frozen');
    if (c === 'dry fish' || c.includes('dry')) return t('category.dryFish', 'Dry Fish');
    if (c === 'fresh cut' || c.includes('fresh')) return t('category.freshCut', 'Fresh Cut');
    // Fallback: capitalize words
    return category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">{t("shop.title", "Shop Our Products")}</h1>
      <div className="flex space-x-4 mb-8 overflow-x-auto">
        {uniqueCategories.map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className="capitalize flex-shrink-0"
          >
            {localizeCategory(category)}
          </Button>
        ))}
      </div>
      <ProductSection
        title={
          selectedCategory === 'all products'
            ? t('shop.title', 'Shop Our Products')
            : `${localizeCategory(selectedCategory)} ${t('shop.products', 'Products')}`
        }
        products={filteredProducts}
      />
    </div>
  );
}
