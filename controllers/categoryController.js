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
        console.error("create category",error)
        res.status(500).json({ msg: error.msg})
    }
};

export const getCategory = async (req, res) =>{
    try{
        const categories = await prisma.category.findMany();
        res.status(200).json(categories);
    }catch(err){
        res.status(500).json({msg: "server error", err: err.msg })
    }
};

export const updateCategory = async (req, res) => {
    const { name } = req.body
    try {

        const categories = await prisma.category.update({
            where: {
                id: Number(req.params.id)
            },
            data:{
                name,
            }
        });
        res.status(201).json(categories);
    } catch (err) {
        res.status(500).json({ message: "server error", error: err.message});
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const category = await prisma.category.delete({
            where: {
                id: Number(req.params.id),
            }
        });
        res.status(201).json({ message: 'Category Deleted Successfully!',category});
    } catch (err) {
        res.status(500).json({ message: "server error", error: err.message });
    }
}

