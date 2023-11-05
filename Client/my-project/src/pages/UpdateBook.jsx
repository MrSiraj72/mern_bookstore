import React from 'react'
import { useState ,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'
import axios from 'axios'
import {  useSnackbar } from 'notistack';
import BackButton from '../components/BackButton'


const UpdateBook = () => {

const [name ,setName] = useState("");
const [author , setAuthor] = useState("");
const [publishYear , setPublishYear] = useState("");
const [loading , setLoading] = useState(false)
const {id} = useParams();
const Navigate = useNavigate();
const {enqueueSnackbar} = useSnackbar();

useEffect(()=>{
   axios.get(`http://localhost:5555/books/${id}`).then((res)=>{
       setName(res.data.name)
       setAuthor(res.data.author)
       setPublishYear(res.data.publishYear)
   })
},[])

const HandleEditForm =(e) =>{
  e.preventDefault();
  const Data= {
    name,
    author,
    publishYear
  };
  // setLoading(ture);
  axios.put(`http://localhost:5555/books/${id}`,Data).then(()=>{
    setLoading(false);
    enqueueSnackbar("Book Update Successfully",{variant:"success"})
    Navigate("/")
  }).catch((err)=>{
    console.log(err,"not created");
  })


}

  return (
    <>
    <BackButton/>
    <div className="min-h-screen flex items-center justify-center">
    <div className="bg-white p-8 shadow-md rounded-lg w-80">
      <h1 className="text-2xl font-semibold mb-4">Add a Book</h1>
      {loading ? <Spinner/> : ""}
      <form method='POST' onSubmit={HandleEditForm}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-600">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="author" className="block text-sm font-medium text-gray-600">
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={author}
            onChange={(e)=>setAuthor(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="publishYear" className="block text-sm font-medium text-gray-600">
            Publish Year
          </label>
          <input
            type="number"
            id="publishYear"
            name="publishYear"
            value={publishYear}
            onChange={(e)=>setPublishYear(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600">
          Save
        </button>
      </form>
    </div>
  </div>
  </>
  )
}

export default UpdateBook
