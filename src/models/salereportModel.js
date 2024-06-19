// src/models/userModel.js

import mongoose, { Schema } from "mongoose";
import User from "./userModel.js";

const salereportSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide Name"],
        unique: true,
    },
    period: {
        type: String,
        required: [true, "Please provide The Period"],
    },
    NumberOfSales: {
        type: String,
    },
    TotalRevenue: {
        type: String,
        required: [true, "Please provide Location"],
    },
    date: {
        type: Date,
        required: [true, "Please provide Date"],
    },
    
    user_id: {
        type: [Schema.Types.ObjectId],
        required: [true, "Only Authenticated User can add Lead"],
        ref: "User",
        
    },
    
})

const Salereport = mongoose.models.salereports || mongoose.model("salereports", salereportSchema);

export default Salereport;