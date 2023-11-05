import React from 'react'
import {Routes,Route} from "react-router-dom"
import Home from "./pages/Home"
import CreateBook from "./pages/CreateBook"
import DeleteBook from "./pages/DeleteBook"
import UpdateBook from "./pages/UpdateBook"
import ShowBook from "./pages/ShowBook"

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}  />
      <Route path='/books/create' element={<CreateBook/>}  />
      <Route path='/books/update/:id' element={<UpdateBook/>}  />
      <Route path='/books/delete/:id' element={<DeleteBook/>}  />
      <Route path='/books/show/:id' element={<ShowBook/>}  />
    </Routes>
  )
}

export default App
