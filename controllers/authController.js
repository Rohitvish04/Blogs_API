import bcrypt from 'bcryptjs';
import prisma from "../models/prismaClient.js";
import { generateToken } from '../utils/generateToken.js';
import cloudinary from '../utils/cloudinary.js';


export const register = async (req, res) => {
    try {
        const { name, email,role, password } = req.body;

        const existingUser = await prisma.user.findUnique({
            where: {
                email: email,
            },
        })

        if (existingUser) {
            return res.status(409).json({ error: "User already with this email" });
        }

        if (!name || !email || !password) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                role,
                password: hashPassword
            }
        });
        const token = generateToken(newUser);

        res.status(201).json({ user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role }, token });
    } catch (error) {
        console.error("Create user error:", error);
        res.status(500).json({ msg: "Server error", error: error.msg });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (!user) return res.status(401).json({ msg: "User not found!" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ msg: "Password invalid" });

        const token = generateToken(user.id);
        res.json({ user: { id: user.id, name: user.name, email: user.email },token });
    } catch (error) {
        console.error("Login server error");
        res.status(500).json({ msg: "server error login", error: error.msg });
    }
}

export const getProfile = async (req, res) => {
    const user = await prisma.user.findUnique({ where: { id: req.userId}});
    res.json({ id: user.id, name: user.name, email: user.email, role: user.role })
}

 
export const updateProfile = async (req, res) => {
    try {
        const { name, gender } = req.body;
        const userId = req.userId;
         

        // Check user exists
        const existingUser = await prisma.user.findUnique({
            where: { id: userId }

        if (!existingUser) {
            return res.status(404).json({msg: "User not Found"});

        let avatarUrl;


        // If avatar upload as file
            
        // If avatar is uploaded as a file (e.g., via multer middleware)
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'avatars',
                width: 300,
                crop: 'scale'
            });
        
            avatarUrl = result.secure_url;
        }
            //IF avatar sent as URL
            if(avatar && !req.file) {
                avatarUrl = avatar;
            }
        // } else if (req.body.avatar) {
        //     // If avatar is a direct URL string
        //     avatarUrl = req.body.avatar;
        // } else {
        //     // Default avatar
        //     avatarUrl = "https://images.unsplash.com/photo-1757573913927-0f6a58fb0f49?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
        // }

            const normalizeGender = (gender) => {
                if (!gender) return undefined;
                return gender.toUpperCase();
            };

            //Build update object dynamically
            const updateData = {
                ...(name && { name }),
                ...(gender && { gender }),
                ...(avatarUrl && { avatar: avatarUrl })
            };
            
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: updateData,
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                gender: true,
                avatar: true
            }
        });

        res.json({ user: updatedUser });
    } catch (error) {
        console.error("Update profile error:", error);
        res.status(500).json({ msg: "Server error", error: error.message });
    }
}
