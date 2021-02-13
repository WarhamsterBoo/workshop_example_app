const express = require("express");
const PORT = 5000;
const HOST = 'localhost';

const app = express();

app.get('/', (_, res) => {
    res.send('Hello World!')
})

app.use(require('./routes'));

app.listen(PORT, () => {
    console.log(`Example app listening at http://${HOST}:${PORT}`)
})