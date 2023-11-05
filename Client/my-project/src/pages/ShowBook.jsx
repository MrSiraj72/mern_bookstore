import axios from 'axios';
import React from 'react'
import BackButton from "../components/BackButton"
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../components/Spinner';


const ShowBook = () => {

  const [book ,setBooks] = useState({});
  const [loading , setLoading] = useState(false);
  const {id} = useParams();

  useEffect(()=>{
   setLoading(true);
   axios.get(`http://localhost:5555/books/${id}`).then((res)=>{
     setBooks(res.data)
      setLoading(false)
   }).catch((err)=>{
    console.log(err);
    setLoading(false)
   })
  },[])

  return (
    <>
      <h1>Show Book</h1>
      <BackButton/>
      {
        loading ? (
          <Spinner/>
        ):(
          <div  className='p-4 border w-fit rounded border-red-500 m-3'>
           <div className='flex gap-2 p-2'>
             <h2 className='font-bold '>Name:</h2>
             <span>{book.name}</span>
           </div>
           <div className='flex gap-2  p-2'>
             <h2 className='font-bold '>Author:</h2>
             <span>{book.author}</span>
           </div>
           <div className='flex gap-2  p-2'>
             <h2 className='font-bold '>Publish Year:</h2>
             <span>{book.publishYear}</span>
           </div>
           <div className='flex gap-2  p-2'>
             <h2 className='font-bold '>Create Time:</h2>
             <span>{new Date(book.createdAt).toString()}</span>
           </div>
           <div className='flex gap-2  p-2'>
             <h2 className='font-bold '>Last Update Time:</h2>
             <span>{new Date(book.updatedAt).toString()}</span>
           </div>
          </div>
        )
          
      }
       
  </>
  )
}

export default ShowBook
