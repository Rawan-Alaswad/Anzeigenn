const express = require('express');
const router = express.Router();
const Anzeige = require('./models/Anzeigen'); 
const Anzeigen = require('./models/Anzeigen');

//read all
router.get('/Anzeigen', async(req, res) => {
    const allAnzeige = await Anzeige.find();
    console.log(allAnzeige);
    res.send(allAnzeige);
});
//creat one
router.post('/Anzeigen', async(req, res) => {
    const newAnzeigen = new Anzeige({
        zustand: req.body.zustand,
        titel: req.body.titel,
        preis: req.body.preis,
        zustand: req.body.zustand,
   
    })
    await newAnzeigen.save();
    res.send(newAnzeigen);
})

// get one  Read 
router.get('/Anzeigen/id', async(req, res) => {
    try {
        const anzeige = await Anzeige.findOne({ _id: req.params.id });
        console.log(req.params);
        res.send(anzeige[0]);
    } catch {
        res.status(404);
        res.send({
            error: "Anzeige  does not exist!"
        })
    }
})
router.patch('/Anzeigen/:id', async (req, res) => {
    try {
        const anzeige = await Anzeige.findOne({ _id: req.params.id }); 
    

        if (!anzeige) {
            return res.status(404).send({ error: "Anzeige existiert nicht!" });
        }
        
        if (req.body.titel) {
            anzeige.titel = req.body.titel;
        }

        if (req.body.preis) {
            anzeige.preis = req.body.preis;
        }
        if (req.body.zustand) {
            anzeige.zustand = req.body.zustand;
        }


        await anzeige.save();
        res.send(anzeige);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Serverfehler beim Aktualisieren der Anzeige." });
    }
});


//delet one
router.delete('/Anzeigen/:id', async(req, res) => {
    try {
        await Anzeige.deleteOne({ _id: req.params.id })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ error: "Anzeige existiert nicht!" })
    }
});

module.exports = router;
