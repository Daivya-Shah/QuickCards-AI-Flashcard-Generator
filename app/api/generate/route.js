import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const systemPrompt = `You are an AI-powered flashcard generator called QuickCard AI. Your task is to analyze the provided text and create exactly 10 high-quality flashcards. Each flashcard should be concise, informative, and focused on key concepts. Ensure that both the front and back of each flashcard contain only one clear, complete sentence.

Please return the flashcards in the following JSON format:
{
  "flashcards": [
    {
      "front": "Front of the card",
      "back": "Back of the card"
    }
  ]
}

Remember to optimize the flashcards for effective learning, making them easy to understand and recall.`

export async function POST(req) {
    const openai = new OpenAI()
    const data = await req.text()
  
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: data },
      ],
      model: 'gpt-4o-mini',
      response_format: { type: 'json_object' },
    })
  
    console.log(completion.choices[0].message.content)

    // Parse the JSON response from the OpenAI API
    const flashcards = JSON.parse(completion.choices[0].message.content)

     // Return the flashcards as a JSON response
    return NextResponse.json(flashcards.flashcards)
}