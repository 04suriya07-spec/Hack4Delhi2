import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../middleware/auth.middleware";

const prisma = new PrismaClient();

export const createReport = async (req: AuthRequest, res: Response) => {
    try {
        const { category, description, location } = req.body;
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ error: "User ID missing" });

        const report = await prisma.report.create({
            data: { userId, category, description, location },
        });
        res.status(201).json(report);
    } catch (error) {
        res.status(500).json({ error: "Failed to create report" });
    }
};

export const getMyReports = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ error: "User ID missing" });

        const reports = await prisma.report.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
        });
        res.json(reports);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};
