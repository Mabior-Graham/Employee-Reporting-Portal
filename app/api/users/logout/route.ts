// app/api/users/login/route.ts

import { connect } from "../../../../src/dbConfig/dbConfig";
import User from "../../../../src/models/userModel.js";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

connect()
// Calls the connect function to establish a connection to the database.

// This function handles HTTP GET requests to the API route.

    export async function GET(request: NextRequest) {
        try {
            const response = NextResponse.json(
                {
                    message: "Logout successful",
                    success: true,
                }
            )
            response.cookies.set("token", "",
            { httpOnly: true, expires: new Date(0)
            })

            return response;
            
        } catch (error : any) {
            return NextResponse.json({ error: error.message},
                {status: 500});
        }
        
    }
