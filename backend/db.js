
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const db = async () => {

    const URL= process.env.URI;
    try {
        await mongoose.connect( URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Successfully Connected..👍");
    } catch (error) {
        console.log("Error while connecting..", error.message);
    }
};

module.exports = db;
