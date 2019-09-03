import * as mongoose from 'mongoose';

export const PostSchema = new mongoose.Schema({
    content: {
        type: String,
        unique: false,
        required: true,
    },
    created_at: {
        type: Date,
        unique: false,
        required: true,
        default: Date.now(),
    },
});
