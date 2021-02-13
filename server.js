const express = require("express");

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'localhost';

const app = express();

app.use(require('./routes'));
app.use(require('./metrics'));

app.listen(PORT, () => {
    console.log(`Example app listening at http://${HOST}:${PORT}`)
})