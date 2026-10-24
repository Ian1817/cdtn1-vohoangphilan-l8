const express = require('express');
const { Pool } = require('pg');
const cors = require('cors'); // Đã thêm thư viện CORS
require('dotenv').config();

const app = express();

app.use(cors()); // Cho phép Frontend gọi API
app.use(express.json());

// Kết nối Database
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// --- API 1: Lấy tóm tắt phiếu ---
app.get('/api/tickets/:ticket_code/summary', async (req, res) => {
  try {
    const { ticket_code } = req.params;
    const result = await pool.query('SELECT * FROM warranty_tickets WHERE ticket_code = $1', [ticket_code]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'KHONG_TIM_THAY_PHIEU' });
    }

    const ticket = result.rows[0];
    res.json({
      ticket_id: ticket.ticket_id,
      ticket_code: ticket.ticket_code,
      device_name: ticket.device_name,
      technician_name: ticket.technician_name,
      status: ticket.status,
      can_survey: ticket.status === 'DA_DONG'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- API 2: Gửi khảo sát ---
app.post('/api/surveys', async (req, res) => {
  try {
    const { ticket_code, csat_score, nps_score, comment } = req.body;

    if (!ticket_code || csat_score === undefined) {
      return res.status(400).json({ error: 'DU_LIEU_KHONG_HOP_LE' });
    }

    const ticketResult = await pool.query('SELECT * FROM warranty_tickets WHERE ticket_code = $1', [ticket_code]);
    if (ticketResult.rows.length === 0) {
      return res.status(404).json({ error: 'KHONG_TIM_THAY_PHIEU' });
    }

    const ticket = ticketResult.rows[0];
    if (ticket.status !== 'DA_DONG') {
      return res.status(400).json({ error: 'PHIEU_CHUA_DONG_KHONG_THE_KHAO_SAT' });
    }

    const insertResult = await pool.query(
      'INSERT INTO survey_responses (ticket_id, csat_score, nps_score, comment) VALUES ($1, $2, $3, $4) RETURNING *',
      [ticket.ticket_id, csat_score, nps_score, comment]
    );

    res.status(201).json(insertResult.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});