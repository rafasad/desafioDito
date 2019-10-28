const AutoComplete = require("../models/AutoComplete");

module.exports = {

    async insert(req, res) {
        try {
            let { event } = req.body;
            const data = await AutoComplete.create({ event, timestamp: new Date()});
            return res.send(data)
        } catch (error) {
            res.status(400).send({ message: "Error on create event" });
        }
    },

    async search(req, res) {
        const { word } = req.query;

        if (word.length < 2) { 
            res.send([]) 
        }

        try {       
            const autoComplete = await AutoComplete.distinct("event", {event: new RegExp('^' + word)});
            return res.send(autoComplete);

        } catch (error) {
            res.status(400).send({ message: "Error on search event" });
        }
    }
    
};