const express=require("express")
const app=express()
const mongoose =require('mongoose')
const dotenv=require('dotenv')
dotenv.config();

//Connect DB

mongoose.connect(process.env.MONGO_URI,{
// useCreateIndex:true,
// UseNewUrlParser:true,
// useFindAndModify:true,
// useUnifiedTopology:true,
}).then(()=>console.log('mongoose is connected')).catch((err)=>console.log(err))

// Middleware
app.use(express.json())
app.use('/movies',require('./routes/movies'))

app.listen(5000,()=>{
    console.log('Server is running')
})