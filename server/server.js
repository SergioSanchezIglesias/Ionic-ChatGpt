import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import Configuration from "openai";
import OpenAIApi from "openai";

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPEN_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send({ message: "Hello World" });
});

const conversationHistory = {};

app.post("/", async (req, res) => {
  try {
    const userId = 1234;
    const prompt = req.body.prompt;

    if (!conversationHistory[userId]) {
      conversationHistory[userId] = [];
    }
    conversationHistory[userId].push({ role: "user", content: prompt });

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: conversationHistory[userId],
    });

    const botMessage = response.choices[0].message.content;
    conversationHistory[userId].push({
      role: "assistant",
      content: botMessage,
    });

    res.status(200).send({
      bot: botMessage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

app.listen(3000, () =>
  console.log("Server is running on port http://localhost:3000")
);
