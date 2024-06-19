// app/api/users/signup/route.ts

import { connect } from "../../../../src/dbConfig/dbConfig";
import Lead from "../../../../src/models/leadModel";
import { NextRequest, NextResponse } from "next/server";


connect()
// Calls the connect function to establish a connection to the database.


export async function POST(request: NextRequest){
// Defines an asynchronous POST request handler.
    try {
        const reqBody = await request.json()
        const {id,status} = reqBody
// Parses the request body to extract name.



const myquery = { _id: id };
const newvalues = { $set: { status: status } };

const updatedLead = await Lead.updateOne(myquery, newvalues);




        return NextResponse.json({
            message: "Lead Updated successfully",
            success: true,
            updatedLead
        })


    } catch (error: any) {
        return NextResponse.json({error: error.message})

    }
}