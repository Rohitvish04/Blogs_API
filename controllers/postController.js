import prisma from '../models/prismaClient.js';
import cloudinary from "../utils/cloudinary.js";
import fs from "fs";


export const createPost = async (req, res) => {

    const { title, content, status, authorId, isPublished } = req.body;

    try {

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "blog-thumbnails",
        });
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        fs.unlinkSync(req.file.path);

        const post = await prisma.post.create({
            data: {
                authorId: Number(authorId),
                title,
                content,
                thumbnail: result.secure_url,
                status,
                isPublished: req.body.isPublished === 'true',
            },
        });

        res.status(201).json(post);
    } catch (error) {
        console.error("Create post error:", error);
        res.status(500).json({ msg: "Server error", error: error.message });
    }
};


export const getAllPosts = async (req, res) => {

    try {
        const posts = await prisma.post.findMany({
            include: { comments: true }
        })

        res.status(201).json(posts)
    } catch (error) {
        console.error("Create post error:", error);
        res.status(500).json({ msg: "Server error", error: error.message });
    }
}

export const getSinglePost = async (req, res) => {
    try {
        const postId = Number(req.params.id);

        const post = await prisma.post.findUnique({
            where: {
                id: postId
            },
            include: {
                comments: {
                    select: {
                        id: true,
                        content: true,
                    }
                },
                user: {
                    select: {
                        name: true,
                    }
                }
            }
        });

        if (!post) {
            return res.status(404).json({ msg: "Post not found" });
        }

        res.status(200).json(post);
    } catch (error) {
        console.error("Get single post error:", error);
        res.status(500).json({ msg: "Server error", error: error.message });
    }
};

export const updatePost = async (req, res) => {
    try {
        const postId = Number(req.params.id);
        const { title, content, thumbnail, status, isPublished } = req.body;
        const post = await prisma.post.update({
            where: {
                id: postId,
            },
            data: {
                title,
                thumbnail,
                content,
                status,
                isPublished,
            }
        })

        if (!post) return res.status(404).json({ message: 'post not found' });
        if (post.authorId !== req.userId) return res.status(403).json({ message: 'Not user authorized' })
        res.status(201).json(post)
    } catch (error) {
        console.error("update post error", error);
        res.status(500).json({ msg: " server error", error: error.message });
    }
}

export const deletePost = async (req, res) => {
    try {
        const postId = Number(req.params.id)
        const post = await prisma.post.delete({
            where: {
                id: postId,
            }
        });
        res.status(201).json({ msg: "successfully Deleted!", post })
    } catch (error) {
        console.error('post deleting error', error);
        res.status(500).json({ msg: "Server error", err: error.message });
    }
}