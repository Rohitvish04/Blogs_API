import prisma from '../models/prismaClient.js';

//  Create Comment
export const createComment = async (req, res) => {
  const { content, postId, parentId } = req.body;

  if (!content || !postId) {
    return res.status(400).json({ message: "Content and postId are required" });
  }

  try {
    const comment = await prisma.comment.create({
      data: {
        authorId: req.user.id,
        postId: Number(postId),
        content: content.trim(),
        parentId: parentId ? Number(parentId) : null,
      },
    });
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

//  Get All Comments for a Post
export const getComments = async (req, res) => {
  try {
    const postId = Number(req.params.postId);
    const comments = await prisma.comment.findMany({
      where: { postId },
      include: { author: { select: { name: true } } },
    });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

//  Get Single Comment
export const getSingleComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const comment = await prisma.comment.findFirst({
      where: {
        id: Number(commentId),
        postId: Number(postId),
      },
      include: { author: { select: { name: true } } },
    });

    if (!comment) {
      return res.status(404).json({ message: "Comment not found for this post" });
    }
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

//  Update Comment
export const updateComment = async (req, res) => {
  try {
    const commentId = Number(req.params.id);
    const { content } = req.body;

    if (!content || content.trim() === "") {
      return res.status(400).json({ message: "Content cannot be empty" });
    }

    const comment = await prisma.comment.findUnique({ where: { id: commentId } });
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.authorId !== req.user.id) {
      return res.status(403).json({ message: "You are not authorized to update this comment" });
    }

    const updatedComment = await prisma.comment.update({
      where: { id: commentId },
      data: { content: content.trim() },
    });

    res.status(200).json({ message: "Comment updated successfully", comment: updatedComment });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

//  Delete Comment
export const deleteComment = async (req, res) => {
  try {
    const commentId = Number(req.params.id);

    const comment = await prisma.comment.findUnique({ where: { id: commentId } });
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.authorId !== req.user.id) {
      return res.status(403).json({ message: "You are not authorized to delete this comment" });
    }

    await prisma.comment.delete({ where: { id: commentId } });
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

//  Get Comments with Replies
export const getCommentsWithReplies = async (req, res) => {
  try {
    const postId = Number(req.params.postId);

    const comments = await prisma.comment.findMany({
      where: { postId, parentId: null },
      include: { replies: { include: { replies: true } } },
    });

    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
