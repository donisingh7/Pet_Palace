// server/scripts/seed-data.js

require('dotenv').config();             // loads server/.env
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Product = require('../models/Product');
const Doctor  = require('../models/Doctor');
const User    = require('../models/User');

async function seed() {
  await connectDB();

  // 1) Clear existing collections
  await Product.deleteMany({});
  await Doctor.deleteMany({});
  await User.deleteMany({});

  // 2) Flatten aur define your products
  const products = [
    // Foods
    { name: "Chicken & Rice Adult Dog Food", imageUrl:"/products/chicken-rice.gif", price:1299, description:"High-protein formula for adult dogs", stockQty:100 },
    { name: "Salmon & Sweet Potato Cat Food", imageUrl:"/products/salmon-sweet.png", price:1399, description:"Grain-free recipe for sensitive stomachs", stockQty:100 },
    { name: "Tuna & Whitefish Cat Food", imageUrl:"/products/tuna-whitefish.png", price:1199, description:"Ocean fish blend rich in Omega-3s", stockQty:100 },
    { name: "Kitten Growth Formula", imageUrl:"/products/kitten-growth.png", price:1099, description:"Complete nutrition for growing kittens", stockQty:100 },
    // Toys
    { name: "Squeaky Plush Dog Bone Toy", imageUrl:"/products/squeaky-bone.png", price:499, description:"Soft, durable, and squeaks on bite", stockQty:50 },
    { name: "Interactive Laser Cat Toy", imageUrl:"/products/laser-toy.png", price:799, description:"Automatic laser moves to chase", stockQty:50 },
    { name: "Rope Tug-of-War Dog Toy", imageUrl:"/products/rope-tug.png", price:599, description:"Heavy-duty cotton rope for play", stockQty:50 },
    { name: "Feather Wand Cat Teaser", imageUrl:"/products/feather-wand.png", price:399, description:"Flexible wand with natural feathers", stockQty:50 },
    // Grooming
    { name: "Tearless Puppy & Kitten Shampoo", imageUrl:"/products/shampoo.png", price:699, description:"Gentle, hypoallergenic formula", stockQty:75 },
    { name: "De-Shedding Slicker Brush", imageUrl:"/products/slicker-brush.png", price:899, description:"Reduces loose hair up to 90%", stockQty:75 },
    { name: "Nail Clippers with Safety Guard", imageUrl:"/products/nail-clippers.png", price:499, description:"Stainless steel blades, no pinch", stockQty:75 },
    { name: "Multi-Purpose Grooming Glove", imageUrl:"/products/groom-glove.png", price:799, description:"Massages and removes loose fur", stockQty:75 },
    // Dog Clothes
    { name: "Waterproof Reflective Raincoat", imageUrl:"/products/raincoat.png", price:1499, description:"Keeps your dog dry in style", stockQty:40 },
    { name: "Knitted Winter Sweater", imageUrl:"/products/winter-sweater.png", price:1299, description:"Soft, warm knit for cold days", stockQty:40 },
    { name: "Fleece-Lined Hoodie", imageUrl:"/products/fleece-hoodie.png", price:1399, description:"Hoodie with leash-hole back", stockQty:40 },
    { name: "Bandana & Bow Tie Set", imageUrl:"/products/bandana-bow.png", price:599, description:"Two-piece fashion accessory", stockQty:40 },
    // Cat Clothes
    { name: "Cozy Fleece Cat Sweater", imageUrl:"/products/cat-sweater.png", price:1099, description:"Soft fleece for snug comfort", stockQty:40 },
    { name: "Soft Cotton Cat Shirt", imageUrl:"/products/cat-shirt.png", price:999, description:"Lightweight, easy to wear", stockQty:40 },
    { name: "Designer Bow Tie Collar", imageUrl:"/products/cat-bowtie.png", price:499, description:"Removable bow tie on collar", stockQty:40 },
    { name: "Holiday Costume", imageUrl:"/products/cat-costume.png", price:1299, description:"Festive outfits (Pumpkin/Santa)", stockQty:40 },
    // Pharma
    { name: "Flea & Tick Prevention Collar", imageUrl:"/products/flea-collar.png", price:899, description:"Up to 8 months protection", stockQty:60 },
    { name: "Glucosamine Joint Supplement", imageUrl:"/products/glucosamine.png", price:799, description:"Supports healthy joints", stockQty:60 },
    { name: "Omega-3 Fish Oil Capsules", imageUrl:"/products/omega3.png", price:699, description:"Heart & coat health", stockQty:60 },
    { name: "Probiotic Digestive Paste", imageUrl:"/products/probiotic.png", price:799, description:"Promotes healthy digestion", stockQty:60 },
  ];

  // 3) Doctors
  const doctors = [
    { name: "Ms Shivani Desai", referralCode: "shivani", walletCoins: 0 },
    { name: "Ms Isha Singh",    referralCode: "isha",    walletCoins: 0 },
  ];

  // 4) Initial User
  const users = [
    { referredBy: null, walletCoins: 0, isGuest: false, cart: [] }, 
    {
      name: "Doni Singh Agrawal",
      phone: "8769388932",
      password: "doni123",  // prototype ke liye, hash karna optional
      isGuest: false,
      walletCoins: 0,
      referredBy: null,
      cart: [],
      photourl:'../../client/public.doni.jpeg'
    },{ name:'Alice', referralCode:'ALICE123', phone: "8769388932",
      password: "doni123",  // prototype ke liye, hash karna optional
      isGuest: false,
      walletCoins: 0,
      referredBy: null,
      cart: [],
      photourl:'../../client/public.doni.jpeg'
    },
    { name:'Bob',   referralCode:'BOB456', phone: "8769388932",
      password: "doni123",  // prototype ke liye, hash karna optional
      isGuest: false,
      walletCoins: 0,
      referredBy: null,
      cart: [],
      photourl:'../../client/public.doni.jpeg'
    }  ];

  // 5) Insert into DB
  const p = await Product.insertMany(products);
  console.log(`✅ Seeded ${p.length} products`);

  const d = await Doctor.insertMany(doctors);
  console.log(`✅ Seeded ${d.length} doctors`);

  const u = await User.insertMany(users);
  console.log(`✅ Seeded ${u.length} users`);

  mongoose.connection.close();
  console.log("All done!");
}

seed().catch(err => {
  console.error("❌ Seed script error:", err);
  mongoose.connection.close();
  process.exit(1);
});
