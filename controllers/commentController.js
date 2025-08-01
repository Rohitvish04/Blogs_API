import prisma from '../models/prismaClient.js'

export const createComment = async (req, res) => {
    const { content, postId, authorId } = req.body
    try {
        const comment = await prisma.comment.create({
            data: {
                 authorId: Number(authorId),
                 postId: Number(postId),
                 content,
            },
        });
        res.status(201).json(comment);
    } catch (err) {
        res.status(500).json({ message: "server error", error: err.message });
    }
};

export const getcomment = async (req, res) => {
    try {
    const comment = await prisma.comment.findMany();
    res.status(200).json(comment);
    } catch (err) {
        res.status(500).json({ message: "server error", error: err.message });
    }
};

export const updateComment = async (req, res) => {
    try{
        const commentId = Number(req.params.id);
        const { content} = req.body
        const comment = await prisma.comment.update({
            where: {
                id: commentId
            },
            data: {
                content,
            }
        });

        
        res.status(200).json({ msg: "comment updated successfully!",comment})
    }catch (err){
        res.status(500).json({ message: "server error", error: err.message });
    }
};


export const deleteComment = async (req, res) => {
    try {
        const commentId = Number(req.params.id)
        const comment = await prisma.comment.delete({
            where: {
                id: commentId,
            }
        })
        res.status(201).json({msg: "deleted Succesully!", comment});
    } catch (err) {
        console.log("error deleted comment",err)
        res.status(500).json({ msg: "server error", error: err.msg });
    }
};
