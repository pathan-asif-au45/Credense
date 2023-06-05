const mongoose=require('mongoose')
const moviesSchema=new mongoose.Schema({
    name:{
        type:String,
    },

    img:{
        type:String,
    },
    summary:{
        type:String,
    },
    cloudinary_id:{
        type: String,
    }
})

module.exports=mongoose.model('Movies',moviesSchema)