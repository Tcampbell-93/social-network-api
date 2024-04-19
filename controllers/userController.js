const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');


module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            return res.json(users);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async createUser(req, res) {
        try {

        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async getSingleUser(req, res) {
        try {

        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async updateUser(req, res) {
        try {

        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async deleteUser(req, res) {
        try {

        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async addFriend(req, res) {
        try {

        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async deleteFriend(req, res) {
        try {

        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }
}