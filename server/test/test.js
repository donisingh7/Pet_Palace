// seed-data.js के टॉप पर
require('dotenv').config(); 
const mongoose = require('mongoose');
const User = require('../models/User');
const connectDB = require('../config/db');  // वो फ़ंक्शन जो MongoDB से कनेक्ट करता है

async function seed() {
    await connectDB();  
    console.log('🗑️ Clearing existing users...');
    await User.deleteMany({});

    const testUsers = [
        {
          name: 'Alice',
          phone: '1111111111',
          password: 'alice123',
          referralCode: 'alice123',
          referredBy: null,
          walletCoins: 0,
          isGuest: false,
          cart: [],
          photourl:'../../client/public/doni.jpeg'
        },
        {
          name: 'Bob',
          phone: '2222222222',
          password: 'bob123',
          referralCode: 'bob123',
          referredBy: null,
          walletCoins: 0,
          isGuest: false,
          cart: [],
          photourl:'../../client/public/doni.jpeg'
        },
        {
          name: 'Doni',
          phone: '8769388932',
          password: '8769',
          referralCode: 'doni123',
          referredBy: null,
          walletCoins: 0,
          isGuest: false,
          cart: [],
          photourl:"../../client/public/doni.jpeg"
        },
        {
          name: 'Shivani',
          phone: '3333333333',
          password: 'shivani123',
          referralCode: 'shivani123',
          referredBy: null,
          walletCoins: 0,
          isGuest: false,
          cart: [],
          photourl:"../../client/public/doni.jpeg"
        }
      ];
      console.log('🛠️ Inserting test users...');
      const created = await User.insertMany(testUsers);
      console.log(`✅ Created ${created.length} users:`);
      created.forEach(u => console.log(`   - ${u.name}: ${u._id}`));
    
      process.exit(0);
    }
    
    seed().catch(err => {
      console.error(err);
      process.exit(1);
    });
        