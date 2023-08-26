import express from 'express';
import { createComment, getComments, getCommentById, updateCommentById, deleteCommentById } from '../usecases/comment.usecase.js';
import { CustomError } from '../libs/errorCustom.js'


const router = express.Router()



router.get('/', async (request, response) => {

    try {

        const {  content, user } = request.query
    
        let filters = {}
    
        if(content) filters = {...filters, content}

        if(user) filters = {...filters, user}
    
        const commentsFound = await getComments(filters)

        if(!commentsFound)
        throw new CustomError("Comments not found", 404)

        response.json({
            success: true,
            data: {
                comments: commentsFound
            }
        })


    } catch (error) {
        response
        .status(error.status || 400)
        .json({
            success: false,
            message: 'Error at getting all comments'
        })
       
    }

})

router.get('/:id', async (request, response) => {
    try {
        
        const { id } = request.params

        const commentFound = await getCommentById(id);

        response.json({
            success: true,
            data: {
            comments:commentFound
            }
        })

    } catch (error) {
        response
        .status(error.status || 400)
        .json({
            success: false,
            message: 'Error at get comment by id'
        })
    
    }
})

router.post('/', async (request, response) => {
    try {
        
        const newComment = request.body

        const commentCreated = await createComment( newComment);

        response.json({
            success: true,
            data: {
                cells: commentCreated
            }
        })

    } catch (error) {
        response
        .status(error.status || 400)
        .json({
            success: false,
            message: 'Error at create comment',
            extraInfo: error.message
        })
    
    }
})

router.patch('/:id', async (request, response) => {
    try {
        
        const { id } = request.params
        const newCommentData = request.body
        const commentUpdated= await updateCommentById(id, newCommentData);

        response.json({
            success: true,
            data: {
                comments: commentUpdated
            }
        })

    } catch (error) {
        response
        .status(error.status || 400)
        .json({
            success: false,
            message: 'Error at update comment',
            extraInfo: error.message
        })
    
    }
})

router.delete('/:id', async (request, response) => {
    try {
        
        const { id } = request.params

        const commentDeleted= await deleteCommentById(id);

        response.json({
            success: true,
            data: {
                comments: commentDeleted
            }
        })

    } catch (error) {
        response
        .status(error.status || 400)
        .json({
            success: false,
            message: 'Error at delete comment',
            extraInfo: error.message
        })
    
    }
})





export default router