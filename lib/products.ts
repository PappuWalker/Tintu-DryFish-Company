export type Product = {
  name: string;
  category: string;
  image: string;
  price: number;
};

const generateRandomPrice = () => {
  return Math.floor(Math.random() * (1500 - 200 + 1)) + 200; // Prices between 200 and 1500 INR
};

export const products: Product[] = [
  {
    "name": "Ailai Dry fish",
    "category": "dry fish",
    "image": "/jala-Fish-3.webp",
    "price": generateRandomPrice()
  },
  {
    "name": "Chenna Kuni Iral (சென்னா கூனி இறால்)",
    "category": "dry fish",
    "image": "/சென்னா-குளி-இரல்-மீன்-2.webp",
    "price": generateRandomPrice()
  },
  {
    "name": "Cod fish (பண்ணா கருவாடு)",
    "category": "dry fish",
    "image": "/Cod-fish-பண்ணா-கருவாடு2.webp",
    "price": generateRandomPrice()
  },
  {
    "name": "Eel Dry fish (விலாங்கு)",
    "category": "dry fish",
    "image": "/veral-meen-1.webp",
    "price": generateRandomPrice()
  },
  {
    "name": "Kadamma Karuvadu",
    "category": "dry fish",
    "image": "/pexels-photo-3643094-3643094-scaled.webp",
    "price": generateRandomPrice()
  },
  {
    "name": "Kanakathai Karuvadu",
    "category": "dry fish",
    "image": "/pexels-photo-13757244-13757244-scaled.webp",
    "price": generateRandomPrice()
  },
  {
    "name": "Koola Meen Karuvadu",
    "category": "dry fish",
    "image": "/fresh-sardines-rustic-wooden-background-1-edited-scaled.webp",
    "price": generateRandomPrice()
  },
  {
    "name": "Maathi Karuvadu",
    "category": "dry fish",
    "image": "/sardine.webp",
    "price": generateRandomPrice()
  },
  {
    "name": "Massi Karuvadu (மாசி கருவாடு)",
    "category": "dry fish",
    "image": "/Massi-karuvadu.webp",
    "price": generateRandomPrice()
  },
  {
    "name": "Navarai Dry Fish (நவரை)",
    "category": "dry fish",
    "image": "/Navarai-Dry-Fish-நவரை.webp",
    "price": generateRandomPrice()
  },
  {
    "name": "Nethili Karuvadu (நெத்திலி கருவாடு)",
    "category": "dry fish",
    "image": "/Dried-Kingfish1.webp",
    "price": generateRandomPrice()
  },
  {
    "name": "Paal Sura Karuvadu",
    "category": "dry fish",
    "image": "/pexels-photo-16571596-16571596-scaled.webp",
    "price": generateRandomPrice()
  },
  {
    "name": "Paarai Karuvadu",
    "category": "dry fish",
    "image": "/delicious-dried-salted-anchovies-white-background-scaled.webp",
    "price": generateRandomPrice()
  },
  {
    "name": "Parlaa karuvadu(பர்லா கருவாடு)",
    "category": "dry fish",
    "image": "/பர்லா-கருவாடு.webp",
    "price": generateRandomPrice()
  },
  {
    "name": "Pattarai Karuvadu (பட்டறை கருவாடு)",
    "category": "dry fish",
    "image": "/Pattarai-Karuvadu-பட்டறை-கருவாடு.webp",
    "price": generateRandomPrice()
  },
  {
    "name": "Pony Dry fish (காரல் )",
    "category": "dry fish",
    "image": "/Pony-Dry-fish-காரல்-1.webp",
    "price": generateRandomPrice()
  },
  {
    "name": "Prawn Eral Karuvadu (இறால்)",
    "category": "dry fish",
    "image": "/சென்னா-குளி-இரல்-மீன்.webp",
    "price": generateRandomPrice()
  },
  {
    "name": "Red snapper (சங்கரா மீன்)",
    "category": "dry fish",
    "image": "/Red-snapper-சங்கரா-மீன்.webp",
    "price": generateRandomPrice()
  },
  {
    "name": "Sheela Dry Fish (ஷீலா)",
    "category": "dry fish",
    "image": "/Barracuda-dry-fish-2.webp",
    "price": generateRandomPrice()
  },
  {
    "name": "Thirukkai Fish (திருக்கை மீன்)",
    "category": "dry fish",
    "image": "/திருக்கை1.webp",
    "price": generateRandomPrice()
  },
  {
    "name": "Vanchiram Karuvadu",
    "category": "dry fish",
    "image": "/gf61b36b2112f1f30bc5d4c066888fe3531bc6cda98b518f6e22acb222a72cf76a17ca442ff6bbd2f8eb617e0556266ac0d6bbd9c54b1ab7cafbc765a5d920466_1280-8210152.webp",
    "price": generateRandomPrice()
  },
  {
    "name": "Vazhai Meen Karuvadu",
    "category": "dry fish",
    "image": "/pexels-photo-16113025-16113025-scaled.webp",
    "price": generateRandomPrice()
  },
  {
    "name": "Vellai kilanga(வெள்ளைக்கிழங்கான் மீன்)",
    "category": "dry fish",
    "image": "/Vellai-kilanga-Karuvadu.webp",
    "price": generateRandomPrice()
  },
  {
    "name": "Dried Mutton – Mutton Pieces",
    "category": "frozen",
    "image": "/pexels-photo-28674566-28674566-scaled.webp",
    "price": generateRandomPrice()
  },
  {
    "name": "Dried Mutton Biltong",
    "category": "frozen",
    "image": "/Jamaican-curry-rubbed-lamb-chops-6.webp",
    "price": generateRandomPrice()
  },
  {
    "name": "Dried Mutton Sausages",
    "category": "frozen",
    "image": "/pexels-photo-8250377-8250377-scaled.webp",
    "price": generateRandomPrice()
  },
  {
    "name": "Mutton Bhuna (Dry Spicy Mutton)",
    "category": "frozen",
    "image": "/mutton.webp",
    "price": generateRandomPrice()
  },
  {
    "name": "Mutton Rogan Josh (Dry Version)",
    "category": "frozen",
    "image": "/Mutton-Rogan-Josh-2-3.webp",
    "price": generateRandomPrice()
  },
  {
    "name": "Anchovy fish(நெத்திலி மீன்)",
    "category": "fresh cut",
    "image": "/nethili-fish.webp",
    "price": generateRandomPrice()
  },
  {
    "name": "Black Pomfret (கருப்பு வவ்வால்)",
    "category": "fresh cut",
    "image": "/Black-Pomfret-கருப்பு-வவ்வால்1.webp",
    "price": generateRandomPrice()
  },
  {
    "name": "Chinese pomfret (சைனீஸ் வவ்வால்)",
    "category": "fresh cut",
    "image": "/Chinese-pomfret-1.webp",
    "price": generateRandomPrice()
  },
  {
    "name": "Indian basa fish (பாஸா மீன்)",
    "category": "fresh cut",
    "image": "/indian-basa-fish-பாஸா-மீன்.webp",
    "price": generateRandomPrice()
  },
  {
    "name": "Kadamba(கடம்பா மீன் )",
    "category": "fresh cut",
    "image": "/Kadamba-Meen-கடம்பா-மீன்-.webp",
    "price": generateRandomPrice()
  },
  {
    "name": "Murrel Fish (விரால் மீன்)",
    "category": "fresh cut",
    "image": "/veral-meen.webp",
    "price": generateRandomPrice()
  },
  {
    "name": "Nantu (நண்டு)",
    "category": "fresh cut",
    "image": "/Nantu-நண்டு1.webp",
    "price": generateRandomPrice()
  },
  {
    "name": "Needlefish (முரல் மீன்)",
    "category": "fresh cut",
    "image": "/Needlefish-முரல்-மீன்.webp",
    "price": generateRandomPrice()
  },
  {
    "name": "Paarai(பாறை மீன்)",
    "category": "fresh cut",
    "image": "/Paarai-Meen-பாறை-மீன்1.webp",
    "price": generateRandomPrice()
  },
  {
    "name": "Parrot Fish (கிளி மீன்)",
    "category": "fresh cut",
    "image": "/கிளி-மீன்1.webp",
    "price": generateRandomPrice()
  },
  {
    "name": "Rawas (ஜலா மீன்)",
    "category": "fresh cut",
    "image": "/Rawas-1.webp",
    "price": generateRandomPrice()
  },
  {
    "name": "Red Snapper(சங்கரா)",
    "category": "fresh cut",
    "image": "/Red-Snapperசங்கரா-மீன்1.webp",
    "price": generateRandomPrice()
  },
  {
    "name": "Silver pomfret",
    "category": "fresh cut",
    "image": "/indian-basa-fish-பாஸா-மீன்.webp",
    "price": generateRandomPrice()
  },
  {
    "name": "Spiny lobster (சிங்கி இறால்)",
    "category": "fresh cut",
    "image": "/Spiny-lobster-சிங்கி-இறால்1.webp",
    "price": generateRandomPrice()
  },
  {
    "name": "Sura Fish (சுறா மீன்)",
    "category": "fresh cut",
    "image": "/sura.webp",
    "price": generateRandomPrice()
  },
  {
    "name": "Tuna fish (சூரை மீன்)",
    "category": "fresh cut",
    "image": "/vanjaram.webp",
    "price": generateRandomPrice()
  },
  {
    "name": "Vanjiram 100g (10) pcs(வஞ்சிரம் மீன்)",
    "category": "fresh cut",
    "image": "/vanjaram.webp",
    "price": generateRandomPrice()
  },
  {
    "name": "Vanjiram Fish (வஞ்சிரம் மீன்)",
    "category": "fresh cut",
    "image": "/vanjaram-meen-2.webp",
    "price": generateRandomPrice()
  },
  {
    "name": "Chicken Pickle",
    "category": "non frozen",
    "image": "/product-500x500-1.webp",
    "price": generateRandomPrice()
  },
  {
    "name": "Fish and Mango Pickle",
    "category": "non frozen",
    "image": "/Fish-and-Mango-Pickle.webp",
    "price": generateRandomPrice()
  },
  {
    "name": "Fish Pickle",
    "category": "non frozen",
    "image": "/fish-pickles.webp",
    "price": generateRandomPrice()
  },
  {
    "name": "Mutton Pickle",
    "category": "non frozen",
    "image": "/mutton-pickles.webp",
    "price": generateRandomPrice()
  },
  {
    "name": "Prawn Pickle",
    "category": "non frozen",
    "image": "/ge81616f604fd649fd317576e096fec2815bdee666c32a51601eddc0d68567ffc9574ef06a7b0060551180eb97f5921c3483e6de0b01c76b8c2cba1f56267da50_1280-1737593.webp",
    "price": generateRandomPrice()
  },
  {
    "name": "Squid Pickle (Calamari Achaar)",
    "category": "non frozen",
    "image": "/pexels-photo-1618913-1618913-scaled.webp",
    "price": generateRandomPrice()
  },
  {
    "name": "Tuna Fish Pickle",
    "category": "non frozen",
    "image": "/spicy-tangy-pickle-jar-filled-with-traditional-flavors-3-scaled.webp",
    "price": generateRandomPrice()
  }
];
