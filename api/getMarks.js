const { createClient } = require('@supabase/supabase-js')

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_KEY env vars')
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

module.exports = async (req, res) => {
  try {
    const userId = req.query.userId || null
    let q = supabase.from('workmarks').select('id,user_id,date,status,created_at').order('date', { ascending: true })
    if (userId) q = q.eq('user_id', userId)
    const { data, error } = await q
    if (error) {
      res.status(500).json({ error: error.message })
      return
    }
    res.setHeader('Content-Type', 'application/json')
    res.status(200).json(data || [])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
