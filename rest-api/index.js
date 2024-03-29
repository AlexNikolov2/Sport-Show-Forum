const dotenv = require("dotenv");
dotenv.config();

const express = require('express');
const path = require('path');

const config = require('./config');
const expressSetup = require('./config/express');
const mongooseSetup = require('./config/mongoose');

const allowed = [
    ".js",
    ".css",
    ".png",
    ".jpg",
    ".ico"
];

const start = async () => {
    const app = express();
    expressSetup(app);
    await mongooseSetup(app);

    app.get("*", (req, res) => {
        if (allowed.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
            res.sendFile(path.resolve(`public/${req.url}`));
        } else {
            res.sendFile(path.join(__dirname, "public/index.html"));
        }
    });

    app.listen(config.PORT, () => console.log(`Server is listening on port ${config.PORT}!`));
};

start();