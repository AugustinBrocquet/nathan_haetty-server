import * as mongoose from 'mongoose';

export const PostSchema = new mongoose.Schema({
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
    picture: {
        type: String,
        unique: false,
        required: true,
        default: null,
    },
    sub_pictures: {
        type: Array,
        unique: false,
        required: true,
        default: [],
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
