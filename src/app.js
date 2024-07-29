const express = require('express');
const { createHandler } = require('graphql-http/lib/use/express');
const schema = require('./schema');
const cors = require('cors');

// Inizializza Express
const app = express();

// Middleware per loggare le richieste
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    console.log(req.headers);
    next();
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
    next();
  });
  
// Configura il middleware GraphQL
app.use('/graphql', createHandler({ schema }));

// Configura CORS per consentire le richieste dal frontend
app.use(cors({
    origin: 'http://localhost:3000', // L'origine del frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTION',
    credentials: true,
  }));

// Avvia il server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server in esecuzione sulla porta ${PORT}`);
});

