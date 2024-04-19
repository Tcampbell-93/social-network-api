const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomThoughts, getRandomFriends } = require('./data');

// Connect to your MongoDB database
connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    // Delete the collections if they exist
    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
      await connection.dropCollection('thoughts');
    }
    
    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
      await connection.dropCollection('users');
    }
  
    const users = [];
  
    for (let i = 0; i < 5; i++) {
      users.push({
        userName,
        email: 'example@example.com',
        thoughts: getRandomThoughts(3),
        friends: getRandomFriends
      });
    }
  
    await User.collection.insertMany(users);
    await Thought.collection.insertMany(thoughts);
  
    // loop through the saved applications, for each application we need to generate a application response and insert the application responses
    console.table(users);
    console.table(thoughts);
    console.info('Seeding complete! 🌱');
    process.exit(0);
});
  