 
import prisma from '../models/prismaClient.js'

export const createPost = async (req, res) => {
    const { title, content, thumbnail, status} = req.body;
    try {
        const post = await prisma.post.create({
            data:{
                title,
                content,
                thumbnail,
                status,
                authorId
            }
        })
        res.status(201).json(post)
        
    } catch (error) {
        res.status(500).json({ msg: "server error",error: error.msg})
    }
}

export const getPosts = async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
             include: { author: { select: { id: true, name: true, email:true}} }
        });
        res.status(201).json(posts);
    } catch (error) {
        res.status(500).json({ msg: "server error", err: error.msg })
    }
}

