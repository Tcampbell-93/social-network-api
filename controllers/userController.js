const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');


module.exports = {
    async getUsers(req, res) {
        // get all users
        try {
            const users = await User.find();
            return res.json(users);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // create a user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // get a single user
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .select('-__v');

            // if it does not exist send an error message
            if (!user) {
                return res.status(404).json({ message: 'No user with that id'});
            }

            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // update a user by id
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            )

            // if it does not exist send an error message
            if (!user) {
                return res.status(404).json({ message: 'No user found with that id.'});
            }

            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // delete a user by their id
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            // if it does not exist send an error message
            if (!user) {
                return res.status(404).json({ message: 'No user found with that id.'});
            }

            await Thought.deleteMany({ _id: { $in: user.thoughts }});
            res.json({ message: 'User and associated thoughts deleted.'});
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // add a friend to the friends array by their IDs'
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: { _id: req.params.friendId }}},
                { runValidators: true, new: true }
            )

            // if it does not exist send an error message
            if (!user) {
                return res.status(404).json({ message: 'No user found with that id.'});
            }

            res.json({ message: 'Friend added successfully.'})
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // delete a friend from the friends array by their IDs'
    async deleteFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: { _id: req.params.friendId }}},
                { runValidators: true, new: true }
            )

            // if it does not exist send an error message
            if (!user) {
                return res.status(404).json({ message: 'No user found with that id.'});
            }

            res.json({ message: 'Friend successfully removed from friend list.'})
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }
}