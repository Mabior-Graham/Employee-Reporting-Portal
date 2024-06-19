// src/models/userModel.js

import mongoose, { Schema } from "mongoose";
import Lead from "./leadModel";

const saleSchema = new mongoose.Schema({
    product: {
        type: String,
        required: [true, "Please provide Product/Service"],
        unique: true,
    },
    amount: {
        type: String,
        required: [true, "Please provide the Amount"],
    },
    
    date: {
        type: Date,
    },

    lead_id: {
        type: [Schema.Types.ObjectId],
        ref: "Lead"
    },
    
    
})

const Sale = mongoose.models.sales || mongoose.model("sales", saleSchema);

export default Sale;