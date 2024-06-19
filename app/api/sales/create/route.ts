// app/api/users/signup/route.ts

import { connect } from "../../../../src/dbConfig/dbConfig";
import Sale from "../../../../src/models/saleModel";
import { NextRequest, NextResponse } from "next/server";


connect()
// Calls the connect function to establish a connection to the database.


export async function POST(request: NextRequest){
// Defines an asynchronous POST request handler.
    try {
        const reqBody = await request.json()
        const {product,amount,lead_id,date} = reqBody
// Parses the request body to extract params.

const newSale = new Sale({product,amount,lead_id,date})

// Saves the new department to the database.
        const savedSale = await newSale.save()


        return NextResponse.json({
            message: "Sale created successfully",
            success: true,
            savedSale
        })


    } catch (error: any) {
        return NextResponse.json({error: error.message})

    }
}