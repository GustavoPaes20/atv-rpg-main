const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Configuração do Firebase Admin
// Você precisa baixar este arquivo no Console do Firebase
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// 2. Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve os arquivos da pasta public

// 3. Rotas para as Consultas Mágicas
app.get('/api/criaturas', async (req, res) => {
    try {
        const snapshot = await db.collection('criaturas').limit(3).get();
        const results = snapshot.docs.map(doc => doc.data());
        res.json(results);
    } catch (error) {
        res.status(500).send("Erro ao buscar criaturas");
    }
});

app.get('/api/artefatos', async (req, res) => {
    try {
        const snapshot = await db.collection('artefatos_encantados').where('proprietario', '==', '').get();
        const results = snapshot.docs.map(doc => doc.data());
        res.json(results);
    } catch (error) {
        res.status(500).send("Erro ao buscar artefatos");
    }
});

app.get('/api/pocaoCura', async (req, res) => {
    try {
        const snapshot = await db.collection('poções').where('efeitos', '==', 'cura').get();
        res.json({ count: snapshot.size });
    } catch (error) {
        res.status(500).send("Erro ao contar poções");
    }
});

// 4. Iniciar o servidor
app.listen(PORT, () => {
    console.log(`🏰 O castelo está de pé em http://localhost:${PORT}`);
});