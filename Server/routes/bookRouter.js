const express = require("express");
const bookSchema = require("../models/model")


const router = express.Router();

router.post("/", async(req,res)=>{
    const {name,author,publishYear} = req.body;
   try {
    if(!name || !author  || !publishYear ){
        return res.status(400).send({
            message:"All Fields Are Required"
        })
    };


    const newBook = {
        name : req.body.name,
        author:req.body.author,
        publishYear:req.body.publishYear
    };

    const book = await bookSchema.create(newBook);

    return res.status(201).send(book);
   } catch (error) {
    console.log(error);
    res.status(500).send({message:error.message})
   }
})

router.get("/",async(req,res)=>{
    try {
        const books = await bookSchema.find({});
        return res.status(200).send({
            count:books.length,
            data:books
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({message:error.message})
    }

})



router.get("/:id",async(req,res)=>{
    const id = req.params.id;
    try {
        const book = await bookSchema.findById(id);
        if(!book){
            return res.status(500).send({
                message:"Book Not found"
            })
        }else{
            console.log("Book Found");
            return res.status(200).send(book);
            
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({message:error.message})
    }
})

router.put("/:id",async(req,res)=>{
    const id = req.params.id;
try {
    const result = await bookSchema.findByIdAndUpdate(id,req.body);
    if(!result){
        return res.status(500).send({
            message:"Book Not found"
        })
    }else{
        console.log("Book Found and update");
        return res.status(200).send(result);
        
    }

} catch (error) {
    console.log(error);
        res.status(500).send({message:error.message})
}

})

router.delete("/:id",async(req,res)=>{
    const id = req.params.id;

    try {
        const result = await bookSchema.findByIdAndDelete(id);
        if(!result){
            return res.status(500).send({
                message:"Book Not found"
            })
        }else{
            console.log("Book Found and Deleted");
            return res.status(200).send(result);
            
        }
    

    } catch (error) {
        console.log(error);
        res.status(500).send({message:error.message})
    }
})


module.exports = router;
