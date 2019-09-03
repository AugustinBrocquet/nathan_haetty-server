import * as mongoose from 'mongoose';

export const ImageSchema = new mongoose.Schema({
    name: {
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
