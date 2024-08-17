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

app.post("/", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const response = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-1106",
    });

    res.status(200).send({
      bot: response.data.choices[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

app.listen(3000, () =>
  console.log("Server is running on port http://localhost:3000")
);
