const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')

const routes = require("./routes");

const port = process.env.PORT || 3333;

const app = express();

mongoose.connect('mongodb+srv://desafio:401401@desafiodito-wc6su.mongodb.net/desafioRafaelSad?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors())
app.use(express.json());
app.use(routes);

console.log(`Listen port: ${port}`);
app.listen(port);