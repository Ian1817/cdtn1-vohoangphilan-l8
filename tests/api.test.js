const request = require('supertest');
const app = require('../src/server');

describe('API Test - Luồng L8', () => {
  // ===== NHÓM 1: LUỒNG ĐÚNG (Happy Path) - PASS =====
  
  test('TC-06: GET /api/tickets/PB-2-00001/summary - Trả về 200', async () => {
    const res = await request(app).get('/api/tickets/PB-2-00001/summary');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('ticket_code', 'PB-2-00001');
  });

  test('TC-08: POST /api/surveys - Gửi khảo sát thành công trả về 201', async () => {
    const res = await request(app)
      .post('/api/surveys')
      .send({ ticket_code: 'PB-2-00001', csat_score: 5, nps_score: 9, comment: 'Dịch vụ tốt' });
    expect(res.statusCode).toEqual(201);
  });

  test('TC-12: GET /api/surveys - Trả về 200 và mảng dữ liệu', async () => {
    const res = await request(app).get('/api/surveys');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('TC-13: GET /api/reports/csat - Trả về 200 và mảng dữ liệu', async () => {
    const res = await request(app).get('/api/reports/csat');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('TC-14: GET /api/customers - Trả về 200 và mảng dữ liệu', async () => {
    const res = await request(app).get('/api/customers');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // ===== NHÓM 2: DỮ LIỆU SAI (Invalid Data) - PASS =====

  test('TC-07: GET /api/tickets/KHONG-TON-TAI/summary - Trả về 404', async () => {
    const res = await request(app).get('/api/tickets/KHONG-TON-TAI/summary');
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('error', 'KHONG_TIM_THAY_PHIEU');
  });

  test('TC-09: POST /api/surveys - Thiếu csat_score trả về 400', async () => {
    const res = await request(app).post('/api/surveys').send({ ticket_code: 'PB-2-00001' });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error', 'DU_LIEU_KHONG_HOP_LE');
  });

  test('TC-10: POST /api/surveys - Phiếu DANG_XU_LY trả về 400', async () => {
    const res = await request(app)
      .post('/api/surveys')
      .send({ ticket_code: 'PB-2-00002', csat_score: 5, nps_score: 9 });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error', 'PHIEU_CHUA_DONG_KHONG_THE_KHAO_SAT');
  });

  test('TC-15: POST /api/surveys - Thiếu ticket_code trả về 400', async () => {
    const res = await request(app).post('/api/surveys').send({ csat_score: 5, nps_score: 9 });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error', 'DU_LIEU_KHONG_HOP_LE');
  });

  // ===== NHÓM 3: GIÁ TRỊ BIÊN (Boundary Values) - PASS =====

  test('TC-16: POST /api/surveys - CSAT biên dưới (1) hợp lệ', async () => {
    const res = await request(app)
      .post('/api/surveys')
      .send({ ticket_code: 'PB-2-00001', csat_score: 1, nps_score: 0, comment: 'Test biên dưới' });
    expect(res.statusCode).toEqual(201);
  });

  test('TC-17: POST /api/surveys - CSAT biên trên (5) hợp lệ', async () => {
    const res = await request(app)
      .post('/api/surveys')
      .send({ ticket_code: 'PB-2-00001', csat_score: 5, nps_score: 10, comment: 'Test biên trên' });
    expect(res.statusCode).toEqual(201);
  });

  // ===== NHÓM 4: TEST FAIL (Thầy yêu cầu có ít nhất 3 FAIL) =====

  // TC-11: CSAT = 6 (vượt quá 5) -> FAIL vì code chưa kiểm tra
  test('TC-11: POST /api/surveys - CSAT = 6 (dữ liệu sai) - Kỳ vọng 400', async () => {
    const res = await request(app)
      .post('/api/surveys')
      .send({ ticket_code: 'PB-2-00001', csat_score: 6, nps_score: 9, comment: 'Test CSAT sai' });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error', 'DU_LIEU_KHONG_HOP_LE');
  });

  // TC-18: comment quá ngắn (< 10 ký tự) -> FAIL vì code chưa kiểm tra
  test('TC-18: POST /api/surveys - Comment < 10 ký tự - Kỳ vọng 400', async () => {
    const res = await request(app)
      .post('/api/surveys')
      .send({ ticket_code: 'PB-2-00001', csat_score: 5, nps_score: 9, comment: 'abc' });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error', 'DU_LIEU_KHONG_HOP_LE');
  });

  // TC-19: comment quá dài (> 2000 ký tự) -> FAIL vì code chưa kiểm tra
  test('TC-19: POST /api/surveys - Comment > 2000 ký tự - Kỳ vọng 400', async () => {
    const longComment = 'a'.repeat(2001);
    const res = await request(app)
      .post('/api/surveys')
      .send({ ticket_code: 'PB-2-00001', csat_score: 5, nps_score: 9, comment: longComment });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error', 'DU_LIEU_KHONG_HOP_LE');
  });
});