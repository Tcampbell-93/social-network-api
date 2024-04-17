const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,

        },
        createdAt: {

        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
        }
    }
)

const Thought = model('thought', thoughtSchema);

module.exports = Thought;