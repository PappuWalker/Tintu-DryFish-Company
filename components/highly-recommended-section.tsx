"use client";

import React, { useState, useEffect, useCallback, memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getRandomProducts, Product } from "@/lib/products";
import { slugify } from "@/lib/utils";

// Memoized components for better performance
const ProductCard = memo(({ product, isActive }: { product: Product; isActive: boolean }) => (
  <Link
    href={`/product/${slugify(product.name)}`}
    className={`p-2 md:p-4 cursor-pointer text-center transition-all duration-300 ease-in-out rounded-lg block
                ${isActive ? 'bg-gradient-to-r from-[#020a08] via-[#2f3c41] to-[#020a08] text-white shadow-lg scale-105' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
  >
    <span className="block font-semibold text-sm md:text-lg">
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
    const fetchAndSetProducts = async () => {
      const randomProducts = await getRandomProducts(4); // Fetch 4 random products
      setProducts(randomProducts);
    };
    fetchAndSetProducts();
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
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              isActive={index === activeProductIndex}
            />
          ))}
        </div>
        <div className="relative w-[315px] h-[250px] md:w-full md:h-[500px] md:max-w-[1000px] lg:w-[1000px] lg:h-[600px] overflow-hidden rounded-lg shadow-lg mx-auto"> {/* 315x250 mobile, 1000x500 on md, 1000x700 on lg+ */}
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
