import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Configurar middlewares
app.use(cors());
app.use(express.json());

// Inicializar Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

// Rota da API de inscrição
app.post('/api/subscribe', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'E-mail é obrigatório' });
  }

  // Verifica se as chaves existem no ambiente
  if (!supabase) {
    console.warn('Simulando inscrição pois as chaves do Supabase não estão configuradas.');
    return res.status(200).json({ message: 'Simulado com sucesso' });
  }

  try {
    // Insere o e-mail na tabela 'subscribers'
    const { data, error } = await supabase
      .from('subscribers')
      .insert([{ email: email }])
      .select();

    if (error) {
      throw error;
    }

    return res.status(200).json({ message: 'Inscrito com sucesso', data });
  } catch (error) {
    console.error('Erro ao inscrever no Supabase:', error);
    // Se o e-mail já existir e a coluna for UNIQUE, o erro 23505 será retornado pelo Postgres
    if (error.code === '23505') {
       return res.status(400).json({ error: 'E-mail já está cadastrado.' });
    }
    return res.status(500).json({ error: 'Erro interno ao processar a inscrição' });
  }
});

// Servir os arquivos estáticos do Vite em Produção
app.use(express.static(path.join(__dirname, 'dist')));

// Qualquer outra rota de fallback vai para o index.html do Vite
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
