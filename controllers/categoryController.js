import prisma from "../models/prismaClient.js";

export const createCategory = async (req, res) => {
    const { name } = req.body;
    try {
        const category = await prisma.category.create({
            data: {
                name
            }
        });
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ msg: error.msg})
    }
};

export const getCategories = async (req, res) =>{
    try{
        const categories = await prisma.category.findMany();
        res.status(200).json(categories);
    }catch(err){
        res.status(500).json({msg: "server error", err: err.msg })
    }
};

