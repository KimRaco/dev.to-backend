import { Comment } from '../models/comments.model.js';




// Use cases = handlers

const createComment = async (commentData) => {


    return  Comment.create({...commentData })

   

}

const getComments = (filters = {}) => {
    return Comment.find(filters)
}

const getCommentById = (id) => {
    return Comment.findById(id)
}

const updateCommentById = (id, commentData, options = {}) => {
    return Comment.findByIdAndUpdate(id, commentData, { new: true, ...options })
}

const deleteCommentById = (id) => {
    return Comment.findByIdAndDelete(id)
}




export {
    createComment,
    getComments,
    getCommentById,
    updateCommentById,
    deleteCommentById
}