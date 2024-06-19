// app/api/users/signup/route.ts

import { connect } from "../../../../src/dbConfig/dbConfig";
import { getDataFromToken } from "../../../../src/helpers/getDataFromToken";
import Lead from "../../../../src/models/leadModel";
import { NextRequest, NextResponse } from "next/server";


connect()
// Calls the connect function to establish a connection to the database.


export async function POST(request: NextRequest){
// Defines an asynchronous POST request handler.
    try {
        const reqBody = await request.json()
        const {name,phoneno,email,location,comment,status} = reqBody
// Parses the request body to extract name.

const userId = await getDataFromToken(request);

const newLead = new Lead({name,phoneno,email,location,comment,status, user_id:userId})

// Saves the new department to the database.
        const savedLead = await newLead.save()


        return NextResponse.json({
            message: "lead created successfully",
            success: true,
            savedLead
        })


    } catch (error: any) {
        return NextResponse.json({error: error.message})

    }
}