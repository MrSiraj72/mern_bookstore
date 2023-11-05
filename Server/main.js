const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const expressSession = require("express-session")
const bookRoute = require("./routes/bookRouter.js");
const passport = require("passport");
const app = express();



// app.use(expressSession({
//      resave:false,
//      saveUninitialized:false,
//      secret:"Hello Siraj"
// }))

// app.use(passport.initialize());
// app.use(passport.session());
// passport.serializeUser(bookRoute.serializeUser());
// passport.deserializeUser(bookRoute.deserializeUser());


app.use(express.json());
app.use(cors());
app.use("/books",bookRoute);



mongoose.connect("mongodb+srv://book:book@cluster0.0hmah18.mongodb.net/?retryWrites=true&w=majority").then(()=>{
    console.log("Connection Success");
}).catch((err)=>{
    console.log(err);
})



// app.get("/books",(req,res)=>{
//     res.send("Hello")
// })

app.listen(5555);