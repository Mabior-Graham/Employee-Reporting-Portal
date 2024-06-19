// app/api/users/signup/route.ts

import { connect } from "../../../../../src/dbConfig/dbConfig";
import { getDataFromToken } from "../../../../../src/helpers/getDataFromToken";
import Salereport from "../../../../../src/models/salereportModel";
import { NextRequest, NextResponse } from "next/server";


connect()
// Calls the connect function to establish a connection to the database.


export async function POST(request: NextRequest){
// Defines an asynchronous POST request handler.
    try {
        const reqBody = await request.json()
        const {name,period} = reqBody
// Parses the request body to extract name.

const userId = await getDataFromToken(request);
const NumberOfSales = 6;
const TotalRevenue = 78000;
const d = new Date();
const newSaleReport = new Salereport({name,period,NumberOfSales,TotalRevenue,date: d,user_id:userId})

// Saves the new department to the database.
        const savedReport = await newSaleReport.save()


        return NextResponse.json({
            message: "Sale Report created successfully",
            success: true,
            savedReport
        })


    } catch (error: any) {
        return NextResponse.json({error: error.message})

    }
}