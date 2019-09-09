import * as mongoose from 'mongoose';

export const StorySchema = new mongoose.Schema({
    p0: {
        type: String,
        unique: false,
        required: true,
    },
    p1: {
        type: String,
        unique: false,
        required: true,
    },
    p2: {
        type: String,
        unique: false,
        required: true,
        default: null,
    },
    created_at: {
        type: Date,
        unique: false,
        required: true,
        default: Date.now(),
    },
    updated_at: {
        type: Date,
        unique: false,
        required: false,
        default: null,
    },
});
