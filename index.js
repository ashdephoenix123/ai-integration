import "dotenv/config";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// const models = await client.models.list();
// for (const i of models.data) {
//   console.log(i.id);
// }

const response = await client.responses.create({
  model: "gpt-4.1-mini-2025-04-14",
  input: "Write a one-sentence bedtime story about a unicorn.",
});

console.log(response.output_text);
