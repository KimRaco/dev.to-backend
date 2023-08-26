import express from  'express';
import routerUsers from './routers/user.router.js';
import routerPosts from './routers/post.router.js'
import routerComments from './routers/comment.router.js'
import cors from 'cors'
import routerAuth from './routers/auth.router.js';

const server = express();

// Middleware
server.use(express.json());
server.use(cors());

// Routers
server.get('/', (req, res) => res.json('Dev.to clon server'));
server.use('/login', routerAuth)
server.use('/users', routerUsers);
server.use('/posts', routerPosts);
//server.use('/sortedPosts', routerPosts);
server.use('/comments', routerComments);


export { server }