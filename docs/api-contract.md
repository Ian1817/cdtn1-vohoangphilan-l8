# API CONTRACT – TRACK SE (LUỒNG L8: KHẢO SÁT CSAT)

## API 1 – Tra cứu phiếu bảo hành trước khảo sát
**GET `/api/tickets/{ticket_code}/summary`**

Mục đích: Cho phép khách hàng tra cứu thông tin tóm tắt phiếu bảo hành trước khi điền form khảo sát.

### Response thành công – 200 OK
```json
{
  "ticket_id": 1052,
  "ticket_code": "WT-2026-1052",
  "device_name": "iPhone 13 Pro Max",
  "technician_name": "Nguyen Van A",
  "status": "DA_DONG",
  "can_survey": true
}
Lỗi không tìm thấy mã phiếu – 404 Not Found
JSON
{
  "error": "TICKET_NOT_FOUND",
  "message": "Ma phieu bao hanh khong ton tai tren he thong."
}
API 2 – Gửi đánh giá khảo sát CSAT
POST /api/surveys

Mục đích: Tiếp nhận điểm đánh giá CSAT và nhận xét từ khách hàng.

Request Body
JSON
{
  "ticket_id": 1052,
  "csat_score": 5,
  "comment": "Ky thuat vien nhiet tinh, sua may nhanh va chay em."
}
Response thành công – 201 Created
JSON
{
  "survey_id": 8801,
  "ticket_id": 1052,
  "csat_score": 5,
  "status": "SUCCESS",
  "created_at": "2026-10-09T08:30:00Z"
}
Lỗi vi phạm quy tắc QT-10 (Phiếu chưa đóng) – 422 Unprocessable Entity
JSON
{
  "error": "QT10_VIOLATION",
  "message": "Phieu bao hanh chua o trang thai DA_DONG. Khong the thuc hien khao sat."
}
Lỗi gửi trùng lặp khảo sát – 409 Conflict
JSON
{
  "error": "SURVEY_ALREADY_EXISTS",
  "message": "Phieu bao hanh nay da duoc hoan tat khao sat truoc do."
}
API 3 – Xem báo cáo điểm CSAT theo Kỹ thuật viên
GET /api/reports/csat-technicians?month=10&year=2026

Mục đích: Cung cấp dữ liệu thống kê điểm CSAT trung bình cho Quản lý trung tâm.

Response thành công – 200 OK
JSON
{
  "report_period": "10/2026",
  "total_closed_tickets": 1250,
  "total_surveys": 890,
  "response_rate": "71.2%",
  "data": [
    {
      "technician_id": 1,
      "full_name": "Nguyen Van A",
      "closed_tickets": 120,
      "survey_count": 95,
      "avg_csat": 4.8,
      "five_star_ratio": "88%"
    },
    {
      "technician_id": 2,
      "full_name": "Tran Thi B",
      "closed_tickets": 110,
      "survey_count": 80,
      "avg_csat": 4.6,
      "five_star_ratio": "82%"
    }
  ]
}
API 4 – Danh sách & Lọc phản hồi khảo sát
GET /api/surveys?score=1&page=1&limit=20

Mục đích: Truy vấn danh sách khảo sát hỗ trợ lọc theo số sao và phân trang.

Response thành công – 200 OK
JSON
{
  "page": 1,
  "limit": 20,
  "total_records": 15,
  "total_pages": 1,
  "data": [
    {
      "survey_id": 8750,
      "ticket_code": "WT-1033",
      "customer_phone": "091xxxx789",
      "csat_score": 1,
      "comment": "Cho nhan may hoi lau, nhan vien chua nhiet tinh.",
      "created_at": "2026-10-08T14:15:00Z"
    }
  ]
}
