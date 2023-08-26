import { Post } from '../models/post.model.js';



// Use cases = handlers

const createPost = async (postData) => {


   return Post.create({...postData })
}

const getPosts = (filters = {}) => {
    return Post.find(filters)
}

const getPostsAndSort = (filters = {}) => {
    return Post.find(filters).sort( {date: -1} );
}

const getPostById = (id) => {
    return Post.findById(id).populate("comments")   
}

const updatePostById = (id, postData, options = {}) => {
    return Post.findByIdAndUpdate(id, postData, { new: true, ...options })
}

const deletePostById = (id) => {
    return Post.findByIdAndDelete(id)
}

const assignUser = (_id, user) => {
    return Post.findByIdAndUpdate( _id, user)    
}

const removeUser =  (_id, user) => {
    return Post.findByIdAndUpdate( _id, user)
}

const assignComment = (_id, comment) => {
    return Post.findByIdAndUpdate( _id, comment).populate("comments")    
}

const removeComment =  (_id, comment) => {
    return Post.findByIdAndUpdate( _id, comment)
}
export {
    createPost,
    getPosts,
    getPostsAndSort,
    getPostById,
    updatePostById,
    deletePostById,
    assignUser,
    removeUser,
    assignComment,
    removeComment
}