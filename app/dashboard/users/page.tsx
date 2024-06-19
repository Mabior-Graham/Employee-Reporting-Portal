"use client"
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Heading
  } from '@chakra-ui/react'
  import { Center, Square, Circle } from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import Link from 'next/link';


export default function page(){

    const [users, setUsers] = useState([]);
    async function getUsers() {
        const response = await fetch("/api/users");
        const data = await response.json();
        setUsers(data.data);
        console.log(data.data);
      }

      useEffect(() => {
        //Runs only on the first render
        getUsers();
      }, []);
      
      
  return(

    
    <div className=''>
       <div className='m-4'>
       <Center>
        <Heading size='md'>Users</Heading>
        </Center>
       </div>
      <TableContainer>
  <Table variant='simple'>
    
    <Thead>
      <Tr>
        <Th>Username</Th>
        <Th>Email</Th>
        <Th>Department</Th>
        <Th>Actions</Th>
      </Tr>
    </Thead>
    <Tbody>

{users.map((user) => (
        <Tr>
            <Td>{user.username}</Td>
            <Td>{user.email}</Td>
            <Td>{user.department}</Td>
            <Td> 
               <Link href={`/dashboard/users/user?${user._id}`}>i</Link>
            </Td>
        </Tr>
      ))}
      
    </Tbody>
    
  </Table>
</TableContainer>
    </div>
  )
}