"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";

import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button,
    Center,
    Heading,
    useToast,
    Spinner
  } from '@chakra-ui/react'

  import { Box } from '@chakra-ui/react'

export default function Page() {

    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const [lead, setLead] = React.useState({
        name: "",
        phoneno: "",
        email: "",
        location: "",
        comment: "",
        status: "NEW",
    })

    const toast = useToast();
    const onAdd = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/leads/create", lead);
            if(response.data.success){
                toast({
                  title: 'Lead Added Successfully.',
                  status: 'success',
                  duration: 9000,
                  isClosable: true,
                })
                setLoading(false)
              }
            // console.log(response)
            
        } catch (error:any) {
            console.log("failed:", error.message);
        }
    }


    return (
    <div className="w-full container">
        <div className='m-4 text-red'>
       <Center>
        <Heading size='md'>Add New Lead</Heading>
        </Center>
       </div>
       <Center>
        <Box w='75%' p={4} >

        <FormControl>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input
            id="name"
            type="text"
            value={lead.name}
            onChange={(e) => setLead({...lead, name: e.target.value})}
            placeholder="name"
            />

<FormLabel htmlFor="phoneno">Phone Number</FormLabel>
        <Input
            id="phoneno"
            type="text"
            value={lead.phoneno}
            onChange={(e) => setLead({...lead, phoneno: e.target.value})}
            placeholder="phoneno"
            /> 
            
    <FormLabel htmlFor="email">Email</FormLabel>
        <Input
            id="email"
            type="text"
            value={lead.email}
            onChange={(e) => setLead({...lead, email: e.target.value})}
            placeholder="email"
            />

<FormLabel htmlFor="location">Location</FormLabel>
        <Input
            id="location"
            type="text"
            value={lead.location}
            onChange={(e) => setLead({...lead, location: e.target.value})}
            placeholder="location"
            />

<FormLabel htmlFor="comment">Comment</FormLabel>
        <Input
            id="comment"
            type="text"
            value={lead.comment}
            onChange={(e) => setLead({...lead, comment: e.target.value})}
            placeholder="comment"
            />

            <Button
            onClick={onAdd}
              fontFamily={'heading'}
              mt={8}
              w={'full'}
              bgGradient="linear(to-r, red.400,pink.400)"
              color={'white'}
              _hover={{
                bgGradient: 'linear(to-r, red.400,pink.400)',
                boxShadow: 'xl',
              }}>
              {loading ? <Spinner /> : "Create"}
            </Button>
            </FormControl>
            </Box>
            </Center>
        </div>
    )

}