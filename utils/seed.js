const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomThoughts, getRandomFriends, getRandomUsername, getRandomEmail } = require('./data');

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
        username: getRandomUsername(),
        email: getRandomEmail(),
        thoughts: getRandomThoughts(3),
        friends: getRandomFriends(2)
      });
    }

    for (let user of users) {
      const userThoughts = user.thoughts;
      await Thought.insertMany(userThoughts);
    }
  
    await User.collection.insertMany(users);
    
    // loop through the saved applications, for each application we need to generate a application response and insert the application responses
    console.table(users);
    users.forEach(user => {
      console.table(user.thoughts);
    });
    console.info('Seeding complete!');
    process.exit(0);
});
