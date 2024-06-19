// src/models/userModel.js

import mongoose, { Schema } from "mongoose";
import User from "./userModel.js";

const leadSchema = new mongoose.Schema({
        name: {
            type: String,
            required: [true, "Please provide Name"],
            unique: true,
            // index: 'text'
        },
        phoneno: {
            type: String,
            required: [true, "Please provide Phone Number"],
            // index: 'text'
        },
        email: {
            type: String,
            // index: 'text'
        },
        location: {
            type: String,
            required: [true, "Please provide Location"],
            // index: 'text'
        },
        comment: {
            type: String,
            // index: 'text'
        },
        status: {
            type: String,
            required: [true, "Lead Status is Required"],
        },
        user_id: {
            type: [Schema.Types.ObjectId],
            required: [true, "Only Authenticated User can add Lead"],
            ref: "User",
            
        }
    
})
leadSchema.index({ name: 'text', email: 'text' });
const Lead = mongoose.models.leads || mongoose.model("leads", leadSchema);

export default Lead;