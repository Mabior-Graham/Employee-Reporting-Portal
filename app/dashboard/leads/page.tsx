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
    Heading,
    Button,
    Link,
    Stack,
    Input,
    Box
  } from '@chakra-ui/react'
  import { Center, Square, Circle } from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import NextLink from 'next/link'
import { ViewIcon } from '@chakra-ui/icons';


export default function page(){

    const [leads, setLeads] = useState([]);
    const [name, setName] = useState("");
    async function getLeads() {
        const response = await fetch("/api/leads");
        const data = await response.json();
        setLeads(data.data);
        console.log(data);
      }

      async function searchLeads() {
        const response = await fetch("/api/leads/search?name=${name}");
        const data = await response.json();
        setLeads(data.data);
        console.log(data);
      }

      useEffect(() => {
        //Runs only on the first render
        getLeads();
      }, []);
      
      
  return(

    
    <div className=''>

        
       <div className='m-4 text-red'>
       <Center>
        <Heading size='md'>Leads</Heading>
        </Center>
       </div>

       <div className='grid item-end justify-items-end w-full m-4'>
         
          <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>
          
          <Button
            as={'a'}
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'pink.400'}
            href={'/dashboard/leads/add'}
            _hover={{
              bg: 'pink.300',
            }}>
            Add New Lead
          </Button>
        </Stack>
       </div>
       <div className='m-4'>
       <Center>
          <Box w={'75%'}>
            <Input placeholder='Search' onKeyUp={searchLeads} onChange={(e) => setName(e.target.value)}/>
          </Box>
       </Center>
       </div>
      <TableContainer>
  <Table variant='simple'>
    
    <Thead>
      <Tr>
        <Th>Name</Th>
        <Th>Phone Number</Th>
        <Th>Email</Th>
        <Th>Location</Th>
        <Th>Status</Th>
        <Th>Actions</Th>
        
      </Tr>
    </Thead>
    <Tbody>

{leads.map((lead) => (
        <Tr>
            <Td>{lead.name}</Td>
            <Td>{lead.phoneno}</Td>
            <Td>{lead.email}</Td>
            <Td>{lead.location}</Td>
            <Td>{lead.status}</Td>
            <Td> 
              
               <Button
            as={'a'}
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'pink.400'}
            href={`/dashboard/leads/lead?${lead._id}`}
            _hover={{
              bg: 'pink.300',
            }}>
            <ViewIcon />
          </Button>
            </Td>
        </Tr>
      ))}
      
    </Tbody>
    
  </Table>
</TableContainer>
    </div>
  )
}