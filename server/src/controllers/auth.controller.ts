import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const signup = async (req: Request, res: Response) => {
    try {
        const { email, password, name } = req.body;
        const exists = await prisma.user.findUnique({ where: { email } });
        if (exists) return res.status(400).json({ error: "User exists" });

        const hash = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { email, password: hash, name },
        });
        res.json({ message: "User created", userId: user.id });
    } catch (error) {
        res.status(500).json({ error: "Signup failed" });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password)))
            return res.status(401).json({ error: "Invalid credentials" });

        const token = jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_SECRET || "hack4delhi-secret-key-2024",
            { expiresIn: "24h" }
        );
        res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
    } catch (error) {
        res.status(500).json({ error: "Login failed" });
    }
};
