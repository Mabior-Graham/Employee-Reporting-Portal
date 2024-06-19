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
        const {name} = reqBody
// Parses the request body to extract name.

const newDepartment = new Department({name})

// Saves the new department to the database.
        const savedDepartment = await newDepartment.save()


        return NextResponse.json({
            message: "Department created successfully",
            success: true,
            savedDepartment
        })


    } catch (error: any) {
        return NextResponse.json({error: error.message})

    }
}