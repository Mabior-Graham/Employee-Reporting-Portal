"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { Box, Button, Center, FormControl, FormLabel, Heading, Input, Spinner, useToast } from "@chakra-ui/react";


export default function Page() {
    const [loading, setLoading] = React.useState(false);
    const router = useRouter();
    const [department, setDepartment] = React.useState({
        name: "",
    })

const toast = useToast()
    const onAdd = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/departments/create", department);
            
            if(response.data.success){
                toast({
                  title: 'Department Created Successfully.',
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
            value={department.name}
            onChange={(e) => setDepartment({...department, name: e.target.value})}
            placeholder="name"
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