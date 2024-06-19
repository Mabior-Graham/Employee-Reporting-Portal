"use client";
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { Badge, Box, Button, Center, FormLabel, Heading, Select, Spinner, useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Highlight } from '@chakra-ui/react'

export default function Page() {
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  const id = useSearchParams()
  const path = usePathname()
  const [showSale, setshowSale] = useState(false);
  const [lead, setLead] = useState([]);
  async function getLead() {
      const response = await fetch(`/api/leads/lead?id=${id}&other=others`);
      const data = await response.json();
      setLead(data.data);
      console.log(data);
    }

    useEffect(() => {
      //Runs only on the first render
      getLead();
    }, []);
    
    const [newlead, setnewLead] = useState({
      id: lead._id,
      status: ""
  })

  const [sale, setSale] = useState({
    product: "",
    amount: "",
    date: "",
    lead_id: lead._id
})
 
const toast = useToast()
  const onUpdate = async () => {
    try {
      if(newlead.status == "Close Won"){
        // console.log(newlead.status)
        setLoading(true)
        const response = await axios.post("/api/sales/create", sale);
        console.log(response.data.message)
        if(response){
          const response = await axios.post("/api/leads/update", newlead);
          if(response.data.success){
            toast({
              title: 'Lead Updated Successfully.',
              status: 'success',
              duration: 9000,
              isClosable: true,
            })
            toast({
              title: 'Sale Created Successfully.',
              status: 'success',
              duration: 9000,
              isClosable: true,
            })
            setLoading(false)
          }
        }
      }else{
        setLoading(true)
        const response = await axios.post("/api/leads/update", newlead);
        if(response.data.success){
          toast({
            title: 'Lead Updated Successfully.',
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
          setLoading(false)
        }
      }
        
      
        console.log(sale)
        
    } catch (error:any) {
        console.log("failed:", error.message);
    }
}


const onCallChange = async (e) => {
  setnewLead({...newlead, status: e.target.value, id: lead._id})
  if(e.target.value == "Close Won"){
    setshowSale(true)
  }else{
    setshowSale(false)
  }
}

  return (
      <>
      <div className='m-4 text-red'>
       <Center>
        <Heading size='md'>Update Lead Status</Heading>
        </Center>
       </div>
      <Center>
      
      <Box w={'75%'}>
        
        <div>
          <Heading size='sm'>Name</Heading>
          <Heading size='md'>
          <Badge variant='outline' colorScheme='green'>
          {lead.name}
          </Badge>
          </Heading>
        </div>
        <div>
          <Heading size='sm'>Phone Number</Heading>
          <Heading size='md'>
          <Badge variant='outline' colorScheme='green'>
          {lead.phoneno}
          </Badge>
          </Heading>
        </div>
        <div>
          <Heading size='sm'>Email</Heading>
          <Heading size='md'>
          <Badge variant='outline' colorScheme='green'>
          {lead.email}
          </Badge>
          </Heading>
        </div>
        <div>
          <Heading size='sm'>Location</Heading>
          <Heading size='md'>
          <Badge variant='outline' colorScheme='green'>
          {lead.location}
          </Badge>
          </Heading>
        </div>
        
        <div className='mb-4'>
          <Heading size='sm'>Status</Heading>
          <Heading size='md'>
          <Badge variant='outline' colorScheme='green'>
          {lead.status}
          </Badge>
          </Heading>
        </div>
        
        
        
        <Select placeholder='Select option' onChange={(e) => onCallChange(e)}>
        <option value='' selected disabled>Update Status</option>
        <option value='Contacted'>Contacted</option>
        <option value='Followed Up'>Followed Up</option>
        <option value='Close Lost'>Close Lost</option>
        <option value='Close Won'>Close Won</option>
      </Select>

      {
      showSale &&
        <div>
          <Select placeholder='Select option' onChange={(e) => setSale({...sale, product: e.target.value, lead_id: lead._id})}>
            <option value='' selected disabled>Product/Service</option>
            <option value='Medic-ERP'>Medic-ERP</option>
            <option value='Agric-ERP'>Agric-ERP</option>
            <option value='LT Payment Gateway'>LT Payment Gateway</option>
            <option value='HY Heater'>HY Heater</option>
          </Select>
          <label htmlFor="name">Amount</label>
          <input
            id="amount"
            type="text"
            value={sale.amount}
            onChange={(e) => setSale({...sale, amount: e.target.value})}
            placeholder="amount"
            />

        <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            value={sale.date}
            onChange={(e) => setSale({...sale, date: e.target.value})}
            placeholder="date"
            />
        </div>
      }

      
      <Button
            onClick={onUpdate}
              fontFamily={'heading'}
              mt={8}
              w={'50%'}
              bgGradient="linear(to-r, red.400,pink.400)"
              color={'white'}
              _hover={{
                bgGradient: 'linear(to-r, red.400,pink.400)',
                boxShadow: 'xl',
              }}>
              {loading ? <Spinner /> : "Update"}
            </Button>
            </Box>
            </Center>
      </>
  )
}