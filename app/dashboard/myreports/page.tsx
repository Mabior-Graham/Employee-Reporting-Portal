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
    useDisclosure
  } from '@chakra-ui/react'
  import { Center, Square, Circle } from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import NextLink from 'next/link'
import { ViewIcon } from '@chakra-ui/icons';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from '@chakra-ui/react'
import { formatDate } from '../../../src/helpers/formatDate';


export default function page(){

    const [myreports, setMyreports] = useState([]);
    const [myreport, setMyreport] = useState([]);
   
    async function getMyreports() {
        const response = await fetch("/api/reports/sales/myreports");
        const data = await response.json();
        setMyreports(data.data);
        console.log(data);
      }

      useEffect(() => {
        //Runs only on the first render
        getMyreports();
      }, []);
      
      const { isOpen, onOpen, onClose } = useDisclosure()

      const viewThis = async (name,period,date,NumberOfSales,TotalRevenue) => {
        try {
          
          setMyreport({...myreport,name:name,period:period,date:date,NumberOfSales:NumberOfSales,TotalRevenue:TotalRevenue})
          onOpen()
            
            
        } catch (error:any) {
            console.log("failed:", error.message);
        }
    }

    

  
    
      
  return(

    
    <div className=''>

       
       <div className='mb-5 text-red'>
       <Center>
        <Heading size='md'>My Reports</Heading>
        </Center>
       </div>
      <TableContainer>
  <Table variant='simple'>
    
    <Thead>
      <Tr>
        <Th>Name</Th>
        <Th>Period</Th>
        <Th>Date</Th>
        <Th>Actions</Th>
        
      </Tr>
    </Thead>
    <Tbody>

{myreports.map((myreport) => (
        <Tr>
            <Td>{myreport.name}</Td>
            <Td>{myreport.period}</Td>
            <Td>{formatDate(myreport.date)}</Td>
            
            <Td> 
              <Button colorScheme='blue' onClick={() => viewThis(myreport.name,myreport.period,myreport.date,myreport.NumberOfSales,myreport.TotalRevenue)}><ViewIcon /></Button>
            </Td>
        </Tr>
      ))}
      
    </Tbody>
    
  </Table>
</TableContainer>

<>
      {/* <Button onClick={onOpen}>Trigger modal</Button> */}

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Report</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Stat>
            <StatLabel>Report Name</StatLabel>
            <StatNumber>{myreport.name}</StatNumber>
          </Stat>
          <StatGroup>
  <Stat>
    <StatLabel>Period</StatLabel>
    <StatNumber>{myreport.period}</StatNumber>
      
  </Stat>

  <Stat>
    <StatLabel>Report Date</StatLabel>
    <StatNumber>{formatDate(myreport.date)}</StatNumber>
    
  </Stat>
</StatGroup>

              <StatGroup>
  <Stat>
    <StatLabel>Total Revenue</StatLabel>
    <StatNumber>{myreport.TotalRevenue} /=</StatNumber>
    <StatHelpText>
      <StatArrow type='increase' />
      23.36%
    </StatHelpText>
  </Stat>

  <Stat>
    <StatLabel>Number of Sale</StatLabel>
    <StatNumber>{myreport.NumberOfSales}</StatNumber>
    <StatHelpText>
      <StatArrow type='decrease' />
      9.05%
    </StatHelpText>
  </Stat>
</StatGroup>
           
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
    </div>
  )
}