import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const postSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 100

    },
    content: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 2000
    },
    tags: {
        type: [{
            type: String,
            minLength: 1,
            maxLength: 20,
            trim: true,
            required: true
        }],
        minLength: 1,
        maxLength: 4
    },
    date: {
        type : Date, 
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    comments: [{
        type:Schema.Types.ObjectId,
        ref: 'comments'

       
    }]
})

const Post = mongoose.model('posts', postSchema)

export { Post }