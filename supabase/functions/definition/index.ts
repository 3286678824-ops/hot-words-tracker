import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const MAX_LENGTH = 300

async function searchWiki(lang: string, word: string): Promise<string | null> {
  const url = `https://${lang}.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=1&explaintext=1&titles=${encodeURIComponent(word)}`
  const res = await fetch(url)
  const data = await res.json()
  const pages = data.query?.pages
  if (!pages) return null
  const page = Object.values(pages)[0] as Record<string, unknown>
  if (page.missing || page.extract == null || (page.extract as string).trim() === '') return null
  return page.extract as string
}

serve(async (req: Request) => {
  const url = new URL(req.url)
  const word = url.searchParams.get('word')

  if (!word) {
    return new Response(JSON.stringify({ error: 'Missing word parameter' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    let text = await searchWiki('zh', word)
    if (!text) text = await searchWiki('en', word)

    if (!text) {
      return new Response(JSON.stringify({ definition: null }), {
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const summary = text.slice(0, MAX_LENGTH).trim()
    const definition = summary.length < text.length ? summary + '...' : summary

    return new Response(JSON.stringify({ definition }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch {
    return new Response(JSON.stringify({ definition: null }), {
      headers: { 'Content-Type': 'application/json' },
    })
  }
})
