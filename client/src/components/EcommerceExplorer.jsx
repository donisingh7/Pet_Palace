"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "./EcommerceExplorer.module.css";

const categories = [
  { key: "food",    label: "Dog & Cat Food", img: "/categories/food.png" },
  { key: "toys",    label: "Dog & Cat Toys", img: "/categories/toys.png" },
  { key: "groom",   label: "Grooming",        img: "/categories/groom.png" },
  { key: "dclothes",label: "Dog Clothes",     img: "/categories/dclothes.png" },
  { key: "cclothes",label: "Cat Clothes",     img: "/categories/cclothes.png" },
  { key: "pharma",  label: "Pharmacy",        img: "/categories/pharma.png" },
];

const productsByCat = {
  food: [
    {
      id: 1,
      name: "Chicken & Rice Adult Dog Food",
      img: "/products/chicken-rice.png",
      price: 1299,
      desc: "High-protein formula for adult dogs",
    },
    {
      id: 2,
      name: "Salmon & Sweet Potato Cat Food",
      img: "/products/salmon-sweet.png",
      price: 1399,
      desc: "Grain-free recipe for sensitive stomachs",
    },
    {
      id: 3,
      name: "Tuna & Whitefish Cat Food",
      img: "/products/tuna-whitefish.png",
      price: 1199,
      desc: "Ocean fish blend rich in Omega-3s",
    },
    {
      id: 4,
      name: "Kitten Growth Formula",
      img: "/products/kitten-growth.png",
      price: 1099,
      desc: "Complete nutrition for growing kittens",
    },
  ],
  toys: [
    {
      id: 5,
      name: "Squeaky Plush Dog Bone Toy",
      img: "/products/squeaky-bone.png",
      price: 499,
      desc: "Soft, durable, and squeaks on bite",
    },
    {
      id: 6,
      name: "Interactive Laser Cat Toy",
      img: "/products/laser-toy.png",
      price: 799,
      desc: "Automatic laser moves to chase",
    },
    {
      id: 7,
      name: "Rope Tug-of-War Dog Toy",
      img: "/products/rope-tug.png",
      price: 599,
      desc: "Heavy-duty cotton rope for play",
    },
    {
      id: 8,
      name: "Feather Wand Cat Teaser",
      img: "/products/feather-wand.png",
      price: 399,
      desc: "Flexible wand with natural feathers",
    },
  ],
  groom: [
    {
      id: 9,
      name: "Tearless Puppy & Kitten Shampoo",
      img: "/products/shampoo.png",
      price: 699,
      desc: "Gentle, hypoallergenic formula",
    },
    {
      id: 10,
      name: "De-Shedding Slicker Brush",
      img: "/products/slicker-brush.png",
      price: 899,
      desc: "Reduces loose hair up to 90%",
    },
    {
      id: 11,
      name: "Nail Clippers with Safety Guard",
      img: "/products/nail-clippers.png",
      price: 499,
      desc: "Stainless steel blades, no pinch",
    },
    {
      id: 12,
      name: "Multi-Purpose Grooming Glove",
      img: "/products/groom-glove.png",
      price: 799,
      desc: "Massages and removes loose fur",
    },
  ],
  dclothes: [
    {
      id: 13,
      name: "Waterproof Reflective Raincoat",
      img: "/products/raincoat.png",
      price: 1499,
      desc: "Keeps your dog dry in style",
    },
    {
      id: 14,
      name: "Knitted Winter Sweater",
      img: "/products/winter-sweater.png",
      price: 1299,
      desc: "Soft, warm knit for cold days",
    },
    {
      id: 15,
      name: "Fleece-Lined Hoodie",
      img: "/products/fleece-hoodie.png",
      price: 1399,
      desc: "Hoodie with leash-hole back",
    },
    {
      id: 16,
      name: "Bandana & Bow Tie Set",
      img: "/products/bandana-bow.png",
      price: 599,
      desc: "Two-piece fashion accessory",
    },
  ],
  cclothes: [
    {
      id: 17,
      name: "Cozy Fleece Cat Sweater",
      img: "/products/cat-sweater.png",
      price: 1099,
      desc: "Soft fleece for snug comfort",
    },
    {
      id: 18,
      name: "Soft Cotton Cat Shirt",
      img: "/products/cat-shirt.png",
      price: 999,
      desc: "Lightweight, easy to wear",
    },
    {
      id: 19,
      name: "Designer Bow Tie Collar",
      img: "/products/cat-bowtie.png",
      price: 499,
      desc: "Removable bow tie on collar",
    },
    {
      id: 20,
      name: "Holiday Costume",
      img: "/products/cat-costume.png",
      price: 1299,
      desc: "Festive outfits (Pumpkin/Santa)",
    },
  ],
  pharma: [
    {
      id: 21,
      name: "Flea & Tick Prevention Collar",
      img: "/products/flea-collar.png",
      price: 899,
      desc: "Up to 8 months protection",
    },
    {
      id: 22,
      name: "Glucosamine Joint Supplement",
      img: "/products/glucosamine.png",
      price: 799,
      desc: "Supports healthy joints",
    },
    {
      id: 23,
      name: "Omega-3 Fish Oil Capsules",
      img: "/products/omega3.png",
      price: 699,
      desc: "Heart & coat health",
    },
    {
      id: 24,
      name: "Probiotic Digestive Paste",
      img: "/products/probiotic.png",
      price: 799,
      desc: "Promotes healthy digestion",
    },
  ],
};

export default function EcommerceExplorer() {
  const [stage, setStage] = useState("launcher"); // "launcher"|"categories"|"products"
  const [chosenCat, setChosenCat] = useState(null);

  const handleLaunch = () => setStage("categories");
  const handleCatClick = (cat) => {
    setChosenCat(cat);
    setStage("products");
  };
  const handleBack = () => {
    if (stage === "products") setStage("categories");
    else setStage("launcher");
  };

  return (
    <div className={styles.wrapper}>
      {stage !== "launcher" && (
        <button className={styles.backBtn} onClick={handleBack}>
          ← Back
        </button>
      )}

      {stage === "launcher" && (
        <div className={styles.launcher} onClick={handleLaunch}>
          Products
        </div>
      )}

      {stage === "categories" && (
        <div className={styles.grid}>
          {categories.map((c) => (
            <div
              key={c.key}
              className={styles.card}
              onClick={() => handleCatClick(c.key)}
            >
             <div className={styles.catImgWrapper}>
            <Image
            src={c.img}
            alt={c.label}
            width={120}
            height={120}
            className={styles.catImg}
           />
      </div>
              <div className={styles.cardLabel}>{c.label}</div>
            </div>
          ))}
        </div>
      )}

      {stage === "products" && chosenCat && (
        <div className={styles.grid}>
          {productsByCat[chosenCat].map((p) => (
            <div key={p.id} className={styles.productCard}>
              <Image
                src={p.img}
                alt={p.name}
                width={200}
                height={200}
                className={styles.prodImg}
              />
              <h3 className={styles.prodName}>{p.name}</h3>
              <p className={styles.prodDesc}>{p.desc}</p>
              <div className={styles.prodPrice}>₹{p.price}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
