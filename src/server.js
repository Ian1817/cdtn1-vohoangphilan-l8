const express = require('express');
const cors = require('cors');
require('dotenv').config();
const ticketService = require('./services/ticket.service');

const app = express();
app.use(cors());
app.use(express.json());

// 1. API Tra cứu phiếu
app.get('/api/tickets/:ticket_code/summary', async (req, res) => {
  try {
    const data = await ticketService.getSummary(req.params.ticket_code);
    res.json(data);
  } catch (error) { res.status(error.statusCode || 500).json({ error: error.message }); }
});

// 2. API Gửi khảo sát
app.post('/api/surveys', async (req, res) => {
  try {
    const data = await ticketService.submitSurvey(req.body);
    res.status(201).json(data);
  } catch (error) { res.status(error.statusCode || 500).json({ error: error.message }); }
});

// 3. CRUD cho Warranty Tickets
app.post('/api/tickets', async (req, res) => {
  try {
    const data = await ticketService.createTicket(req.body);
    res.status(201).json(data);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

app.put('/api/tickets/:ticket_code', async (req, res) => {
  try {
    const data = await ticketService.updateTicketStatus(req.params.ticket_code, req.body.status);
    res.json(data);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

app.delete('/api/tickets/:ticket_code', async (req, res) => {
  try {
    const data = await ticketService.deleteTicket(req.params.ticket_code);
    res.json(data);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

// 4. CRUD cho Customers
app.get('/api/customers', async (req, res) => {
  try {
    const data = await ticketService.getAllCustomers();
    res.json(data);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

app.post('/api/customers', async (req, res) => {
  try {
    const data = await ticketService.createCustomer(req.body);
    res.status(201).json(data);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

// 5. API Báo cáo & Danh sách (Giữ nguyên)
app.get('/api/reports/csat', async (req, res) => {
  try {
    const { Pool } = require('pg');
    const pool = new Pool({ host: process.env.DB_HOST, port: process.env.DB_PORT, database: process.env.DB_NAME, user: process.env.DB_USER, password: process.env.DB_PASSWORD });
    const result = await pool.query(`SELECT t.technician_name, COUNT(s.survey_id) as total_surveys, ROUND(AVG(s.csat_score), 1) as avg_csat FROM warranty_tickets t JOIN survey_responses s ON t.ticket_id = s.ticket_id GROUP BY t.technician_name`);
    res.json(result.rows);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

app.get('/api/surveys', async (req, res) => {
  try {
    const { Pool } = require('pg');
    const pool = new Pool({ host: process.env.DB_HOST, port: process.env.DB_PORT, database: process.env.DB_NAME, user: process.env.DB_USER, password: process.env.DB_PASSWORD });
    const result = await pool.query(`SELECT s.survey_id, t.ticket_code, t.device_name, t.technician_name, s.csat_score, s.nps_score, s.comment, s.created_at FROM survey_responses s JOIN warranty_tickets t ON s.ticket_id = t.ticket_id ORDER BY s.created_at DESC`);
    res.json(result.rows);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`Server running at http://localhost:${PORT}`); });