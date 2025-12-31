import { Request, Response } from "express";

export const getHealthAdvice = async (req: Request, res: Response) => {
    try {
        const { aqi, wardName, pollutionLevel } = req.body;

        if (!process.env.API_KEY) {
            return res.status(500).json({ error: "AI API Key missing" });
        }

        const fetchAdvice = async (model: string) => {
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.API_KEY}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: `Provide 3 specific health and action recommendations for residents of ${wardName} ward in Delhi, where the AQI is currently ${aqi} (${pollutionLevel}). Keep it brief, professional, and Apple-style premium. Do not use markdown symbols like * or #.`
                            }]
                        }]
                    })
                }
            );
            return response;
        }

        // Try Primary Model
        let response = await fetchAdvice('gemini-2.0-flash');

        // Fallback to 1.5-flash if 2.0 fails (e.g. 404 or 429)
        if (!response.ok) {
            console.warn(`Gemini 2.0 failed (${response.status}), trying 1.5-flash...`);
            response = await fetchAdvice('gemini-1.5-flash');
        }

        const data = await response.json();

        if (!response.ok) {
            console.error("Gemini API Error (Final):", JSON.stringify(data));
            // Return fallback advice instead of error to keep UI smooth
            return res.json({
                advice: `Monitor local air quality updates. Current AQI is ${aqi}. Sensitive groups should limit outdoor exposure. Ensure indoor air circulation is filtered.`
            });
        }

        const advice = data.candidates?.[0]?.content?.parts?.[0]?.text ||
            "Prioritize N95 protection and high-efficiency indoor air purification.";

        res.json({ advice });

    } catch (error) {
        console.error("AI Controller Error:", error);
        res.status(500).json({ error: "Failed to generate AI advice" });
    }
};
