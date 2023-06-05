const router=require('express').Router()
const cloudinary=require('../utils/cloudinary')
const upload=require('../utils/multer')
const Movies=require('../model/movies')
const multer = require('multer')

router.post('/', upload.single('image'),async(req,res)=>{
 try {
    const result=await cloudinary.uploader.upload(req.file.path)

    //Creating a movie
    let movies= new Movies({
        name:req.body.name,
        img:result.secure_url,
        summary:req.body.summary,
        cloudinary_id: result.public_id,
    })
    await movies.save()
    res.json(movies)
 } catch (error) {
    console.log(error)
 }
})

router.get('/',async(req,res)=>{
    try {
        let movies= await Movies.find()
        res.json(movies)
    } catch (error) {
        console.log(error);
    }
})

router.delete('/:id',async(req,res)=>{
    try {
        let movies= await Movies.findById(req.params.id)
        await cloudinary.uploader.destroy(movies.cloudinary_id)
        await movies.deleteOne()
        res.json(movies)
    } catch (error) {
        console.log(error)
    }
})

router.put('/:id',upload.single('image'),async(req,res)=>{
  try {
    let movies=await Movies.findById(req.params.id)
    await cloudinary.uploader.destroy(movies.cloudinary_id)
    const result=await cloudinary.uploader.upload(req.file.path);
    const data={
        name:req.body.name||movies.name,
        img:result.secure_url||movies.img,
        summary:req.body.summary||movies.summary,
    }
    movies= await Movies.findByIdAndUpdate(req.params.id,data,{new:true})
    res.json(movies)

  } catch (error) {
    console.log(error)
  }
})

module.exports=router