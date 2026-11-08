const express = require('express');
const cors = require('cors');
require('dotenv').config();
const ticketService = require('./services/ticket.service.impl');

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

app.put('/api/customers/:id', async (req, res) => {
  try {
    const data = await ticketService.updateCustomer(req.params.id, req.body);
    res.json(data);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

app.delete('/api/customers/:id', async (req, res) => {
  try {
    const data = await ticketService.deleteCustomer(req.params.id);
    res.json(data);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

// 5. API Báo cáo & Danh sách (Đã chuyển vào Repository)
app.get('/api/reports/csat', async (req, res) => {
  try {
    const data = await ticketService.getCsatReport();
    res.json(data);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

app.get('/api/surveys', async (req, res) => {
  try {
    const data = await ticketService.getAllSurveys();
    res.json(data);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

const PORT = process.env.PORT || 3000;

// Chỉ khởi động server khi chạy trực tiếp (npm start), không khởi động khi Jest import
if (require.main === module) {
  app.listen(PORT, () => { console.log(`Server running at http://localhost:${PORT}`); });
}

module.exports = app;