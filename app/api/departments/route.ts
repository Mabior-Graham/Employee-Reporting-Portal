// app/api/users/login/route.ts

import { connect } from "../../../src/dbConfig/dbConfig";
import User from "../../../src/models/userModel.js/index.js";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"
import Department from "../../../src/models/departmentModel";

connect()
// Calls the connect function to establish a connection to the database.

async function run() {
    try {
      
      // Querying our database
      const departments = await Department.find({});
      
      return NextResponse.json({
        message: "Departments found",
        data: departments
    })
      
    }  catch (error: any) {
        return NextResponse.json({error: error.message})
        
    }
  
  }
export async function GET(request: Request) {
    const departments =  await run();
    return departments
  }