require('dotenv').config();
const express = require('express');

const app = express();
const port = process.env.PORT;
const message = process.env.MESSAGE;

app.listen(port, () => {
   console.log(`${message} ${port}`)
});