import prisma from '../models/prismaClient.js'

export const createPost = async (req, res) => {
     const { title, content, thumbnail, status, authorId, publishedAt  } = req.body;
     try {
        const post = await prisma.post.create({
            data: {
                authorId: Number(authorId),
                title,
                content,
                thumbnail,
                status,
                publishedAt,
            }
        });
        res.status(201).json(post);
     } catch (error) {
        console.error("Create post error:", error);
        res.status(500).json({ msg: "Server error", error: error.msg });
     }
      
};


export const getAllPosts = async (req, res) => {
     
    try {
        const posts = await prisma.post.findMany()
        res.status(201).json(posts)
    } catch (error) {
        console.error("Create post error:", error);
        res.status(500).json({ msg: "Server error", error: error.msg });
    }
}

export const getSinglePost = async (req, res) => {
    try {
        const postId = Number(req.params.id);  

        const post = await prisma.post.findUnique({
            where: {
                id: postId
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
         const { title, content, thumbnail, status, publishedAt  } = req.body;
        const post = await prisma.post.update({
            where: {
                id: postId,
            },
            data: {
                title,
                thumbnail,
                content,
                status,
                publishedAt,
            }
        })
        res.status(201).json(post)
    } catch (error) {
        console.error("update post error", error);
        res.status(500).json({ msg: " server error", error: error.msg });
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
        res.status(201).json({ msg:"successfully Deleted!",post})
    } catch (error) {
        console.error('post deleting error', error);
        res.status(500).json({ msg: "Server error", err: error.msg });
    }
}