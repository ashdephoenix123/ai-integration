import "dotenv/config";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

//  Supported values of type are: 'input_text', 'input_image', 'output_text', 'refusal', 'input_file', 'computer_screenshot', and 'summary_text'.",

// const response = await client.responses.create({
//   model: 'gpt-4.1-mini',
//   input: [
//     {
//       role: 'user',
//       content: [
//         {
//           type: 'input_text',
//           text: "summarize the pdf?"
//         },
//         {
//           type: 'input_file',
//           file_url: 'https://akashsarki.vercel.app/resume-18-dec-2025.pdf'
//         }
//       ]
//     }
//   ],
//   stream: true
// })

// for await(const responseEvent of response) {
//   if(responseEvent.type === 'response.output_text.delta') {
//     process.stdout.write(responseEvent.delta)
//   }
// }

// const stream = await client.responses.create({
//     model: "gpt-5.5",
//     input: "summarize the movie obsession which was released recently.",
//     tools: [
//       {
//         type: 'web_search'
//       }
//     ],
//     stream: true,
// });

// for await (const event of stream) {
//   if (event.type === "response.output_text.delta") {
//     process.stdout.write(event.delta);
//   }
// }

// const response = await client.responses.create({
//   model: "gpt-4.1-mini",
//   input: "I need to solve the equation 3x + 11 = 14. Can you help me?",
//   instructions: "You are a personal math tutor. When asked a math question, write and run code to answer the question.",
//   tools: [
//     {
//       type: 'code_interpreter',
//       container: {type: 'auto'}
//     }
//   ]
// })

// array of objects in content
// const response = await client.responses.create({
//   model: "gpt-4.1-mini",
//   input: [
//     {
//       role: 'user',
//       content: [
//         {
//           type: 'input_text',
//           text: "What is in the image?"
//         },
//         {
//           type: 'input_image',
//           image_url: "https://images.unsplash.com/photo-1551632811-561732d1e306?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW91bnRhaW4lMjBoaWtlfGVufDB8fDB8fHww"
//         }
//       ]
//     }
//   ]
// })

// an array of objects in input
// const response = await client.responses.create({
//   model: "gpt-4.1-mini",
//   input: [
//     {
//       role: 'user',
//       content: "Tell me old school joke!"
//     }
//   ]
// })

// Just a string in input
// const response = await client.responses.create({
//   model: "gpt-4.1-mini",
//   input: "Are semi colons optional in Javascript?",
//   instructions: 'talk like a pirate while answering the question.',
// })

// const response = await client.responses.create({
//   model: "gpt-4.1-mini",
//   input: [
//     {
//       role: 'developer',
//       content: "Talk like a pirate while answering."
//     },
//     {
//       role: 'user',
//       content: "Are semi colons optional in Javascript?"
//     }
//   ],
// })

// const response = await client.responses.create({
//   model: "gpt-5-mini",
//   input: [
//     { role: 'user', content: "knock knock?" },
//     { role: 'assistant',  content: "Who's there?" },
//     { role: 'user', content: "Hawaii." },
//     { role: 'assistant', content: "Hawaii who?" },
//     { role: 'user', content: "I'm good. Hawaii you?" }
//   ]
// })

// console.log(response.output_text)

const response = await client.responses.create({
  model: 'gpt-5.5',
  input: [
    {
      role: 'user',
      content: "What is the weather today in delhi, india?"
    }
  ],
  tools: [{type: 'web_search'}]
})

console.log(response.output_text)
