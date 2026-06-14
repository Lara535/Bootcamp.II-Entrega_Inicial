const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com o Neon AWS
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } 
});

// Rota para BUSCAR todas as fanfics do banco
app.get('/api/fanfics', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM fanfics ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para SALVAR uma nova fanfic no banco
app.post('/api/fanfics', async (req, res) => {
  const { titulo, autor, plataforma, link } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO fanfics (titulo, autor, plataforma, link) VALUES ($1, $2, $3, $4) RETURNING *',
      [titulo, autor, plataforma, link]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/fanfics', async (req, res) => {
  try {
    await pool.query('DELETE FROM fanfics');
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
