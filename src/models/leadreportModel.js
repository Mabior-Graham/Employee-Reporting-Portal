// src/models/userModel.js

import mongoose, { Schema } from "mongoose";
import User from "./userModel";

const leadreportSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide Name"],
        unique: true,
    },
    phoneno: {
        type: String,
        required: [true, "Please provide Phone Number"],
    },
    email: {
        type: String,
    },
    location: {
        type: String,
        required: [true, "Please provide Location"],
    },
    comment: {
        type: String,
    },
    status: {
        type: String,
        required: [true, "Lead Status is Required"],
    },
    user_id: {
        type: [Schema.Types.ObjectId],
        required: [true, "Only Authenticated User can add Lead"],
        ref: "User",
        
    },
    
})

const Lead = mongoose.models.leads || mongoose.model("leads", leadSchema);

export default Lead;