import express from 'express';
import {
    createBlog,
    myBlog,
    updateBlog,
    deleteBlog,
    getAllBlogs,
    getBlogById
} from '../controllers/blog.js'
import { isAuthenticated } from '../middlewares/auth.js';


const router = express.Router();

router.post('/new', isAuthenticated, createBlog);

router.get('/myblogs', isAuthenticated, myBlog);

router.get('/allblogs', getAllBlogs);

router.get('/blog/:id', isAuthenticated, getBlogById);

router.put('/:id', isAuthenticated, updateBlog);

router.delete('/:id', isAuthenticated, deleteBlog);






export default router