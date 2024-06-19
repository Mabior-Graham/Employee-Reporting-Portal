// src/models/userModel.js

import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide Department Name"],
        unique: true,
    },
    
})

const Department = mongoose.models.departments || mongoose.model("departments", departmentSchema);

export default Department;