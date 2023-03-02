require("dotenv").config();
const express = require("express");
const path = require("path");
const axios = require('axios');
const router = require('./routes');

// const cors = require("cors");
const morgan = require("morgan");

const app = express();

// Use middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(router);

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
