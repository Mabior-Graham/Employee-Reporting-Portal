// app/api/users/login/route.ts

import { connect } from "../../../src/dbConfig/dbConfig";
import Sale from "../../../src/models/saleModel";
import { NextRequest, NextResponse } from "next/server";



connect()
// Calls the connect function to establish a connection to the database.

async function run() {
    try {
      
      // Querying our database
      const sales = await Sale.find({});
      
      return NextResponse.json({
        message: "Sales found",
        data: sales
    })
      
    }  catch (error: any) {
        return NextResponse.json({error: error.message})
        
    }
  
  }
export async function GET(request: Request) {
    const sales =  await run();
    return sales
  }