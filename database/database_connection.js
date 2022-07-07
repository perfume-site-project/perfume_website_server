const mongoose = require("mongoose");

const databaseConnection = () => {
    const dbAddress = "mongodb://146.56.137.48:27017/test";

    mongoose.connect(dbAddress, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log("MongoDB Connected"))
        .catch((err) => console.log(err));
};

module.exports = { databaseConnection };
