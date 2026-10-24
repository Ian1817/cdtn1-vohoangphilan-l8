const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

async function seedMore() {
  try {
    console.log("Đang thêm dữ liệu mẫu...");
    await pool.query(`
      INSERT INTO warranty_tickets (ticket_code, device_name, technician_name, status) 
      VALUES 
      ('PB-2-00003', 'Samsung Galaxy S23', 'Tran Van B', 'DA_DONG'),
      ('PB-2-00004', 'MacBook Pro M2', 'Le Hoang C', 'DA_DONG'),
      ('PB-2-00005', 'iPad Air 5', 'Nguyen Van A', 'DA_DONG'),
      ('PB-2-00006', 'Xiaomi 13 Pro', 'Pham Minh D', 'DA_DONG')
      ON CONFLICT (ticket_code) DO NOTHING;
    `);
    console.log("✅ Đã thêm các phiếu mới thành công!");
  } catch (err) {
    console.error("❌ Lỗi:", err.message);
  } finally {
    pool.end();
  }
}

seedMore();