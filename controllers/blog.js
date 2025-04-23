import e from 'express'
import { Blog } from '../Models/blogs.js'
import { userLogin } from './user.js';

// create blog
export const createBlog = async (req, res) => {

    const { title, description, imgUrl } = req.body;
    await Blog.create({
        title,
        description,
        imgUrl,
        user: req.user
    })
    res.status(201).json({
        success: true,
        message: "Blog Added Successfully"
    })
}

// myblogs

export const myBlog = async (req, res) => {
    const userid = req.user._id;
    const blogs = await Blog.find({ user: userid })

    res.status(200).json({
        success: true,
        blogs
    })
}

// update blog
export const updateBlog = async (req, res) => {
    const { title, description, imgUrl } = req.body;
    const id = req.params.id;

    const blog = await Blog.findById(id);

    if (!blog) return res.status(404).json({
        success: false,
        message: 'Invalid blog Id'
    })
    blog.title = title;
    blog.description = description;
    blog.imgUrl = imgUrl;
    blog.save();
    res.status(201).json({
        success: true,
        message: "updating blog",
        blog
    })
}

// delete blog
export const deleteBlog = async (req, res) => {
    const id = req.params.id;
    const blog = await Blog.findById(id);

    if (!blog) return res.status(404).json({
        success: false,
        message: 'Invalid blog Id'
    })
    await Blog.deleteOne();
    res.json({
        success: true,
        message:"blog deleted"
    })
}