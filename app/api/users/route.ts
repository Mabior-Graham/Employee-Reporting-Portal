// app/api/users/login/route.ts

import { connect } from "../../../src/dbConfig/dbConfig";
import User from "../../../src/models/userModel.js";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

connect()
// Calls the connect function to establish a connection to the database.

async function run() {
    try {
      
      // Querying our database
      const users = await User.find({});
      
      return NextResponse.json({
        message: "Users found",
        data: users
    })
      
    }  catch (error: any) {
        return NextResponse.json({error: error.message})
        
    }
  
  }
export async function GET(request: Request) {
    const users =  await run();
    return users
  }