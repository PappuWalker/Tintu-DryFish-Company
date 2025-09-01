"use client";

import React, { useState, useEffect, useCallback, memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getHighlyRecommendedProducts } from "@/lib/highly-recommended-products";
import { Product } from "@/lib/products";
import { slugify } from "@/lib/utils";

// Memoized components for better performance
const ProductCard = memo(({ product, isActive }: { product: Product; isActive: boolean }) => (
  <Link
    href={`/product/${slugify(product.name)}`}
    className={`p-4 cursor-pointer text-center transition-all duration-300 ease-in-out rounded-lg block
                ${isActive ? 'bg-[#172526] text-white shadow-lg scale-105' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
  >
    <span className="block font-semibold text-lg">
      {product.name}
    </span>
  </Link>
));

const ProductImage = memo(({ product, isActive }: { product: Product; isActive: boolean }) => (
  <Link
    href={`/product/${slugify(product.name)}`}
    className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out block
                ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
  >
    <div className="relative w-full h-full overflow-hidden">
      <Image
        src={product.image || 'https://via.placeholder.com/500'}
        alt={product.name}
        fill
        style={{ objectFit: 'cover' }} // Ensure images fill the card width
        className={`transition-transform duration-500 ease-in-out ${isActive ? 'scale-110' : 'scale-100'}`} // Zoom from center
        unoptimized
        priority={true}
      />
    </div>
  </Link>
));

export function HighlyRecommendedSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  // Memoized handlers
  const handleProductClick = useCallback((index: number) => {
    setActiveProductIndex(index);
  }, []);

  useEffect(() => {
    setIsMounted(true);
    // Fetch and shuffle products only on the client side
    setProducts(getHighlyRecommendedProducts(8));
  }, []);

  // Product rotation effect
  useEffect(() => {
    if (!isMounted || products.length === 0) return;

    const intervalId = setInterval(() => {
      setActiveProductIndex((prevIndex) =>
        (prevIndex + 1) % products.length
      );
    }, 3000); // 3 seconds for better UX

    return () => clearInterval(intervalId);
  }, [isMounted, products.length]);

  if (products.length === 0) {
    return null; // Don't render if no products
  }

  return (
    <section className="container mx-auto py-8 px-4 product-showcase-section">
      <h2 className="text-3xl font-bold text-center mb-8">Highly Recommended</h2>
      <div className="flex flex-col gap-8 items-center">
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              isActive={index === activeProductIndex}
            />
          ))}
        </div>
        <div className="w-full relative max-w-[1000px] h-[500px] overflow-hidden rounded-lg shadow-lg"> {/* Set card size to 1000x500 */}
          {products.map((product, index) => (
            <ProductImage
              key={product.id}
              product={product}
              isActive={index === activeProductIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
