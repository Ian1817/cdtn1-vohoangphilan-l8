const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

async function initDB() {
  try {
    console.log("Đang tạo bảng...");
    
    // 1. Tạo bảng phiếu bảo hành
    await pool.query(`
      CREATE TABLE IF NOT EXISTS warranty_tickets (
        ticket_id SERIAL PRIMARY KEY,
        ticket_code VARCHAR(50) UNIQUE NOT NULL,
        device_name VARCHAR(100),
        technician_name VARCHAR(100),
        status VARCHAR(20)
      )
    `);

    // 2. Tạo bảng khảo sát
    await pool.query(`
      CREATE TABLE IF NOT EXISTS survey_responses (
        survey_id SERIAL PRIMARY KEY,
        ticket_id INTEGER REFERENCES warranty_tickets(ticket_id),
        csat_score INTEGER,
        nps_score INTEGER,
        comment TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 3. Nạp dữ liệu mẫu
    await pool.query(`
      INSERT INTO warranty_tickets (ticket_id, ticket_code, device_name, technician_name, status) 
      VALUES (1052, 'PB-2-00001', 'iPhone 13 Pro Max', 'Nguyen Van A', 'DA_DONG')
      ON CONFLICT (ticket_code) DO NOTHING
    `);
    
    await pool.query(`
      INSERT INTO warranty_tickets (ticket_id, ticket_code, device_name, technician_name, status) 
      VALUES (1053, 'PB-2-00002', 'Samsung S23', 'Tran Van B', 'DANG_XU_LY')
      ON CONFLICT (ticket_code) DO NOTHING
    `);

    console.log("✅ Tạo bảng và nạp dữ liệu mẫu thành công!");
  } catch (err) {
    console.error("❌ Lỗi:", err.message);
  } finally {
    pool.end();
  }
}

initDB();