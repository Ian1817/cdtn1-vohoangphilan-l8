# Test Plan – Luồng L8: Khảo sát CSAT/NPS (Track SE)

## 1. Phạm vi kiểm thử
- **Kiểm thử:**
  - API tra cứu phiếu (`GET /api/tickets/:ticket_code/summary`).
  - API gửi khảo sát (`POST /api/surveys`).
  - Quy tắc nghiệp vụ QT-10 (chỉ khảo sát phiếu `DA_DONG`, chống trùng).
  - Xử lý lỗi dữ liệu sai (thiếu trường bắt buộc, sai định dạng).
- **CHỦ Ý KHÔNG kiểm thử:**
  - Hiệu năng và tải (thuộc phạm vi Chuyên đề tốt nghiệp 2).
  - Giao diện người dùng (UI) - sẽ kiểm thủ công.
  - Bảo mật nâng cao (OWASP) - sẽ kiểm ở mức nhận biết.

## 2. Loại test và số lượng
- **Unit test (Jest):** 5 test case (đã có trong `ticket.service.test.js`).
  - Kiểm tra logic QT-10 và validation đầu vào.
- **Integration test:** 2 test case (cần bổ sung).
  - Kiểm tra kết nối Repository với Database PostgreSQL.
- **API test (Supertest):** 3 test case (cần bổ sung).
  - Kiểm tra endpoint trả về đúng mã HTTP và dữ liệu.
- **Tổng cộng:** 10 test case.
- **Kỹ thuật chọn dữ liệu:** Phân vùng tương đương và giá trị biên (CSAT = 1, 5; NPS = 0, 10).

## 3. Tiêu chí thành công (đo được)
- 10/10 test case có kết quả thực tế và PASS.
- Mọi quy tắc nghiệp vụ (QT-10) có ít nhất 1 test case.
- Không còn bug mức Critical đang mở.
- Có ít nhất 1 bug mức Major đã sửa và ghi vào Bug Log.

## 4. Môi trường và dữ liệu thử
- **Môi trường:** Docker Compose (Node.js + PostgreSQL).
- **Dữ liệu mẫu:** `seeds/init-pg.js` (tạo bảng và nạp 6 phiếu mẫu).
- **Lệnh chạy test:** `npm test`.
- **Dọn dẹp dữ liệu:** Chạy lại `node init-pg.js` trước mỗi lần test.