import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth/server'

type RequestMessage = {
  role: 'user' | 'model'
  content: string
}

type ChatRequest = {
  message?: string
  history?: RequestMessage[]
  scope?: string
}

const studyInstruction = `
You are NoteForge, a patient university study assistant. Explain ideas using the Feynman technique:
start with plain language, define technical terms immediately, use short concrete examples,
and avoid unexplained jargon. Help the student understand rather than simply memorize.
When a question is unclear, ask one focused clarifying question. Be accurate and say when
you do not have enough information. Format answers with short paragraphs, headings, and
bullets when useful. Do not claim to have read files unless their text is included in the prompt.
`

export async function POST(request: Request) {
  const { data: session } = await auth.getSession()
  if (!session?.user) {
    return NextResponse.json({ error: 'You must be signed in to use AI chat.' }, { status: 401 })
  }

  const body = (await request.json()) as ChatRequest
  const message = body.message?.trim()
  if (!message) {
    return NextResponse.json({ error: 'Message is required.' }, { status: 400 })
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Gemini is not configured. Add GEMINI_API_KEY to .env.local.' },
      { status: 503 },
    )
  }

  const history = (body.history ?? []).slice(-12).map((item) => ({
    role: item.role,
    parts: [{ text: item.content }],
  }))
  const scope = body.scope && body.scope !== 'All subjects'
    ? `The student is currently asking in the context of ${body.scope}.`
    : 'No specific subject was selected.'

  const response = await fetch(
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: `${studyInstruction}\n${scope}` }] },
        contents: [...history, { role: 'user', parts: [{ text: message }] }],
        generationConfig: {
          temperature: 0.35,
          maxOutputTokens: 1200,
        },
      }),
    },
  )

  if (!response.ok) {
    const errorBody = await response.text()
    console.error('Gemini request failed', response.status, errorBody)
    return NextResponse.json(
      { error: 'Gemini could not answer right now. Please try again.' },
      { status: 502 },
    )
  }

  const result = (await response.json()) as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>
  }
  const answer = result.candidates?.[0]?.content?.parts
    ?.map((part) => part.text ?? '')
    .join('')
    .trim()

  if (!answer) {
    return NextResponse.json({ error: 'Gemini returned an empty answer.' }, { status: 502 })
  }

  return NextResponse.json({ answer })
}
