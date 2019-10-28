const mongoose = require("mongoose");

const AutoCompleteSchema = new mongoose.Schema({
    event: String,
    timestamp: String
}, {
        timestamps: true
    });

module.exports = mongoose.model("AutoComplete", AutoCompleteSchema);