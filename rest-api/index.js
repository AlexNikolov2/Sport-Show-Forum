const express = require('express');
const config = require('./config');
const expressSetup = require('./config/express');
const mongooseSetup = require('./config/database');
const path = require('path');

const start = async () => {
    const app = express();
    expressSetup(app);
    await mongooseSetup();

    const allowed = [
        ".js",
        ".css",
        ".png",
        ".jpg",
        ".ico"
    ];

    app.get("*", (req, res) => {
        if (allowed.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
            res.sendFile(path.resolve(`../sport-show-forum/${req.url}`));
        } else {
            res.sendFile(path.join(__dirname, "../sport-show-forum/src/index.html"));
        }
    });

    app.listen(config.port, () => console.log('Server is listening on port 3000!'));
};

start();