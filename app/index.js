import 'dotenv/config'
import express from 'express'
import { createClient } from '@supabase/supabase-js'

const app = express()

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
)

app.get('/produtos', async (req, res) => {
    const { data, error } = await supabase
        .from('produtos')
        .select('*')

    if (error) {
        return res.status(500).json({ error: error.message })
    }

    res.json(data)
})

app.get('/health', (req, res) => {
    res.status(200).json({ 
	status: 'ok',
	version: 'v2'
    })
})

app.get('/env', (req, res) => {
    res.json({
        environment: process.env.APP_ENV
    })
})

app.listen(3000, '0.0.0.0', () => {
    console.log('API rodando na porta 3000')
})


