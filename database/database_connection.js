const mongoose = require("mongoose");

const databaseConnection = () => {
    const dbAddress = " ";

    mongoose.connect(dbAddress, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log("MongoDB Connected"))
        .catch((err) => console.log(err));

};

module.exports = { databaseConnection };
