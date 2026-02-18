const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({

    name: String,
    wallet: {
        todayincome: Number,
        yesterdayincome: Number,
        monthly: Number,
        totalincome: Number
    },
    number: { type: String, unique: true },
    password: String,
    History: [
        {
            timestamp: String,
            summary: String,
            amount: Number,
            status: String
        }
    ],
    position: String,
    SuperID: [
        {
            name: String,
            number: String
        }
    ],
    MasterID: [
        {
            name: String,
            number: String
        }
    ],
    Distribitor: [
        {
            name: String,
            number: String
        }
    ],
    Customer: [
        {
            name: String,
            number: String
        }
    ],
    Gmail: { type: String, unique: true },
    address: String,
    Refferal: String,
    Device: String

});
/* ✅ Model */
const User = mongoose.model("User", userSchema);
module.exports = User