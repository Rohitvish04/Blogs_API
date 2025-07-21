import prisma from "../models/prismaClient.js";

export const isAdmin = async (req, res, next) => {
    try{
        const user = await prisma.user.findUnique({ 
            where: { 
                id: req.userId
            }
        });
        if(!user) return res.status(401).json({ message: "User not found"});

        if(user.role !== 'ADMIN'){
             return res.status(402).json({ message: 'Access denied - Admin only'});
        }
        next();
    }catch(err) {
        res.status(500).json({ message: 'server error', error: err.message });
    }
}