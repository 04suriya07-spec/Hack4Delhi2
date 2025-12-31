import dotenv from 'dotenv';
dotenv.config();

async function test() {
    console.log("Testing gemini-1.5-flash...");
    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.API_KEY}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: "Hello" }] }]
                })
            }
        );
        const data = await response.json();
        console.log("Status:", response.status);
        console.log("Data:", JSON.stringify(data).substring(0, 200));
    } catch (e) {
        console.error("Fetch Error:", e);
    }
}
test();
