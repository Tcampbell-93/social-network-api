const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
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
            const thought = await Thought.create(req.body);
            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .select('-__v');
            
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
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            )

            console.log(thought);

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
            const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that id'});
            }

            const user = await User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId }},
                { new: true }
            )

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
            const thoughtReaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body }},
                { runValidators: true, new: true }
            )

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
            const thoughtReaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { _id: req.params.reactionId }}},
                { runValidators: true, new: true }
            )

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