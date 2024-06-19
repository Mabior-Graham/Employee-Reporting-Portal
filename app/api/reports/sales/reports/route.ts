// app/api/users/login/route.ts

import { connect } from "../../../../../src/dbConfig/dbConfig";
import User from "../../../../../src/models/userModel.js/index.js";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"
import Salereport from "../../../../../src/models/salereportModel";
import { getDataFromToken } from "../../../../../src/helpers/getDataFromToken";

connect()
// Calls the connect function to establish a connection to the database.


export async function GET(request: NextRequest) {
  try {
      
      // Querying our database
    

      const reports = await Salereport.find();
      
      return NextResponse.json({
        message: "Reports found",
        data: reports
    })
      
    }  catch (error: any) {
        return NextResponse.json({error: error.message})
        
    }
  }