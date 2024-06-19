// app/api/users/login/route.ts

import { connect } from "../../../../src/dbConfig/dbConfig";
import User from "../../../../src/models/userModel.js";
import { NextRequest, NextResponse } from "next/server";
import { useSearchParams } from "next/navigation";

connect()
// Calls the connect function to establish a connection to the database.

async function run(id) {
    try {
      
      // Querying our database
      const user = await User.findOne({_id:id});
      
      return NextResponse.json({
        message: "User found",
        data: user
    })
      
    }  catch (error: any) {
        return NextResponse.json({error: error.message})
        
    }
  
  }
export async function GET(request: NextRequest) {
    
    
    const id = request.nextUrl.searchParams.get('id').slice(0, -1);;

    const user =  await run(id);
    return user
  }