const mongoose = require("mongoose");

const databaseConnection = () => {
    const dbAddress = "";

    mongoose.connect(dbAddress, {
            poolSize: 10,
            authSource: "",
            user: "",
            pass: "",
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log("MongoDB Connected"))
        .catch((err) => console.log(err));

};

module.exports = { databaseConnection };
