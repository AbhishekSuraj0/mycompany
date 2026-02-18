const mongoose = require("mongoose");


const promocodeCode = new mongoose.Schema({

    amount: {
        type: String,
        required: true
    },
    promocode: {
        type: String,
        required: true
    },
    time: {
        type: String
    },
    status: {
        type: String
    },
    transaction: {
        type: String,
        unique: true,
        required: true
    }

});
const Promocode = mongoose.model("Promocode", promocodeCode);

module.exports = Promocode