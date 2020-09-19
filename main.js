"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000 || process.env.PORT;
app.use(cors());
app.use(express.json());
app.use('/', require('./routes/web'));
app.listen(PORT, () => {
    const message = `Development Server.\nRunning on http://localhost:${PORT}`;
    console.log(message);
});
