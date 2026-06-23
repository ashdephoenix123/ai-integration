import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const getCurrentWeather = (city) => {
    // Simulating fetching weather data for the city
    return `The current weather in ${city} is sunny with a temperature of 25 degrees Celsius.`;
}

const tools = [{
    type: 'function',
    name: 'get_current_weather',
    description: 'Get the current weather of a city.',
    parameters: {
        type: 'object',
        properties: {
            city: {
                type: 'string',
                description: 'The city to get the current weather of, e.g. San Francisco.'
            }
        },
        required: ['city']
    }
}]

const response = await openai.responses.create({
    model: 'gpt-5.5',
    input: 'Get the current weather in Siliguri, West Bengal, India.',
    tools
})

const output = response.output[0];
const args = JSON.parse(output.arguments);

const weatherInfo = getCurrentWeather(args.city);

const finalResponse = await openai.responses.create({
    model: 'gpt-5.5',
    previous_response_id: response.id,
    input: [
        {
            type: 'function_call_output',
            call_id: output.call_id,
            output: JSON.stringify(weatherInfo)
        }
    ]
})

console.log(finalResponse.output_text)