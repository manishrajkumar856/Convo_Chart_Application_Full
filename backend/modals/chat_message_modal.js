import { text } from "express";
import mongoose from "mongoose";

const chatMessageSchema = mongoose.Schema({
    sender : { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    message: {type: String, default: null},
    createdAt: {type: Date, default: Date.now},
})

export const Chat_Model = mongoose.model("ChatMessage", chatMessageSchema);