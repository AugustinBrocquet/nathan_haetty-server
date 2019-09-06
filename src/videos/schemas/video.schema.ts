import * as mongoose from 'mongoose';

export const VideoSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: false,
        required: true,
    },
    description: {
        type: String,
        unique: false,
        required: true,
    },
    path_youtube: {
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
