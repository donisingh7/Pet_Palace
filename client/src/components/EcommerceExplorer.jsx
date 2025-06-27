'use client';
import React, { useState } from 'react';
import Image from 'next/image';

const categories = [
  { key: 'food', label: 'Dog & Cat Food', img: '/categories/food.png' },
  { key: 'toys', label: 'Dog & Cat Toys', img: '/categories/toys.png' },
  { key: 'groom', label: 'Grooming', img: '/categories/grooming.gif' },
  { key: 'dclothes', label: 'Dog Clothes', img: '/categories/dclothes.gif' },
  { key: 'cclothes', label: 'Cat Clothes', img: '/categories/cclothes.gif' },
  { key: 'pharma', label: 'Pharmacy', img: '/categories/pharma.png' },
];

const productsByCat = {
  food: [
    { id: 1, name: 'Chicken & Rice Adult Dog Food', img: '/products/chicken-rice.gif', price: 1299, desc: 'High-protein formula for adult dogs' },
    { id: 2, name: 'Salmon & Sweet Potato Cat Food', img: '/products/salmon-sweet.png', price: 1399, desc: 'Grain-free recipe for sensitive stomachs' },
    { id: 3, name: 'Tuna & Whitefish Cat Food', img: '/products/tuna-whitefish.png', price: 1199, desc: 'Ocean fish blend rich in Omega-3s' },
    { id: 4, name: 'Kitten Growth Formula', img: '/products/kitten-growth.png', price: 1099, desc: 'Complete nutrition for growing kittens' },
  ],
  toys: [
    { id: 5, name: 'Squeaky Plush Dog Bone Toy', img: '/products/squeaky-bone.png', price: 499, desc: 'Soft, durable, and squeaks on bite' },
    { id: 6, name: 'Interactive Laser Cat Toy', img: '/products/laser-toy.png', price: 799, desc: 'Automatic laser moves to chase' },
    { id: 7, name: 'Rope Tug-of-War Dog Toy', img: '/products/rope-tug.png', price: 599, desc: 'Heavy-duty cotton rope for play' },
    { id: 8, name: 'Feather Wand Cat Teaser', img: '/products/feather-wand.png', price: 399, desc: 'Flexible wand with natural feathers' },
  ],
  groom: [
    { id: 9, name: 'Tearless Puppy & Kitten Shampoo', img: '/products/shampoo.png', price: 699, desc: 'Gentle, hypoallergenic formula' },
    { id: 10, name: 'De-Shedding Slicker Brush', img: '/products/slicker-brush.png', price: 899, desc: 'Reduces loose hair up to 90%' },
    { id: 11, name: 'Nail Clippers with Safety Guard', img: '/products/nail-clippers.png', price: 499, desc: 'Stainless steel blades, no pinch' },
    { id: 12, name: 'Multi-Purpose Grooming Glove', img: '/products/groom-glove.png', price: 799, desc: 'Massages and removes loose fur' },
  ],
  dclothes: [
    { id: 13, name: 'Waterproof Reflective Raincoat', img: '/products/raincoat.png', price: 1499, desc: 'Keeps your dog dry in style' },
    { id: 14, name: 'Knitted Winter Sweater', img: '/products/winter-sweater.png', price: 1299, desc: 'Soft, warm knit for cold days' },
    { id: 15, name: 'Fleece-Lined Hoodie', img: '/products/fleece-hoodie.png', price: 1399, desc: 'Hoodie with leash-hole back' },
    { id: 16, name: 'Bandana & Bow Tie Set', img: '/products/bandana-bow.png', price: 599, desc: 'Two-piece fashion accessory' },
  ],
  cclothes: [
    { id: 17, name: 'Cozy Fleece Cat Sweater', img: '/products/cat-sweater.png', price: 1099, desc: 'Soft fleece for snug comfort' },
    { id: 18, name: 'Soft Cotton Cat Shirt', img: '/products/cat-shirt.png', price: 999, desc: 'Lightweight, easy to wear' },
    { id: 19, name: 'Designer Bow Tie Collar', img: '/products/cat-bowtie.png', price: 499, desc: 'Removable bow tie on collar' },
    { id: 20, name: 'Holiday Costume', img: '/products/cat-costume.png', price: 1299, desc: 'Festive outfits (Pumpkin/Santa)' },
  ],
  pharma: [
    { id: 21, name: 'Flea & Tick Prevention Collar', img: '/products/flea-collar.png', price: 899, desc: 'Up to 8 months protection' },
    { id: 22, name: 'Glucosamine Joint Supplement', img: '/products/glucosamine.png', price: 799, desc: 'Supports healthy joints' },
    { id: 23, name: 'Omega-3 Fish Oil Capsules', img: '/products/omega3.png', price: 699, desc: 'Heart & coat health' },
    { id: 24, name: 'Probiotic Digestive Paste', img: '/products/probiotic.png', price: 799, desc: 'Promotes healthy digestion' },
  ],
};

export default function EcommerceExplorer() {
  const [stage, setStage] = useState('launcher');
  const [chosenCat, setChosenCat] = useState(null);

  const handleLaunch = () => setStage('categories');
  const handleCatClick = (cat) => {
    setChosenCat(cat);
    setStage('products');
  };
  const handleBack = () => {
    if (stage === 'products') setStage('categories');
    else setStage('launcher');
  };

  
 
  return (
    <div className="p-4">
      {/* Back button always visible in this component */}
      <button
        onClick={() => setChosenCat(null)}
        className="mb-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
      >
        ← Back
      </button>

      {/* Categories grid: show when no category selected */}
      {!chosenCat && (
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
          {categories.map(c => (
            <button
              key={c.key}
              onClick={() => setChosenCat(c.key)}
              className="bg-white border rounded p-4 flex flex-col items-center hover:shadow"
            >
              <Image src={c.img} alt={c.label} width={80} height={80} />
              <span className="mt-2">{c.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Products grid: when category is selected */}
      {chosenCat && (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {productsByCat[chosenCat].map(p => (
            <div key={p.id} className="border rounded p-4 flex flex-col items-center">
              <Image src={p.img} alt={p.name} width={120} height={120} />
              <h3 className="font-medium mt-2 text-center">{p.name}</h3>
              <p className="text-sm text-gray-600">{p.desc}</p>
              <div className="font-bold mt-2">₹{p.price}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}