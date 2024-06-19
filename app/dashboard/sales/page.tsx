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
    FormControl,
    FormLabel,
    Input,
    Icon,
    useToast
  } from '@chakra-ui/react'
  import { Center, Square, Circle } from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import NextLink from 'next/link'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Select,
  
} from '@chakra-ui/react'
import axios from 'axios';
import { MdSettings, MdReceipt } from 'react-icons/md'
import { IoDocumentTextOutline } from "react-icons/io5"
import { formatDate } from '../../../src/helpers/formatDate';

export default function page(){

    const [sales, setSales] = useState([]);
    
    const [report, setReport] = useState({
      name: "",
      period: "",
      
  })
    async function getSales() {
        
        const response = await fetch("/api/sales");
        const data = await response.json();
        setSales(data.data);
        console.log(data);
      }

      useEffect(() => {
        //Runs only on the first render
        getSales();
      }, []);
      
      const { isOpen, onOpen, onClose } = useDisclosure()
      const [loading, setLoading] = useState(false)
      const toast = useToast()
      const onCreate = async () => {
        try {
            const response = await axios.post("/api/reports/sales/create", report);
            if(response.data.success){
              toast({
                title: 'Report Created Successfully.',
                status: 'success',
                duration: 9000,
                isClosable: true,
              })
              setLoading(false)
            }
            console.log(response)
            
        } catch (error:any) {
            console.log("failed:", error.message);
        }

        
    }
  return(

    
    <div className=''>

        
       <div className='m-4 text-red'>
       <Center>
        <Heading size='md'>Sales</Heading>
        </Center>
       
 
 
      <>
        <div className='grid item-end justify-items-end w-full'>
          <Button onClick={onOpen}>Report<Icon as={IoDocumentTextOutline} boxSize={6} /></Button>
        </div>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create Sale Report</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input placeholder='name' onChange={(e) => setReport({...report, name: e.target.value})}/>
              </FormControl>
            
              <FormLabel>Period</FormLabel>
            <Select placeholder='Choose Period' variant='filled' onChange={(e) => setReport({...report, period: e.target.value})}>
              <option value='Daily'>Daily</option>
              <option value='Weekly'>Weekly</option>
              <option value='Monthly'>Monthly</option>
            </Select>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='yellow' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button colorScheme='blue' onClick={onCreate}>{loading ? <Spinner /> : "Create"}</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>

       </div>
      <TableContainer>
  <Table variant='simple'>
    
    <Thead>
      <Tr>
        {/* <Th>Lead_ID</Th> */}
        <Th>Product/Service</Th>
        <Th>Amount</Th>
        <Th>Date</Th>
        
        
      </Tr>
    </Thead>
    <Tbody>

{sales.map((sale) => (
        <Tr>
            {/* <Td>{sale.lead_id}</Td> */}
            <Td>{sale.product}</Td>
            <Td>{sale.amount}</Td>
            <Td>{formatDate(sale.date)}</Td>
           
        </Tr>
      ))}
      
    </Tbody>
    
  </Table>
</TableContainer>
    </div>
  )
}