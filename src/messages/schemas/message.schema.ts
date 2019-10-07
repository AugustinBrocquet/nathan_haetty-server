import * as mongoose from 'mongoose';

export const MessageSchema = new mongoose.Schema({
    fullname: {
        type: String,
        unique: false,
        required: true,
    },
    email: {
        type: String,
        unique: false,
        required: true,
    },
    phone: {
        type: String,
        unique: false,
        required: true,
    },
    content: {
        type: String,
        unique: false,
        required: true,
    },
    pictures: {
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
});
