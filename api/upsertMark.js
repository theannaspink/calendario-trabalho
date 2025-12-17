const { createClient } = require('@supabase/supabase-js')

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_KEY env vars')
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

module.exports = async (req, res) => {
  try {
    if (req.method !== 'POST') return res.status(405).end()
    const { user_id, date, status } = req.body || {}
    if (!date) return res.status(400).json({ error: 'date is required' })

    // If status is false, delete the mark
    if (status === false) {
      const { error } = await supabase.from('workmarks').delete().eq('user_id', user_id).eq('date', date)
      if (error) return res.status(500).json({ error: error.message })
      return res.status(200).json({ ok: true })
    }

    // Try to find existing
    const { data: existing } = await supabase.from('workmarks').select('id').eq('user_id', user_id).eq('date', date).limit(1).maybeSingle()

    if (existing) {
      const { error } = await supabase.from('workmarks').update({ status: true }).eq('id', existing.id)
      if (error) return res.status(500).json({ error: error.message })
      return res.status(200).json({ ok: true })
    }

    const { data, error } = await supabase.from('workmarks').insert([{ user_id, date, status: true }]).select().single()
    if (error) return res.status(500).json({ error: error.message })
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
