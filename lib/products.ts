export type Product = {
  id: string;
  name: string;
  category: string;
  image: string; // This will be mapped from image_url
  price: number;
  description?: string;
  rating?: number;
  reviews?: number;
  isFeatured?: boolean;
  is_on_sale?: boolean; // Add is_on_sale to the Product type
  // Add image_url from API response to the type for internal use before mapping
  image_url?: string;
};

const API_URL = "https://admin.tintucuts.com/api/products";

let cachedProducts: Product[] | null = null;

export async function fetchProducts(): Promise<Product[]> {
  if (cachedProducts) {
    return cachedProducts;
  }
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result: { items: Product[] } = await response.json();
    // Filter products to only include "fresh cut" and "dry fish" for now
    // Filter products to only include "Fresh Fish" and "Dry Fish" from the API
    let filteredAndMappedProducts = result.items.filter(product => product.category === "Fresh Fish" || product.category === "Dry Fish");

    // Map API response fields to match the Product type and ensure category consistency
    cachedProducts = filteredAndMappedProducts.map(product => ({
      id: product.id,
      name: product.name,
      category: product.category === "Fresh Fish" ? "fresh cut" : (product.category === "Dry Fish" ? "dry fish" : product.category),
      image: product.image_url || "/placeholder.svg", // Map image_url to image, provide fallback
      price: product.price,
      description: product.description,
      rating: product.rating,
      reviews: product.reviews,
      isFeatured: product.is_on_sale, // Assuming is_on_sale maps to isFeatured
    }));
    return cachedProducts;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getRandomProducts(count: number): Promise<Product[]> {
  const products = await fetchProducts();
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
