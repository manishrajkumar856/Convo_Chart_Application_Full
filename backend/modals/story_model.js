import mongoose from "mongoose";

const storySchema = mongoose.Schema({
    userId: {
        type: String,
        required: [true, "User Id is required"],
    },
    storyDescription: {
        type: String, 
        default: null
    },
    storyType: {
        type: String, 
        default: "image/"
    },
    storyData: {
        type: Object,
         default: null,
         required: [true, "Story data is reqired"]
    },
    likedBy: {
        type: Array,
        default: []
    },
    comments: {
        type: Array,
        default: []
    },
},  { timestamps: true} );

const storyModel = mongoose.model('Story', storySchema);

export default storyModel;