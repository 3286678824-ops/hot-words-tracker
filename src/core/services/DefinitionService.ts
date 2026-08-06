const MAX_LENGTH = 300
const SUPABASE_FUNCTION_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/definition`

async function searchWiki(lang: string, word: string): Promise<string | null> {
  const url = `https://${lang}.wikipedia.org/w/api.php?origin=*&action=query&format=json&prop=extracts&exintro=1&explaintext=1&titles=${encodeURIComponent(word)}`
  const res = await fetch(url)
  const data = await res.json()
  const pages = data.query?.pages
  if (!pages) return null
  const page = Object.values(pages)[0] as Record<string, unknown>
  if (page.missing || page.extract == null || (page.extract as string).trim() === '') return null
  return page.extract as string
}

function trimSummary(text: string): string {
  const summary = text.slice(0, MAX_LENGTH).trim()
  return summary.length < text.length ? summary + '...' : summary
}

export async function fetchDefinition(word: string): Promise<string | null> {
  try {
    const res = await fetch(`${SUPABASE_FUNCTION_URL}?word=${encodeURIComponent(word)}`, {
      headers: { Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}` },
    })
    if (res.ok) {
      const data = await res.json()
      return data.definition ?? null
    }
  } catch {
    // Supabase function not available, fall back to direct Wikipedia (dev mode)
  }

  try {
    let text = await searchWiki('zh', word)
    if (!text) text = await searchWiki('en', word)
    if (!text) return null
    return trimSummary(text)
  } catch {
    return null
  }
}
