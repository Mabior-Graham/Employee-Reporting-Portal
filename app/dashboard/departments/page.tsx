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
    Stack,
    useToast,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter
  } from '@chakra-ui/react'
  import { Center, Square, Circle } from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import NextLink from 'next/link'
import { Link } from '@chakra-ui/react'
import axios from 'axios';

export default function page(){

    const [departments, setDepartments] = useState([]);
    const [department, setDepartment] = useState([]);
    async function getDepartments() {
        const response = await fetch("/api/departments");
        const data = await response.json();
        setDepartments(data.data);
        console.log(data);
      }

      useEffect(() => {
        //Runs only on the first render
        getDepartments();
      },       []);
      
      
      const { isOpen, onOpen, onClose } = useDisclosure()
      const deleteThis = async (id) => {
        try {
            
            setDepartment({...department, id: id})
            // deleteIt()

            onOpen()
            
            
        } catch (error:any) {
            console.log("failed:", error.message);
        }
    }

    const toast = useToast();
    const deleteIt = async () => {
      try {
          
          const response = await axios.post("/api/departments/delete", department);
          if(response.data.success){
            toast({
              title: 'Department Deleted Successfully.',
              status: 'success',
              duration: 9000,
              isClosable: true,
            })
          }
          console.log(response)
          
      } catch (error:any) {
          console.log("failed:", error.message);
      }
  }
  return(

    
    <div className=''>

        
       <div className='m-4'>
       <Center>
        <Heading size='md'>Departments</Heading>
        </Center>
       </div>

       <div className='grid item-end justify-items-end w-full'>
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
            href={'/dashboard/departments/add'}
            _hover={{
              bg: 'pink.300',
            }}>
            Add New Department
          </Button>
        </Stack>
       </div>
      <TableContainer>
  <Table variant='simple'>
    
    <Thead>
      <Tr>
        <Th>Name</Th>
        <Th>Actions</Th>
        
      </Tr>
    </Thead>
    <Tbody>

{departments.map((department) => (
        <Tr>
            <Td>{department.name}</Td>
            <Td><Button colorScheme='red' onClick={() => deleteThis(department._id)}>Delete</Button></Td>
        </Tr>
      ))}
      
    </Tbody>
    
  </Table>
</TableContainer>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Are you sure? </ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  {/* loroh */}
                </ModalBody>

                <ModalFooter>
                <Button onClick={onClose}>Cancel</Button>
                  <Button colorScheme='red' mr={3} onClick={deleteIt}>
                    Delete
                  </Button>
                  
                </ModalFooter>
              </ModalContent>
            </Modal>
    </div>
  )
}