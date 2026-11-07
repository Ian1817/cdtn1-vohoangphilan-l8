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
}

module.exports = new TicketRepository();