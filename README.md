# Mekong Smart CRM - Luồng L8 (Khảo sát hài lòng CSAT/NPS)

## 2. Yêu cầu môi trường
- Node.js 18 LTS trở lên, npm 9+
- PostgreSQL 14+ (hoặc SQLite 3 - xem ghi chú)
- Biến môi trường: xem `.env.example` (`DATABASE_URL`, `PORT`)

## 6. Trạng thái hiện tại (Buổi 8)
- [x] Đã xử lý 100% phản hồi BT1 và ghi nhật ký tại `docs/thay-doi-thiet-ke.md`
- [x] Dựng xong cấu trúc `src/` tách 3 lớp (`routes/`, `services/`, `repositories/`)
- [x] Migration CSDL tạo các bảng `customers`, `technicians`, `warranty_tickets`, `survey_responses`
- [x] Hiện thực API tra cứu phiếu (`GET /api/tickets/:ticket_code/summary`)
- [x] Hiện thực API gửi khảo sát CSAT (`POST /api/surveys`) kiểm tra quy tắc QT-10 & chống trùng
- [x] Chạy thử nghiệm thành công 2 endpoint bằng cURL / Postman và lưu ảnh minh chứng vào `docs/screenshots/`
