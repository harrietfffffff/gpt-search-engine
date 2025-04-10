import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { OpenAI } from "openai";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const cors = require("cors");
app.use(cors());
npm install cors


app.use(cors());
app.use(bodyParser.json());

app.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;

    const chat = await openai.chat.completions.create({
      messages: [{ role: "user", content: question }],
      model: "gpt-3.5-turbo",
    });

    const answer = chat.choices[0]?.message?.content || "No answer.";
    res.json({ answer });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
