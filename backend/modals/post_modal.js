
import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    postDescription: {type: String, default: null},
    postType: {type: String, default: "text/"},
    postData: {type: Object, default: null},
    likedBy: {type: Array, default: []},
    comments: {type: Array, default: []},
    uploadAt: {type: Date, default: Date.now()},
}, { timestamps: true} );

export const postModal = mongoose.model('Posts', postSchema);