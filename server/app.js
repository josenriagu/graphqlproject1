// required dependencies
require('dotenv').config();
const express = require('express');
const graphqlHTTP = require('express-graphql');

const app = express();

//middleware
app.use('/graphql', graphqlHTTP({

}))

const port = process.env.PORT;
const message = process.env.MESSAGE;

// listen
app.listen(port, () => {
   console.log(`${message} ${port}`)
});