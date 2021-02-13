const express = require("express");
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'localhost';

const app = express();

app.get('/', (_, res) => {
    res.send('Hello World!')
})

app.use(require('./routes'));

app.listen(PORT, () => {
    console.log(`Example app listening at http://${HOST}:${PORT}`)
})