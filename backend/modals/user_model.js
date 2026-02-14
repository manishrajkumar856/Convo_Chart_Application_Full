import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    serName: {type: String, required: true},
    Dob: {type: Object, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    token: {type: String, default: null},
    isLoggedIn: {type: Boolean, default: false},
    isVerify: {type: Boolean, default: false},
    expireAt: {type: Date,},
    otp: {type: String, default: ""},
    accessToken: {type: String, default: null},
    refreshToken: {type: String, default: null},


    profilePicInfo: {type: Object, default: null},
    profileCoverPicInof: {type: Object, default: null},



    following: {type: Array, default: []},
    follower: {type: Array, default: []},
    friendList: {type: Array, default: []},
    storyList: {type: Array, default: []},
    requests: {type: Array, default: []},
    
    userNotifications: {type: Array, default: []},

}, {timestamps: true});

// TTL index: deletes when expiresAt is reached
userSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

export const User = mongoose.model("User", userSchema);