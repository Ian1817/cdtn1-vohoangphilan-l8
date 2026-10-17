const express = require('express');
const app = express();
const ticketRoutes = require('./routes/ticket.routes');
app.use(express.json());
app.use('/api', ticketRoutes);
module.exports = app;
