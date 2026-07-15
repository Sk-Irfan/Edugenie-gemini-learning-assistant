const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/ask", async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                contents: [
                    {
                        parts: [{ text: userMessage }]
                    }
                ]
            }
        );

        const reply =
            response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
            "No response from AI.";

        res.json({ reply });

    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ reply: "Error generating response." });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
