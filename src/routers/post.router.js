import express from 'express';
import { assignComment, removeComment, removeUser, assignUser, createPost, getPosts, getPostsAndSort, getPostById, updatePostById, deletePostById } from '../usecases/post.usecase.js';
import { CustomError } from '../libs/errorCustom.js'
import { isAuth } from '../middlewares/auth.middleware.js';

const router = express.Router()



router.get('/', async (request, response) => {

    try {

        const { title, content, date, user, comments } = request.query
    
        let filters = {}
    
        if(title) filters = {...filters, title}
    
        if(content) filters = {...filters, content}

        if(date) filters = {...filters, date}

        if(user) filters = {...filters, user}

        if(comments) filters = {...filters, comments}
    
        const postsFound = await getPosts(filters)

        if(!postsFound)
        throw new CustomError("Posts not found", 404)

        response.json({
            success: true,
            data: {
                posts: postsFound
            }
        })


    } catch (error) {
        response
        .status(error.status || 400)
        .json({
            success: false,
            message: 'Error at getting all posts'
        })
      
    }

})

router.get('/sortedPosts', async (request, response) => {

    try {

        const { title, content, date, user, comments } = request.query
    
        let filters = {}
    
        if(title) filters = {...filters, title}
    
        if(content) filters = {...filters, content}

        if(date) filters = {...filters, date}

        if(user) filters = {...filters, user}

        if(comments) filters = {...filters, comments}
    
        const postsFound = await getPostsAndSort(filters)

        if(!postsFound)
        throw new CustomError("Posts not found", 404)

        response.json({
            success: true,
            data: {
                posts: postsFound
            }
        })


    } catch (error) {
        response
        .status(error.status || 400)
        .json({
            success: false,
            message: 'Error at getting all posts'
        })
      
    }

})

router.get('/:id', async (request, response) => {
    try {
        
        const { id } = request.params

        const postFound = await getPostById(id);

        response.json({
            success: true,
            data: {
                posts: postFound
            }
        })

    } catch (error) {
        response
        .status(error.status || 400)
        .json({
            success: false,
            message: error.message
        })
    
    }
})

router.post('/', isAuth, async (request, response) => {
    try {
        
        const newPost = request.body

        const postCreated = await createPost(newPost);

        response.json({
            success: true,
            data: {
                cells: postCreated
            }
        })

    } catch (error) {
        response
        .status(error.status || 400)
        .json({
            success: false,
            message: 'Error at create post',
            extraInfo: error.message
        })
    
    }
})

router.patch('/:id', isAuth, async (request, response) => {
    try {
        
        const { id } = request.params
        const newPostData = request.body
        const postUpdated= await updatePostById(id, newPostData);

        response.json({
            success: true,
            data: {
                posts: postUpdated
            }
        })

    } catch (error) {
        response
        .status(error.status || 400)
        .json({
            success: false,
            message: 'Error at update post',
            extraInfo: error.message
        })
    
    }
})

router.delete('/:id', isAuth, async (request, response) => {
    try {
        
        const { id } = request.params

        const postDeleted= await deletePostById(id);

        response.json({
            success: true,
            data: {
                posts: postDeleted
            }
        })

    } catch (error) {
        response
        .status(error.status || 400)
        .json({
            success: false,
            message: 'Error at delete post',
            extraInfo: error.message
        })
    
    }
})

router.patch('/assignUser/:_id', isAuth, async (request, response) => {
    try {
        
        const  {_id} = request.params
        const { user } = request.body
       
        const postUpdated= await assignUser( _id,
          {
            $push: { user: user },
          }
        );
     

        response.json({
            success: true,
            data: {
                posts: postUpdated
            }
        })

    } catch (error) {
        response
        .status(error.status || 400)
        .json({
            success: false,
            message: 'Error at assign user',
            extraInfo: error.message
        })
    
    }
})


router.patch('/removeUser/:_id', isAuth, async (request, response) => {
    try {
        
        const  {_id} = request.params
        const { user } = request.body
       
        const postUpdated= await removeUser( _id,
          {
            $pull: { user: user },
          }
        );
     

        response.json({
            success: true,
            data: {
                posts: postUpdated
            }
        })

    } catch (error) {
        response
        .status(error.status || 400)
        .json({
            success: false,
            message: 'Error at remove user',
            extraInfo: error.message
        })
    
    }
})

router.patch('/assignComment/:_id', async (request, response) => {
    try {
        
        const  {_id} = request.params
        const {comment } = request.body
       
        const postUpdated= await assignComment( _id,
          {
            $push: { comments: comment },
          }
        );
     

        response.json({
            success: true,
            data: {
                posts: postUpdated
            }
        })

    } catch (error) {
        response
        .status(error.status || 400)
        .json({
            success: false,
            message: 'Error at assign comment',
            extraInfo: error.message
        })
    
    }
})

router.patch('/removeComment/:_id', async (request, response) => {
    try {
        
        const  {_id} = request.params
        const { comments } = request.body
       
        const postUpdated= await removeComment( _id,
          {
            $pull: { comments: comments },
          }
        );
     

        response.json({
            success: true,
            data: {
                posts: postUpdated
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