import 'dotenv/config'
import express from 'express'
import { createClient } from '@supabase/supabase-js'
import pg from 'pg'

const { Pool } = pg

const app = express()

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
)

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

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

app.get('/produtos-local', async (req, res) => {
    try {
        const resultado = await pool.query(
            'SELECT * FROM produtos ORDER BY id'
        )

        res.json(resultado.rows)
    } catch (error) {
	  console.error('ERRO POSTGRES:', error)

        res.status(500).json({
            error: error.message
        })
    }
})
