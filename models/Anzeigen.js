


const mongoose = require('mongoose');

// Definition des Anzeigen-Schemas
const AnzeigeSchema = new mongoose.Schema({
id: { type: String   },
    titel: { type: String   },
    preis: { type: String },
    zustand: { type: String  },
});

// Erstellung des Anzeigen-Modells aus dem Schema
const Anzeigen = mongoose.model('Anzeigen', AnzeigeSchema);

// Export des Anzeigen-Modells, um es in anderen Dateien verwenden zu können
module.exports = Anzeigen;
