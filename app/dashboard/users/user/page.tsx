"use client";
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { Select } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';



export default function Page() {
  const router = useRouter()
  const id = useSearchParams()
  const path = usePathname()
  
  const [user, setUser] = useState([]);


  async function getUser() {
      const response = await fetch(`/api/users/user?id=${id}`);
      const data = await response.json();
      setUser(data.data);
      console.log(data);
    }

    useEffect(() => {
      //Runs only on the first render
      getUser();
    }, []);
    
    const [newuser, setnewUser] = useState({
      id: user._id,
      department: ""
  })

  
 
  const onUpdate = async () => {
    try {
        
        const response = await axios.post("/api/users/update", newuser);
      
        console.log(response)
      
        console.log(user)
        
    } catch (error:any) {
        console.log("failed:", error.message);
    }
}

    


  return (
      <>
        <p>Name: {user.username}</p>
        <p>Email: {user.email}</p>
        <p>Department: {user.department}</p>
        

        <Select placeholder='Select option' onChange={(e) => setnewUser({...newuser, department: e.target.value, id: user._id})}>
        <option value='' selected disabled>Assign Department</option>
        <option value='IT'>IT</option>
        <option value='Marketing'>Marketing</option>
        <option value='Human Resourse'>Human Resourse</option>
       
      </Select>

      <button onClick={onUpdate}>Update</button>
      </>
  )
}