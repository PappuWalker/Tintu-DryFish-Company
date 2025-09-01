export type Product = {
  id: string;
  name: string;
  category: string;
  image: string;
  price: number;
  description?: string;
  rating?: number;
  reviews?: number;
  isFeatured?: boolean;
};

const generateRandomPrice = () => {
  return Math.floor(Math.random() * (1500 - 200 + 1)) + 200; // Prices between 200 and 1500 INR
};

export function getRandomProducts(count: number): Product[] {
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export const products: Product[] = [
  {
    "id": "ailai-dry-fish",
    "name": "Ailai Dry fish",
    "category": "dry fish",
    "image": "/jala-Fish-3.webp",
    "price": generateRandomPrice(),
    "description": "Delicious Ailai dry fish, perfect for a traditional meal."
  },
  {
    "id": "chenna-kuni-iral",
    "name": "Chenna Kuni Iral (சென்னா கூனி இறால்)",
    "category": "dry fish",
    "image": "/சென்னா-குளி-இரல்-மீன்-2.webp",
    "price": generateRandomPrice(),
    "description": "Fresh and flavorful Chenna Kuni Iral, a local favorite."
  },
  {
    "id": "cod-fish",
    "name": "Cod fish (பண்ணா கருவாடு)",
    "category": "dry fish",
    "image": "/Cod-fish-பண்ணா-கருவாடு2.webp",
    "price": generateRandomPrice(),
    "description": "High-quality Cod fish, great for various recipes."
  },
  {
    "id": "eel-dry-fish",
    "name": "Eel Dry fish (விலாங்கு)",
    "category": "dry fish",
    "image": "/veral-meen-1.webp",
    "price": generateRandomPrice(),
    "description": "Exotic Eel dry fish, a unique taste experience."
  },
  {
    "id": "kadamma-karuvadu",
    "name": "Kadamma Karuvadu",
    "category": "dry fish",
    "image": "/pexels-photo-3643094-3643094-scaled.webp",
    "price": generateRandomPrice(),
    "description": "Authentic Kadamma Karuvadu, sun-dried to perfection."
  },
  {
    "id": "kanakathai-karuvadu",
    "name": "Kanakathai Karuvadu",
    "category": "dry fish",
    "image": "/pexels-photo-13757244-13757244-scaled.webp",
    "price": generateRandomPrice(),
    "description": "Premium Kanakathai Karuvadu, rich in flavor."
  },
  {
    "id": "koola-meen-karuvadu",
    "name": "Koola Meen Karuvadu",
    "category": "dry fish",
    "image": "/fresh-sardines-rustic-wooden-background-1-edited-scaled.webp",
    "price": generateRandomPrice(),
    "description": "Delicious Koola Meen Karuvadu, a traditional delicacy."
  },
  {
    "id": "maathi-karuvadu",
    "name": "Maathi Karuvadu",
    "category": "dry fish",
    "image": "/sardine.webp",
    "price": generateRandomPrice(),
    "description": "Finest Maathi Karuvadu, perfect for a savory dish."
  },
  {
    "id": "massi-karuvadu",
    "name": "Massi Karuvadu (மாசி கருவாடு)",
    "category": "dry fish",
    "image": "/Massi-karuvadu.webp",
    "price": generateRandomPrice(),
    "description": "Traditional Massi Karuvadu, a staple in local cuisine."
  },
  {
    "id": "navarai-dry-fish",
    "name": "Navarai Dry Fish (நவரை)",
    "category": "dry fish",
    "image": "/Navarai-Dry-Fish-நவரை.webp",
    "price": generateRandomPrice(),
    "description": "Exquisite Navarai Dry Fish, known for its unique taste."
  },
  {
    "id": "nethili-karuvadu",
    "name": "Nethili Karuvadu (நெத்திலி கருவாடு)",
    "category": "dry fish",
    "image": "/Dried-Kingfish1.webp",
    "price": generateRandomPrice(),
    "description": "Crispy Nethili Karuvadu, a popular snack and side dish."
  },
  {
    "id": "paal-sura-karuvadu",
    "name": "Paal Sura Karuvadu",
    "category": "dry fish",
    "image": "/pexels-photo-16571596-16571596-scaled.webp",
    "price": generateRandomPrice(),
    "description": "Delicious Paal Sura Karuvadu, a flavorful dry fish."
  },
  {
    "id": "paarai-karuvadu",
    "name": "Paarai Karuvadu",
    "category": "dry fish",
    "image": "/delicious-dried-salted-anchovies-white-background-scaled.webp",
    "price": generateRandomPrice(),
    "description": "Savory Paarai Karuvadu, sun-dried for rich taste."
  },
  {
    "id": "parlaa-karuvadu",
    "name": "Parlaa karuvadu(பர்லா கருவாடு)",
    "category": "dry fish",
    "image": "/பர்லா-கருவாடு.webp",
    "price": generateRandomPrice(),
    "description": "Authentic Parlaa Karuvadu, a traditional dry fish."
  },
  {
    "id": "pattarai-karuvadu",
    "name": "Pattarai Karuvadu (பட்டறை கருவாடு)",
    "category": "dry fish",
    "image": "/Pattarai-Karuvadu-பட்டறை-கருவாடு.webp",
    "price": generateRandomPrice(),
    "description": "Premium Pattarai Karuvadu, known for its distinct flavor."
  },
  {
    "id": "pony-dry-fish",
    "name": "Pony Dry fish (காரல் )",
    "category": "dry fish",
    "image": "/Pony-Dry-fish-காரல்-1.webp",
    "price": generateRandomPrice(),
    "description": "Delicious Pony Dry fish, a popular choice for dry fish lovers."
  },
  {
    "id": "prawn-eral-karuvadu",
    "name": "Prawn Eral Karuvadu (இறால்)",
    "category": "dry fish",
    "image": "/சென்னா-குளி-இரல்-மீன்.webp",
    "price": generateRandomPrice(),
    "description": "Flavorful Prawn Eral Karuvadu, a seafood delight."
  },
  {
    "id": "red-snapper-dry-fish",
    "name": "Red snapper (சங்கரா மீன்)",
    "category": "dry fish",
    "image": "/Red-snapper-சங்கரா-மீன்.webp",
    "price": generateRandomPrice(),
    "description": "Premium Red Snapper dry fish, rich in taste."
  },
  {
    "id": "sheela-dry-fish",
    "name": "Sheela Dry Fish (ஷீலா)",
    "category": "dry fish",
    "image": "/Barracuda-dry-fish-2.webp",
    "price": generateRandomPrice(),
    "description": "Exquisite Sheela Dry Fish, a unique and savory option."
  },
  {
    "id": "thirukkai-fish",
    "name": "Thirukkai Fish (திருக்கை மீன்)",
    "category": "dry fish",
    "image": "/திருக்கை1.webp",
    "price": generateRandomPrice(),
    "description": "Traditional Thirukkai Fish, known for its firm texture."
  },
  {
    "id": "vanchiram-karuvadu",
    "name": "Vanchiram Karuvadu",
    "category": "dry fish",
    "image": "/gf61b36b2112f1f30bc5d4c066888fe3531bc6cda98b518f6e22acb222a72cf76a17ca442ff6bbd2f8eb617e0556266ac0d6bbd9c54b1ab7cafbc765a5d920466_1280-8210152.webp",
    "price": generateRandomPrice(),
    "description": "Delicious Vanchiram Karuvadu, a popular dry fish variety."
  },
  {
    "id": "vazhai-meen-karuvadu",
    "name": "Vazhai Meen Karuvadu",
    "category": "dry fish",
    "image": "/pexels-photo-16113025-16113025-scaled.webp",
    "price": generateRandomPrice(),
    "description": "Flavorful Vazhai Meen Karuvadu, sun-dried for enhanced taste."
  },
  {
    "id": "vellai-kilanga-karuvadu",
    "name": "Vellai kilanga(வெள்ளைக்கிழங்கான் மீன்)",
    "category": "dry fish",
    "image": "/Vellai-kilanga-Karuvadu.webp",
    "price": generateRandomPrice(),
    "description": "Traditional Vellai Kilanga Karuvadu, a local delicacy."
  },
  {
    "id": "dried-mutton-pieces",
    "name": "Dried Mutton – Mutton Pieces",
    "category": "frozen",
    "image": "/pexels-photo-28674566-28674566-scaled.webp",
    "price": generateRandomPrice(),
    "description": "High-quality dried mutton pieces, perfect for a hearty meal."
  },
  {
    "id": "dried-mutton-biltong",
    "name": "Dried Mutton Biltong",
    "category": "frozen",
    "image": "/Jamaican-curry-rubbed-lamb-chops-6.webp",
    "price": generateRandomPrice(),
    "description": "Savory dried mutton biltong, a delicious snack."
  },
  {
    "id": "dried-mutton-sausages",
    "name": "Dried Mutton Sausages",
    "category": "frozen",
    "image": "/pexels-photo-8250377-8250377-scaled.webp",
    "price": generateRandomPrice(),
    "description": "Flavorful dried mutton sausages, great for grilling."
  },
  {
    "id": "mutton-bhuna",
    "name": "Mutton Bhuna (Dry Spicy Mutton)",
    "category": "frozen",
    "image": "/mutton.webp",
    "price": generateRandomPrice(),
    "description": "Spicy dry mutton bhuna, a rich and aromatic dish."
  },
  {
    "id": "mutton-rogan-josh",
    "name": "Mutton Rogan Josh (Dry Version)",
    "category": "frozen",
    "image": "/Mutton-Rogan-Josh-2-3.webp",
    "price": generateRandomPrice(),
    "description": "Dry version of Mutton Rogan Josh, packed with flavor."
  },
  {
    "id": "anchovy-fish",
    "name": "Anchovy fish(நெத்திலி மீன்)",
    "category": "fresh cut",
    "image": "/nethili-fish.webp",
    "price": generateRandomPrice(),
    "description": "Freshly cut anchovy fish, perfect for frying."
  },
  {
    "id": "black-pomfret",
    "name": "Black Pomfret (கருப்பு வவ்வால்)",
    "category": "fresh cut",
    "image": "/Black-Pomfret-கருப்பு-வவ்வால்1.webp",
    "price": generateRandomPrice(),
    "description": "Premium Black Pomfret, known for its delicate taste."
  },
  {
    "id": "chinese-pomfret",
    "name": "Chinese pomfret (சைனீஸ் வவ்வால்)",
    "category": "fresh cut",
    "image": "/Chinese-pomfret-1.webp",
    "price": generateRandomPrice(),
    "description": "Exquisite Chinese Pomfret, a gourmet choice."
  },
  {
    "id": "indian-basa-fish",
    "name": "Indian basa fish (பாஸா மீன்)",
    "category": "fresh cut",
    "image": "/indian-basa-fish-பாஸா-மீன்.webp",
    "price": generateRandomPrice(),
    "description": "Fresh Indian Basa fish, versatile for many dishes."
  },
  {
    "id": "kadamba-fish",
    "name": "Kadamba(கடம்பா மீன் )",
    "category": "fresh cut",
    "image": "/Kadamba-Meen-கடம்பா-மீன்-.webp",
    "price": generateRandomPrice(),
    "description": "Fresh Kadamba fish, a local favorite."
  },
  {
    "id": "murrel-fish",
    "name": "Murrel Fish (விரால் மீன்)",
    "category": "fresh cut",
    "image": "/veral-meen.webp",
    "price": generateRandomPrice(),
    "description": "Delicious Murrel Fish, known for its rich flavor."
  },
  {
    "id": "nantu-crab",
    "name": "Nantu (நண்டு)",
    "category": "fresh cut",
    "image": "/Nantu-நண்டு1.webp",
    "price": generateRandomPrice(),
    "description": "Fresh Nantu crab, perfect for a seafood feast."
  },
  {
    "id": "needlefish",
    "name": "Needlefish (முரல் மீன்)",
    "category": "fresh cut",
    "image": "/Needlefish-முரல்-மீன்.webp",
    "price": generateRandomPrice(),
    "description": "Unique Needlefish, great for grilling or frying."
  },
  {
    "id": "paarai-fish",
    "name": "Paarai(பாறை மீன்)",
    "category": "fresh cut",
    "image": "/Paarai-Meen-பாறை-மீன்1.webp",
    "price": generateRandomPrice(),
    "description": "Fresh Paarai fish, a popular choice for curries."
  },
  {
    "id": "parrot-fish",
    "name": "Parrot Fish (கிளி மீன்)",
    "category": "fresh cut",
    "image": "/கிளி-மீன்1.webp",
    "price": generateRandomPrice(),
    "description": "Colorful Parrot Fish, known for its tender meat."
  },
  {
    "id": "rawas-fish",
    "name": "Rawas (ஜலா மீன்)",
    "category": "fresh cut",
    "image": "/Rawas-1.webp",
    "price": generateRandomPrice(),
    "description": "Premium Rawas fish, a delicacy for seafood lovers."
  },
  {
    "id": "red-snapper-fresh",
    "name": "Red Snapper(சங்கரா)",
    "category": "fresh cut",
    "image": "/Red-Snapperசங்கரா-மீன்1.webp",
    "price": generateRandomPrice(),
    "description": "Fresh Red Snapper, perfect for baking or grilling."
  },
  {
    "id": "silver-pomfret",
    "name": "Silver pomfret",
    "category": "fresh cut",
    "image": "/indian-basa-fish-பாஸா-மீன்.webp",
    "price": generateRandomPrice(),
    "description": "Delicious Silver Pomfret, a versatile fish for any meal."
  },
  {
    "id": "spiny-lobster",
    "name": "Spiny lobster (சிங்கி இறால்)",
    "category": "fresh cut",
    "image": "/Spiny-lobster-சிங்கி-இறால்1.webp",
    "price": generateRandomPrice(),
    "description": "Fresh Spiny Lobster, a luxurious seafood option."
  },
  {
    "id": "sura-fish",
    "name": "Sura Fish (சுறா மீன்)",
    "category": "fresh cut",
    "image": "/sura.webp",
    "price": generateRandomPrice(),
    "description": "Flavorful Sura Fish, great for traditional recipes."
  },
  {
    "id": "tuna-fish",
    "name": "Tuna fish (சூரை மீன்)",
    "category": "fresh cut",
    "image": "/vanjaram.webp",
    "price": generateRandomPrice(),
    "description": "Fresh Tuna fish, excellent for steaks or curries."
  },
  {
    "id": "vanjiram-100g",
    "name": "Vanjiram 100g (10) pcs(வஞ்சிரம் மீன்)",
    "category": "fresh cut",
    "image": "/vanjaram.webp",
    "price": generateRandomPrice(),
    "description": "Vanjiram fish in 100g packs, convenient for small meals."
  },
  {
    "id": "vanjiram-fish",
    "name": "Vanjiram Fish (வஞ்சிரம் மீன்)",
    "category": "fresh cut",
    "image": "/vanjaram-meen-2.webp",
    "price": generateRandomPrice(),
    "description": "Premium Vanjiram fish, known for its rich taste and texture."
  },
  {
    "id": "chicken-pickle",
    "name": "Chicken Pickle",
    "category": "non frozen",
    "image": "/product-500x500-1.webp",
    "price": generateRandomPrice(),
    "description": "Spicy and tangy chicken pickle, a perfect accompaniment."
  },
  {
    "id": "fish-and-mango-pickle",
    "name": "Fish and Mango Pickle",
    "category": "non frozen",
    "image": "/Fish-and-Mango-Pickle.webp",
    "price": generateRandomPrice(),
    "description": "Unique blend of fish and mango in a delicious pickle."
  },
  {
    "id": "fish-pickle",
    "name": "Fish Pickle",
    "category": "non frozen",
    "image": "/fish-pickles.webp",
    "price": generateRandomPrice(),
    "description": "Traditional fish pickle, bursting with authentic flavors."
  },
  {
    "id": "mutton-pickle",
    "name": "Mutton Pickle",
    "category": "non frozen",
    "image": "/mutton-pickles.webp",
    "price": generateRandomPrice(),
    "description": "Rich and spicy mutton pickle, a true culinary delight."
  },
  {
    "id": "prawn-pickle",
    "name": "Prawn Pickle",
    "category": "non frozen",
    "image": "/ge81616f604fd649fd317576e096fec2815bdee666c32a51601eddc0d68567ffc9574ef06a7b0060551180eb97f5921c3483e6de0b01c76b8c2cba1f56267da50_1280-1737593.webp",
    "price": generateRandomPrice(),
    "description": "Tangy and flavorful prawn pickle, a seafood lover's dream."
  },
  {
    "id": "squid-pickle",
    "name": "Squid Pickle (Calamari Achaar)",
    "category": "non frozen",
    "image": "/pexels-photo-1618913-1618913-scaled.webp",
    "price": generateRandomPrice(),
    "description": "Exotic squid pickle, a unique and spicy condiment."
  },
  {
    "id": "tuna-fish-pickle",
    "name": "Tuna Fish Pickle",
    "category": "non frozen",
    "image": "/spicy-tangy-pickle-jar-filled-with-traditional-flavors-3-scaled.webp",
    "price": generateRandomPrice(),
    "description": "Delicious Tuna Fish Pickle, a savory and spicy treat."
  }
];
