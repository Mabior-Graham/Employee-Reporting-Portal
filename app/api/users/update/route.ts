// app/api/users/signup/route.ts

import { connect } from "../../../../src/dbConfig/dbConfig";
import User from "../../../../src/models/userModel.js";
import { NextRequest, NextResponse } from "next/server";


connect()
// Calls the connect function to establish a connection to the database.


export async function POST(request: NextRequest){
// Defines an asynchronous POST request handler.
    try {
        const reqBody = await request.json()
        const {id,department} = reqBody
// Parses the request body to extract name.



const myquery = { _id: id };
const newvalues = { $set: { department: department } };

const updatedUser = await User.updateOne(myquery, newvalues);




        return NextResponse.json({
            message: "Department Assigned successfully",
            success: true,
            updatedUser
        })


    } catch (error: any) {
        return NextResponse.json({error: error.message})

    }
}