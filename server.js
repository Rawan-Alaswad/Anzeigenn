const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(express.json());
//cors für alle Anfragen aktivieren
app.use(cors());
app.use('/', routes);

// connect to mongoDB
mongoose.connect(process.env.DB_CONNECTION, { dbName: process.env.DATABASE });

const db = mongoose.connection;
db.on('error', err => {
  console.log(err);
});
db.once('open', () => {
    console.log('connected to DB');
});

app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Server started and listening on port ${PORT} ... `);
    }
});