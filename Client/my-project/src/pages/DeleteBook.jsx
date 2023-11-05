import React,{useState}from 'react'
import {Navigate, useNavigate, useParams} from "react-router-dom"
import BackButton from '../components/BackButton';
import axios from 'axios';
import Spinner from '../components/Spinner';
import {  useSnackbar } from 'notistack';


const DeleteBook = () => {

  const {enqueueSnackbar} = useSnackbar();
const navigate= useNavigate();
const [loading ,setLoading]  = useState(false);
const {id} = useParams();

const handleDelete =() =>{
  axios.delete(`http://localhost:5555/books/${id}`).then(()=>{
    setLoading(false);
    enqueueSnackbar("Book Deleted Successfully",{variant:"success"})
    navigate("/");
  }).catch((err)=>{
    console.log(err);
  })
}

  return (
    <div>
      Delete Book
       <BackButton/>
       {loading ? <Spinner/> : ""}
       <div className='border border-red-500 rounded-md p-4 w-[600px] text-center m-auto'>
        <h4>Are You Sure To Delete This Book!</h4>
        <button onClick={handleDelete} className='p-3 bg-rose-600 mt-2 text-white rounded'>Yes! Delete It</button>
       </div>

    </div>
  )
}

export default DeleteBook
