const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

class TicketRepository {
  async findByCode(ticketCode) {
    const query = `SELECT * FROM warranty_tickets WHERE ticket_code = $1`;
    const result = await pool.query(query, [ticketCode]);
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  async createSurvey(ticketId, csatScore, npsScore, comment) {
    const query = `
      INSERT INTO survey_responses (ticket_id, csat_score, nps_score, comment)
      VALUES ($1, $2, $3, $4) RETURNING *
    `;
    const result = await pool.query(query, [ticketId, csatScore, npsScore, comment]);
    return result.rows[0];
  }

  async createTicket(data) {
    const query = `INSERT INTO warranty_tickets (ticket_code, device_name, technician_name, status) VALUES ($1, $2, $3, $4) RETURNING *`;
    const result = await pool.query(query, [data.ticket_code, data.device_name, data.technician_name, data.status]);
    return result.rows[0];
  }

  async updateTicketStatus(ticketCode, status) {
    const query = `UPDATE warranty_tickets SET status = $1 WHERE ticket_code = $2 RETURNING *`;
    const result = await pool.query(query, [status, ticketCode]);
    return result.rows[0];
  }

  async deleteTicket(ticketCode) {
    const query = `DELETE FROM warranty_tickets WHERE ticket_code = $1 RETURNING *`;
    const result = await pool.query(query, [ticketCode]);
    return result.rows[0];
  }

  async getAllCustomers() {
    const result = await pool.query('SELECT * FROM customers');
    return result.rows;
  }

  async createCustomer(data) {
    const query = `INSERT INTO customers (full_name, phone) VALUES ($1, $2) RETURNING *`;
    const result = await pool.query(query, [data.full_name, data.phone]);
    return result.rows[0];
  }

  // --- BỔ SUNG CRUD CHO CUSTOMERS ---
  async updateCustomer(id, data) {
    const query = `UPDATE customers SET full_name = $1, phone = $2 WHERE customer_id = $3 RETURNING *`;
    const result = await pool.query(query, [data.full_name, data.phone, id]);
    return result.rows[0];
  }

  async deleteCustomer(id) {
    const query = `DELETE FROM customers WHERE customer_id = $1 RETURNING *`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  // --- BỔ SUNG API BÁO CÁO & DANH SÁCH ---
  async getCsatReport() {
    const query = `
      SELECT t.technician_name, COUNT(s.survey_id) as total_surveys, 
             ROUND(AVG(s.csat_score), 1) as avg_csat 
      FROM warranty_tickets t 
      JOIN survey_responses s ON t.ticket_id = s.ticket_id 
      GROUP BY t.technician_name
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  async getAllSurveys() {
    const query = `
      SELECT s.survey_id, t.ticket_code, t.device_name, t.technician_name, 
             s.csat_score, s.nps_score, s.comment, s.created_at 
      FROM survey_responses s 
      JOIN warranty_tickets t ON s.ticket_id = t.ticket_id 
      ORDER BY s.created_at DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  }
}

module.exports = new TicketRepository();