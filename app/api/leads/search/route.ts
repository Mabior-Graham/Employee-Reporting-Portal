// app/api/users/login/route.ts

import { connect } from "../../../../src/dbConfig/dbConfig";
import User from "../../../../src/models/userModel.js";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"
import Lead from "../../../../src/models/leadModel";
import { useSearchParams } from "next/navigation";

connect()
// Calls the connect function to establish a connection to the database.

async function run(name) {
    try {
      
      // Querying our database
      
      const query = {
        $text: { $search: name }
      };
      
      const results = await Lead.find(query) // Sort by relevance
       // Pagination: limit to 10 results (adjust as needed)
        
      // const lead = await Lead.findOne({name:name});
      
      return NextResponse.json({
        message: "Lead found",
        data: results
    })
      
    }  catch (error: any) {
        return NextResponse.json({error: error.message})
        
    }
  
  }
export async function GET(request: NextRequest) {
    
    // const name = "mab"
    const name = request.nextUrl.searchParams.get('name');

    const lead =  await run(name);
    return lead
  }