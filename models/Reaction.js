const { Schema, model, Types } = require('mongoose');

// reaction schema
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
)

// virtual to get the reactionDate
reactionSchema.virtual('reactionDate').get(function() {
    return this.createdAt.toISOString();
});

module.exports = reactionSchema;

