"use client";

import Link from "next/link"
import { useState, useEffect } from "react";
import { CustomButton } from "@/components/ui/custom-button"
import { fetchProducts, Product } from "@/lib/products";
import { CategorySkeleton } from "./category-skeleton";
import GlareHover from './GlareHover'
import { useLanguage } from "@/context/language-context"

const getCategoryIcon = (categoryKey: string) => {
  const c = categoryKey.toLowerCase();
  if (c.includes("dry")) return "/images/dry-fish.png";
  if (c.includes("fresh")) return "/images/Fresh-fish.png";
  if (c.includes("frozen")) return "/images/frozen-meat.png";
  if (c.includes("non frozen") || c.includes("non-frozen") || c.includes("non")) return "/images/non-meat.png";
  return "/images/Fresh-fish.png";
}

export function CategoriesGrid() {
  const [uniqueCategories, setUniqueCategories] = useState<{ key: string; label: string; image: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      const fetchedProducts = await fetchProducts();

      const categoriesFromApi = Array.from(new Set(fetchedProducts.map(p => p.category)))
        .filter((category) => {
          const c = String(category || '').toLowerCase();
          return c !== 'frozen' && c !== 'non frozen' && c !== 'non-frozen';
        });

      const categoriesData = categoriesFromApi.map(category => {
        const product = fetchedProducts.find(p => p.category === category);
        return {
          key: category,
          label: category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
          image: product?.image || "/placeholder.svg?height=400&width=400&query=category"
        };
      });
      setUniqueCategories(categoriesData);
      setIsLoading(false);
    };
    loadProducts();
  }, []);

  const localizeCategory = (categoryKey: string, fallback: string) => {
    const c = categoryKey.toLowerCase();
    if (c.includes('dry')) return t('category.dryFish', 'Dry Fish');
    if (c.includes('fresh')) return t('category.freshCut', 'Fresh Cut');
    if (c.includes('frozen')) return t('category.frozen', 'Frozen');
    if (c.includes('non frozen') || c.includes('non-frozen') || c.includes('non')) return t('category.nonFrozen', 'Non Frozen');
    return fallback;
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 categories-grid">
      {isLoading
        ? Array.from({ length: 4 }).map((_, index) => <CategorySkeleton key={index} />)
        : uniqueCategories.map((cat) => (
        <Link href={`/category/${encodeURIComponent(cat.key.replace(/\s+/g, '-'))}`} key={cat.key}>
          <GlareHover
            glareColor="#ffffff"
            glareOpacity={10.3}
            glareAngle={-30}
            glareSize={700}
            transitionDuration={800}
            playOnce={false}
            width="auto"
            height="auto"
            background="transparent"
            borderRadius="10px"
            borderColor="transparent"
          >
            <div className="rounded-lg shadow-lg transition-shadow cursor-pointer relative overflow-hidden w-[170px] h-[270px] md:w-[300px] md:h-[450px] lg:w-auto lg:h-auto mx-auto">
              <img
                src={cat.image}
                alt={`${cat.label} category`}
                className="object-cover w-[170px] h-[270px] sm:w-[260px] sm:h-[360px] md:w-[300px] md:h-[450px] lg:w-[364px] lg:h-[498px]"
              />
              <div className="absolute inset-0 flex items-center justify-center translate-y-24 md:translate-y-42">
                {/* Mobile: keep current small size */}
                <CustomButton
                  icon={<img src={getCategoryIcon(cat.key)} alt={cat.label} className="w-11 h-11 object-contain" />}
                  title={localizeCategory(cat.key, cat.label)}
                  size="xs"
                  className="bg-white text-black hover:bg-white scale-100 md:hidden"
                />
                {/* md+ : larger button for iPad/PC */}
                <CustomButton
                  icon={<img src={getCategoryIcon(cat.key)} alt={cat.label} className="w-12 h-12 lg:w-14 lg:h-14 object-contain" />}
                  title={localizeCategory(cat.key, cat.label)}
                  size="sm"
                  className="hidden md:inline-flex bg-white text-black hover:bg-white md:scale-110 lg:scale-125 xl:scale-150"
                />
              </div>
            </div>
          </GlareHover>
        </Link>
      ))}
    </div>
  )
}
