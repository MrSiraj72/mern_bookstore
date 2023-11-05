import React from 'react'
import axios from "axios"
import { useState , useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import Spinner from '../components/Spinner';
import {  useSnackbar } from 'notistack';


const Home = () => {
  const {enqueueSnackbar} = useSnackbar();
  const [books ,setBooks] = useState([]);
  const [search , setSearch] = useState('');
  const [loading , setLoading] = useState(false);

  useEffect(()=>{
    setLoading(true);
     axios.get("http://localhost:5555/books").then((res)=>{
      setBooks(res.data.data);
      setLoading(false);
     }).catch((err)=>{
      console.log(err);
      setLoading(false)
     })
  },[])

const handleSearch = (e) =>{
  e.preventDefault();
    let filterbook = books.filter((book,idx) => book.name == search);
    if(filterbook == ""){
      enqueueSnackbar("Book Not Found!",{variant:"error"})
    }else{
      enqueueSnackbar("Book Found",{variant:"success"})
      setBooks(filterbook)
    }
    
    
}

  return (
    <div>
      <h1>Book List</h1>
      {loading ? (
        <Spinner/>
      ):(
        <div>
        <Link to="/books/create">
        <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
       <form onSubmit={handleSearch}>
       <input type="search" placeholder='Search Book' value={search} 
        onChange={(e)=>setSearch(e.target.value)}
        className='border p-2 border-black'
        required
       />
       <button type='submit'className='p-2 border border-black' >Search</button>
       </form>
        <table className='w-full border-separate border-spacing-2'>
      <thead>
        <tr>
          <th className='border border-slate-400 rounded-md'>No</th>
          <th className='border border-slate-400 rounded-md'>Name</th>
          <th className='border border-slate-400 rounded-md'>Author</th>
          <th className='border border-slate-400 rounded-md max-md:hidden'>Publish Year</th>
          <th className='border border-slate-400 rounded-md'>Operations</th>
        </tr>
      </thead>
      <tbody>
        {
          books.map((book,index)=>(
           <tr key={book._id}>
              <td className='border border-slate-500 rounded-md text-center'>{index+1}</td>
              <td className='border border-slate-500 rounded-md text-center'>{book.name}</td>
              <td className='border border-slate-500 rounded-md text-center'>{book.author}</td>
              <td className='border border-slate-500 rounded-md text-center'>{book.publishYear}</td>
              <td  className='border border-slate-500 rounded-md text-center'>
              <div className='flex justify-center gap-x-4'>
                <Link to={`/books/show/${book._id}`}>
                  <BsInfoCircle className='text-2xl text-green-800' />
                </Link>
                <Link to={`/books/update/${book._id}`}>
                  <AiOutlineEdit className='text-2xl text-yellow-600' />
                </Link>
                <Link to={`/books/delete/${book._id}`}>
                  <MdOutlineDelete className='text-2xl text-red-600' />
                </Link>
              </div>
              </td>
           </tr>
          ))
        }
      </tbody>
    </table>
      </div>
      )
      
      }
      
   


    </div>
  )
}

export default Home
