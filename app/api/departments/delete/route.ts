// app/api/users/signup/route.ts

import { connect } from "../../../../src/dbConfig/dbConfig";
import Department from "../../../../src/models/departmentModel";
import { NextRequest, NextResponse } from "next/server";


connect()
// Calls the connect function to establish a connection to the database.


export async function POST(request: NextRequest){
// Defines an asynchronous POST request handler.
    try {
        const reqBody = await request.json()
        const {id} = reqBody
// Parses the request body to extract name.



const myquery = { _id: id };


const deletedDep = await Department.deleteOne(myquery);




        return NextResponse.json({
            message: "Department Deleted successfully",
            success: true,
        })


    } catch (error: any) {
        return NextResponse.json({error: error.message})

    }
}