const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/ask", async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [{ text: userMessage }],
                        },
                    ],
                }),
            }
        );

        const data = await response.json();
        console.log("FULL GEMINI RESPONSE:",
        JSON.stringify(data));
        
        const reply =
            data.candidates?.[0]?.content?.parts?.[0]?.text ||
            "No response from AI.";

        res.json({ reply });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ reply: "Error generating response." });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
