const express = require("express");
const path = require('path');

const TimelineController = require("./controllers/TimelineController");
const AutoComplete = require("./controllers/AutoCompleteController");

const routes = express.Router();

routes.get('/',(req,res) => {
    res.sendFile(path.join(`${__dirname}/../public/index.html`));
});

routes.post("/insert", AutoComplete.insert);

routes.get("/search", AutoComplete.search);
routes.get("/timeline", TimelineController.index);

module.exports = routes; 