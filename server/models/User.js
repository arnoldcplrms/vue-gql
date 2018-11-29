const mongoose = require('mongoose');
const md5 = require('md5');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    avatar: {
        type: String,
    },
    joinDate: {
        type: Date,
        default: Date.now
    },
    favorites: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        ref: 'Post'
    }
});

//Set gravatar
UserSchema.pre('save', function(next) {
    this.avatar = `http://gravatar.com/avatar/${md5(this.username)}?d=identicon`;
    next();
});

//Hash password
UserSchema.pre('save', async function(next) {
    try {
        if (!this.isModified('password')) return next();
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.password, salt);
        this.password = hash;
        console.log(this.password);
        next();
    } catch (error) {
        next(error);
    }
})

module.exports = mongoose.model('User', UserSchema);