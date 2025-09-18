"use client";

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { MasonryGrid } from '@/components/ui/image-testimonial-grid';
import { getRandomProducts, Product } from '@/lib/products'; // Import getRandomProducts and Product type
import { useLanguage } from "@/context/language-context";

// Reusable Card Component for product images
const ProductImageCard = ({ imageSrc }: { imageSrc: string }) => (
  <div className="relative rounded-2xl overflow-hidden group transition-transform duration-300 ease-in-out hover:scale-105">
    <img
      src={imageSrc}
      alt="Product Image"
      className="w-full h-auto object-cover"
      onError={(e) => {
        e.currentTarget.src = 'https://placehold.co/800x600/1a1a1a/ffffff?text=Image';
      }}
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/0 to-transparent" />
  </div>
);

const ProductGallery = () => {
  const [columns, setColumns] = React.useState(4);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const { t } = useLanguage();

  // Function to determine columns based on screen width
  const getColumns = (width: number) => {
    if (width < 640) return 1;    // sm
    if (width < 1024) return 2;   // lg
    if (width < 1280) return 3;   // xl
    return 4;                     // 2xl and up
  };

  React.useEffect(() => {
    const handleResize = () => {
      setColumns(getColumns(window.innerWidth));
    };

    handleResize(); // Set initial columns on mount

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  React.useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const randomProducts = await getRandomProducts(20); // Fetch 20 random products
        setProducts(randomProducts);
      } catch (err) {
        setError("Failed to fetch products.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, []);

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-10 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">{t("gallery.productSpotlight", "Product Spotlight")}</h2>
        <p>{t("gallery.loading", "Loading products...")}</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container mx-auto px-4 py-10 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">{t("gallery.productSpotlight", "Product Spotlight")}</h2>
        <p className="text-red-500">{t("gallery.error", error || "Failed to fetch products.")}</p>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-10">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">{t("gallery.productSpotlight", "Product Spotlight")}</h2>
      <div className="w-full bg-background text-foreground">
        <div className="max-w-7xl mx-auto">
          <MasonryGrid columns={columns} gap={4}>
            {products.map((product, index) => (
              <ProductImageCard key={product.id} imageSrc={product.image} />
            ))}
          </MasonryGrid>
        </div>
      </div>
    </section>
  );
};

export default ProductGallery;
