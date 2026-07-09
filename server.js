import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Resend } from 'resend';
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

// Inicializar Resend
const resend = new Resend(process.env.RESEND_API_KEY);
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID;

// Rota da API de inscrição
app.post('/api/subscribe', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'E-mail é obrigatório' });
  }

  // Verifica se as chaves existem no ambiente
  if (!process.env.RESEND_API_KEY || !process.env.RESEND_AUDIENCE_ID) {
    console.warn('Simulando inscrição pois as chaves do Resend não estão configuradas.');
    return res.status(200).json({ message: 'Simulado com sucesso' });
  }

  try {
    const payload = {
      email: email,
      unsubscribed: false,
    };
    
    // Se o usuário conseguiu achar o ID, a gente envia. Senão, vai pra default.
    if (AUDIENCE_ID) {
      payload.audienceId = AUDIENCE_ID;
    }

    const data = await resend.contacts.create(payload);

    return res.status(200).json({ message: 'Inscrito com sucesso', data });
  } catch (error) {
    console.error('Erro ao inscrever no Resend:', error);
    return res.status(500).json({ error: 'Erro interno ao processar a inscrição' });
  }
});

// Servir os arquivos estáticos do Vite em Produção
app.use(express.static(path.join(__dirname, 'dist')));

// Qualquer outra rota de fallback vai para o index.html do Vite
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
