# Mekong Smart CRM - Luồng L8 (Khảo sát hài lòng CSAT/NPS)

## 1. Giới thiệu tổng quan
Dự án phát triển module khảo sát hài lòng khách hàng (CSAT/NPS) tích hợp vào hệ thống Mekong Smart CRM cho luồng xử lý L8. Module hỗ trợ tra cứu tóm tắt phiếu bảo hành và ghi nhận đánh giá từ phía khách hàng sau khi dịch vụ kết thúc.

## 2. Yêu cầu môi trường
- Node.js 18 LTS trở lên, npm 9+
- PostgreSQL 14+ (hoặc CSDL quan hệ tương đương)
- Biến môi trường: xem `.env.example` (`DATABASE_URL`, `PORT`)

## 3. Kiến trúc hệ thống
Hệ thống được xây dựng theo kiến trúc 3 lớp (3-layer RESTful Architecture):
- **Routes Layer (`src/routes`)**: Tiếp nhận và điều hướng HTTP Request.
- **Services Layer (`src/services`)**: Xử lý logic nghiệp vụ, quy tắc QT-10 và kiểm tra điều kiện phiếu.
- **Repositories Layer (`src/repositories`)**: Thao tác truy vấn dữ liệu với PostgreSQL.

## 4. Mô hình dữ liệu (ERD) & Bảng
Hệ thống gồm 4 bảng chính:
- `customers`: Quản lý thông tin khách hàng.
- `technicians`: Thông tin kỹ thuật viên xử lý.
- `warranty_tickets`: Quản lý phiếu bảo hành thiết bị.
- `survey_responses`: Lưu trữ kết quả đánh giá CSAT/NPS từ khách hàng.

## 5. Danh sách API Cốt lõi
- `GET /api/tickets/:ticket_code/summary`: Tra cứu thông tin tóm tắt phiếu bảo hành.
- `POST /api/surveys`: Tiếp nhận thông tin khảo sát CSAT (chỉ dành cho phiếu có trạng thái `DA_DONG` theo quy tắc QT-10).

## 6. Trạng thái hiện tại (Buổi 8)
- [x] Đã xử lý 100% phản hồi BT1 và ghi nhật ký tại `docs/thay-doi-thiet-ke.md`
- [x] Dựng xong cấu trúc `src/` tách 3 lớp (`routes/`, `services/`, `repositories/`)
- [x] Migration CSDL tạo các bảng `customers`, `technicians`, `warranty_tickets`, `survey_responses`
- [x] Hiện thực API tra cứu phiếu (`GET /api/tickets/:ticket_code/summary`)
- [x] Hiện thực API gửi khảo sát CSAT (`POST /api/surveys`) kiểm tra quy tắc QT-10 & chống trùng
- [x] Chạy thử nghiệm thành công 2 endpoint bằng cURL / Postman và lưu ảnh minh chứng vào `docs/screenshots/`
