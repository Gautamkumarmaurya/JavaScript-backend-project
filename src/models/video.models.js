import mongoose, { Schema } from "mongoose";

const videoSchema = new Schema({

    videoFile : {
        type : String,  // Cloudinary Url
        required : true,

    },
    thumbnail : {
        tyre : String,    // Cloudinary url
        required : true,

    },
    title : {
        type : String, // Cloudinary Url
        required : true
    },
    description : {
        type : String,
        required : true
    },
    duration : {
        type : Number,
        required : true
    },
    view : {
        type : Number,
        default : 0
    },
    isPublished : {
        type : Boolean,
        default : true
    },
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User"
    }



},
{
    timestamps : true
}
)

export const Video = mongoose.model("Video", videoSchema) 
