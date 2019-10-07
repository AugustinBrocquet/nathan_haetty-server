import * as mongoose from 'mongoose';

export const WallpaperSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: false,
        required: true,
    },
    path_image: {
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
