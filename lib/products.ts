export type Product = {
  id: string;
  name: string;
  name_ta?: string;
  category: string;
  image: string; // This will be mapped from image_url
  price: number;
  sale_price?: number | null;
  description?: string;
  rating?: number;
  reviews?: number;
  isFeatured?: boolean;
  is_on_sale?: boolean; // Add is_on_sale to the Product type
  inventory?: number;
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
    const result: { items: any[] } = await response.json();
    // Filter products to only include "fresh cut" and "dry fish" for now
    // Filter products to only include "Fresh Fish" and "Dry Fish" from the API
    let filteredAndMappedProducts = result.items.filter(product => product.category === "Fresh Fish" || product.category === "Dry Fish");

    // Map API response fields to match the Product type and ensure category consistency
    cachedProducts = filteredAndMappedProducts.map((product: any) => {
      // Random rating between 4.1 and 4.8 if missing/zero
      const randomRating = Math.round(((4.1 + Math.random() * (4.8 - 4.1)) + Number.EPSILON) * 10) / 10;
      const rating = product.rating && product.rating > 0 ? product.rating : randomRating;

      return {
        id: product.id,
        name: product.name,
        name_ta: product.name_ta,
        category: product.category === "Fresh Fish" ? "fresh cut" : (product.category === "Dry Fish" ? "dry fish" : product.category),
        image: product.image_url || "/placeholder.svg", // Map image_url to image, provide fallback
        price: product.price,
        sale_price: product.sale_price ?? null,
        description: product.description,
        rating,
        reviews: product.reviews,
        isFeatured: !!product.is_on_sale,
        is_on_sale: !!product.is_on_sale,
        inventory: typeof product.inventory === 'number' ? product.inventory : undefined,
      } as Product;
    });
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
