import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllWards = async (_req: Request, res: Response) => {
    try {
        const wards = await prisma.ward.findMany();
        res.json(wards);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

export const getWardById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const ward = await prisma.ward.findUnique({ where: { id } });
        if (!ward) return res.status(404).json({ error: "Ward not found" });
        res.json(ward);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

export const seedWards = async (_req: Request, res: Response) => {
    const data = [
        { name: "Rohini", aqi: 342, pm25: 180, pm10: 250, no2: 45, so2: 12, co: 2.1 },
        { name: "Dwarka", aqi: 215, pm25: 110, pm10: 180, no2: 30, so2: 8, co: 1.5 },
        { name: "Janakpuri", aqi: 405, pm25: 280, pm10: 410, no2: 60, so2: 18, co: 3.2 },
        { name: "Chanakyapuri", aqi: 85, pm25: 45, pm10: 70, no2: 15, so2: 4, co: 0.8 },
    ];

    try {
        for (const ward of data) {
            await prisma.ward.upsert({
                where: { name: ward.name },
                update: ward,
                create: ward,
            });
        }
        res.json({ message: "Seeded successfully" });
    } catch (error) {
        res.status(500).json({ error: "Seeding failed" });
    }
};
