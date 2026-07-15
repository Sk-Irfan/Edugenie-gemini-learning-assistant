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
      "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.GEMINI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gemini-1.5-flash",
          messages: [
            { role: "user", content: userMessage }
          ]
        }),
      }
    );

    const data = await response.json();

    const reply =
      data.choices?.[0]?.message?.content ||
      JSON.stringify(data);

    res.json({ reply });

  } catch (error) {
    res.json({ reply: "Server Error" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
