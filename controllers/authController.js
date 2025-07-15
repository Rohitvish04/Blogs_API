import bcrypt from 'bcryptjs';
import prisma from "../models/prismaClient.js";
import { generateToken } from '../utils/generateToken.js';

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await prisma.user.findUnique({
            where: {
                email
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
                password: hashPassword
            }
        });
        const token = generateToken(newUser);

        res.status(201).json({ user: { id: newUser.id, name: newUser.name, email: newUser.email }, token });
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
    res.json({ id: user.id, name: user.name, email: user.email})
}

 
