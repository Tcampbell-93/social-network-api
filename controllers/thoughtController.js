const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
    // get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            return res.json(thoughts);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async createThought(req, res) {
        try {
            // create a thought
            const thought = await Thought.create(req.body);

            // add the thought to the user using their id
            const user = await User.findOneAndUpdate(
                { _id: req.body },
                { $push: { thoughts: req.params.thoughtId }},
                { new: true }
            )

            res.json({ message: 'Thought created successfully.'});
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async getSingleThought(req, res) {
        try {
            // get a single thought 
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .select('-__v');
            
            // if it does not exist send an error message
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that id'});
            }
            
            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async updateThought(req, res) {
        try {
            // update a single thought
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            )

            // if it does not exist send an error message
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that id'});
            }

            res.json({ message: 'Thought updated successfully.'});
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async deleteThought(req, res) {
        try {
            // delete a thought by it's id
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            // if it does not exist send an error message
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that id'});
            }

            // find the thought's associated user and update the user's thoughts
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { thoughts: req.params.thoughtId }},
                { new: true }
            )

            // if it does not exist send an error message
            if (!user) {
                return res.status(404).json({ message: 'No user with that id'});
            }

            res.json({ message: 'Thought successfully deleted.'});
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async createReaction(req, res) {
        try {
            // create a reaction to a thought using the thought's id
            const thoughtReaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body }},
                { runValidators: true, new: true }
            )

            // if it does not exist send an error message
            if (!thoughtReaction) {
                return res.status(404).json({ message: 'No thought with that id'});
            }

            res.json({ message: 'Reactions successfully added to the thought.'});
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async deleteReaction(req, res) {
        try {
            // delet a reaction based on the reaction id
            const thoughtReaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { _id: req.params.reactionId }}},
                { runValidators: true, new: true }
            )

            // if it does not exist send an error message
            if (!thoughtReaction) {
                return res.status(404).json({ message: 'No thought with that id'});
            }

            res.json({ message: 'Reaction successfully deleted.'});
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }
}