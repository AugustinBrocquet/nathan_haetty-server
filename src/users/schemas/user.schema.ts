import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: false,
        required: true,
    },
    firstname: {
        type: String,
        unique: false,
        required: true,
    },
    lastname: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    reset_password_token: {
        type: String,
        unique: false,
        required: false,
        default: null,
    },
    reset_password_expires: {
        type: Date,
        unique: false,
        required: false,
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

// NOTE: Arrow functions are not used here as we do not want to use lexical scope for 'this'
UserSchema.pre('save', function (next) {

    let user = this;

    // Make sure not to rehash the password if it is already hashed
    if (!user.isModified('password')) return next();

    // Generate a salt and use it to hash the user's password
    bcrypt.genSalt(10, (err, salt) => {

        if (err) return next(err);

        bcrypt.hash(user.password, salt, (err, hash) => {

            if (err) return next(err);
            user.password = hash;
            next();

        });

    });

});

UserSchema.methods.checkPassword = function (attempt, callback) {

    let user = this;

    bcrypt.compare(attempt, user.password, (err, isMatch) => {
        if (err) return callback(err);
        callback(null, isMatch);
    });

};
