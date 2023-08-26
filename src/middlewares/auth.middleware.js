import jwt from '../libs/jwt.js'

const isAuth = (request, response, next)=>{
    try {
        
        const authorization = request.headers.authorization || ""
        
        const token = authorization.replace("Bearer ", "") 

        const isValidToken = jwt.verify(token);

        if(!isValidToken) throw new Error("Unauthorized")

        next()

    } catch (error){
        response
        .status(401) 
        .json({
            success: false,
            message: error.message
        })
    }
}

export { isAuth }