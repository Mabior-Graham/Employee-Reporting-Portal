// src/app/profile/page.ts
"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { useState } from "react";

export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState("nothing")

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me')
        setData(res.data.data)

        
    }

    useEffect(() => {
        //Runs only on the first render
        getUserDetails()
      }, []);
    console.log(data)
    return(
        <div>
            <h1>Profile</h1>
            <h1>ID: {data._id}</h1>
            <h1>Username: {data.username}</h1>
            <h1>Email: {data.email}</h1>
            <h2>{data==="nothing" ? "Nothing": "something" }</h2>
            <button onClick={getUserDetails}>Details</button>

        </div>
    )
}
