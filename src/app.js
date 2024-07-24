const express = require('express');
const { createHandler } = require('graphql-http/lib/use/express');
// const mongoose = require('mongoose');
const schema = require('./schema');

// Inizializza Express
const app = express();

// Connetti a MongoDB (sostituisci con la tua stringa di connessione)
// mongoose.connect('mongodb://localhost:27017/medtvfinder', { useNewUrlParser: true, useUnifiedTopology: true });

// mongoose.connection.once('open', () => {
//     console.log('Connesso al database MongoDB');
// });

// Configura il middleware GraphQL
app.use('/graphql', createHandler({ schema }));

// Avvia il server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server in esecuzione sulla porta ${PORT}`);
});

