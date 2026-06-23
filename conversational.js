// import "dotenv/config";
// import OpenAI from "openai";

// const client = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// })

// let history = [
//     {
//         role: "user",
//         content: "tell me a joke",
//     },
// ];
    
// const response = await client.responses.create({
//     model: "gpt-5.5",
//     input: history,
//     store: true,
// });

// console.log(response.output_text);

// // Add all response output items, including reasoning items, to the history
// history = [...history, ...response.output];

// history.push({
//     role: "user",
//     content: "tell me another",
// });

// const secondResponse = await client.responses.create({
//     model: "gpt-5.5",
//     input: history,
//     store: true,
// });

// console.log(secondResponse.output_text);

// console.log(history);


import "dotenv/config";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

const response = await openai.responses.create({
    model: "gpt-5.5",
    input: "tell me a joke other than scarecrows and skeletons and eggs.",
    store: true,
});

console.log(response.output_text);

const secondResponse = await openai.responses.create({
    model: "gpt-5.5",
    previous_response_id: response.id,
    input: [{"role": "user", "content": "explain why this is funny."}],
    store: true,
});

console.log(secondResponse.output_text);

