import { Product } from "./products"; // Assuming Product interface is defined in products.ts

export const highlyRecommendedProducts: Product[] = [
  {
    "id": "vanchiram-karuvadu",
    "name": "Vanchiram Karuvadu",
    "category": "dry fish",
    "image": "/gf61b36b2112f1f30bc5d4c066888fe3531bc6cda98b518f6e22acb222a72cf76a17ca442ff6bbd2f8eb617e0556266ac0d6bbd9c54b1ab7cafbc765a5d920466_1280-8210152.webp",
    "price": 850,
    "description": "Delicious Vanchiram Karuvadu, a popular dry fish variety.",
    "rating": 4.7,
    "reviews": 110,
    "isFeatured": true,
  },
  {
    "id": "dried-mutton-sausages",
    "name": "Dried Mutton Sausages",
    "category": "frozen",
    "image": "/pexels-photo-8250377-8250377-scaled.webp",
    "price": 1100,
    "description": "Flavorful dried mutton sausages, great for grilling.",
    "rating": 4.6,
    "reviews": 95,
    "isFeatured": true,
  },
  {
    "id": "dried-mutton-biltong",
    "name": "Dried Mutton Biltong",
    "category": "frozen",
    "image": "/Jamaican-curry-rubbed-lamb-chops-6.webp",
    "price": 1300,
    "description": "Savory dried mutton biltong, a delicious snack.",
    "rating": 4.8,
    "reviews": 130,
    "isFeatured": true,
  },
  {
    "id": "vazhai-meen-karuvadu",
    "name": "Vazhai Meen Karuvadu",
    "category": "dry fish",
    "image": "/vanjaram.webp",
    "price": 700,
    "description": "Delicious Vazhai Meen Karuvadu, a popular dry fish variety.",
    "rating": 4.7,
    "reviews": 120,
    "isFeatured": true,
  },
];

export function getHighlyRecommendedProducts(count: number): Product[] {
  const shuffled = [...highlyRecommendedProducts].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
