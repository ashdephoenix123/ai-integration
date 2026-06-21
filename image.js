import 'dotenv/config';
import OpenAI from 'openai';
import fs from 'fs';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// generate image
// const response = await openai.responses.create({
//     model: "gpt-5.5",
//     input: 'generate a hyper realistic image of a futuristic city skyline at sunset with flying cars and neon lights',
//     tools: [{type: 'image_generation'}]
// })

// const imageData = response.output
//   .filter((output) => output.type === "image_generation_call")
//   .map((output) => output.result);

// let count = 0;
// while (count < imageData.length) {
//   const imageBase64 = imageData[count];
//   const fs = await import("fs");
//   fs.writeFileSync(`image_${count}.png`, Buffer.from(imageBase64, "base64"));
//   count++;
// }


// giving file as input

const createFileID = async (filePath) => {
  const filedata = fs.createReadStream(filePath);
  const res = await openai.files.create({
    file: filedata,
    purpose: 'vision'
  })
  return res.id;
}

const fileID = await createFileID('./image_0.png');

const response = await openai.responses.create({
  model: "gpt-5.5",
  input: [
    {
      role: 'user',
      content: [
        { type: 'input_text', text: "What is in this image?" },
        { type: 'input_image', file_id: fileID}
      ]
    }
  ]
})

console.log(response.output_text)