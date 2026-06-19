import 'dotenv/config';
import OpenAI from 'openai';
import {z} from 'zod';
import {zodTextFormat} from 'openai/helpers/zod'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

// const CalendarEvent = z.object({
//     name: z.string(),
//     day: z.string(),
//     participants: z.array(z.string())
// })

// const response = await openai.responses.parse({
//     model: 'gpt-5.5',
//     input: 'Alice and Bob are going to a science fair on Friday.',
//     instructions: 'Extract the event name, day, and participants from the input text and return it in a structured JSON format.',
//     text: {
//         format: zodTextFormat(CalendarEvent, "event")
//     }
// })

// const test = response.output_parsed
// console.log(test)

// const response = await openai.responses.create({
//     model: 'gpt-5.5',
//     input:[
//         {
//             role: 'developer',
//             content: "You are a helpful math tutor, guide the user step by step to solve the problem."
//         },
//         {
//             role: 'user',
//             content: "What is the result of 4x + 10 = 10x - 20?"
//         }
//     ]
// })

// console.log(response.output_text)

// const Step = z.object({
//     explaination: z.string(),
//     output: z.string()
// })

// const AnswerSchema = z.object({
//     steps: z.array(Step),
//     answer: z.string()
// })

// const response = await openai.responses.parse({
//     model: 'gpt-5.5',
//     input:[
//         {
//             role: 'developer',
//             content: "You are a helpful math tutor, guide the user step by step to solve the problem."
//         },
//         {
//             role: 'user',
//             content: "What is the result of 4x + 10 = 10x - 20?"
//         }
//     ],
//     max_output_tokens: 50,
//     text: {
//         format: zodTextFormat(AnswerSchema, 'answer')
//     }
// })

// const ans = response.output_parsed;
// console.log(ans)


const EntitiesSchema = z.object({
  attributes: z.array(z.string()),
  colors: z.array(z.string()),
  animals: z.array(z.string()),
});

const stream = openai.responses
  .stream({
    model: "gpt-5.5",
    input: [
      { role: "user", content: "What's the weather like in Paris today?" },
    ],
    text: {
      format: zodTextFormat(EntitiesSchema, "entities"),
    },
  })
  .on("response.refusal.delta", (event) => {
    process.stdout.write(event.delta);
  })
  .on("response.output_text.delta", (event) => {
    process.stdout.write(event.delta);
  })
  .on("response.output_text.done", () => {
    process.stdout.write("\n");
  })
  .on("response.error", (event) => {
    console.error(event.error);
  });

const result = await stream.finalResponse();

console.log(result);