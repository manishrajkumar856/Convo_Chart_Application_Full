import mongoose from "mongoose";

const requestSchema = mongoose.Schema({
    senderId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    receiverId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    requestStatus: {type: String, enum: ['pending', 'acceptec', 'rejected'], default: 'pending'},
})

export const RequestModel = mongoose.model('FriendRequest', requestSchema);

