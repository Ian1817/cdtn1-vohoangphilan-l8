# Hợp đồng API (API Contract) - Luồng L8: Khảo sát hài lòng CSAT/NPS
*Track: SE (Software Engineering) - Nền tảng: Node.js / Express*

## 1. Danh sách Endpoint
| Method | Endpoint | Mục đích | User Story |
| :--- | :--- | :--- | :--- |
| **POST** | \/api/surveys\ | Tiếp nhận đánh giá CSAT từ khách hàng (áp dụng QT-10) | US1 |
| **GET** | \/api/tickets/:id/survey-status\ | Tra cứu trạng thái đủ điều kiện khảo sát của phiếu | US2 |
| **GET** | \/api/reports/csat-technicians\ | Báo cáo điểm CSAT trung bình theo kỹ thuật viên | US3 |
| **GET** | \/api/surveys\ | Lọc danh sách phản hồi khảo sát kèm phân trang | US4 |

## 2. Quy ước chung
- Định dạng dữ liệu: JSON (UTF-8). Header bắt buộc: \Content-Type: application/json\.
- Quy ước đặt tên trường: \snake_case\ khớp với cấu trúc bảng cơ sở dữ liệu.
- Múi giờ: ISO 8601 kèm múi giờ Việt Nam (+07:00), ví dụ: \2026-10-04T19:30:00+07:00\.
- Phân trang: mặc định \page=1\, \size=20\. Cấu trúc trả lời có kèm \	otal_records\.
- Cấu trúc phản hồi lỗi chuẩn:
\\\json
{
  "error": {
    "code": "MA_LOI_CU_THE",
    "message": "Thông báo thân thiện cho người dùng",
    "fields": { "ten_truong": "Chi tiết lỗi dữ liệu" }
  }
}
\\\

## 3. Chi tiết Endpoint trọng tâm: POST /api/surveys (US1 - MUST)

### 3.1. Request Body
\\\json
{
  "ticket_id": 1052,
  "csat_score": 5,
  "comment": "Kỹ thuật viên tư vấn nhiệt tình, sửa chữa máy rất nhanh."
}
\\\

### 3.2. Response 201 Created (Thành công)
\\\json
{
  "survey_id": 8801,
  "ticket_id": 1052,
  "csat_score": 5,
  "comment": "Kỹ thuật viên tư vấn nhiệt tình, sửa chữa máy rất nhanh.",
  "created_at": "2026-10-04T19:35:10+07:00",
  "status": "DA_GHI_NHAN"
}
\\\

### 3.3. Response Lỗi
- **400 Bad Request** (Dữ liệu không hợp lệ):
\\\json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Dữ liệu khảo sát gửi lên không hợp lệ",
    "fields": { "csat_score": "Điểm CSAT bắt buộc là số nguyên từ 1 đến 5" }
  }
}
\\\
- **404 Not Found** (Không tìm thấy phiếu bảo hành):
\\\json
{
  "error": {
    "code": "TICKET_NOT_FOUND",
    "message": "Mã phiếu bảo hành không tồn tại trong hệ thống"
  }
}
\\\
- **409 Conflict** (Phiếu đã làm khảo sát trước đó):
\\\json
{
  "error": {
    "code": "SURVEY_ALREADY_EXISTS",
    "message": "Phiếu bảo hành này đã được hoàn thành khảo sát trước đó"
  }
}
\\\
- **422 Unprocessable Entity** (Vi phạm quy tắc nghiệp vụ QT-10):
\\\json
{
  "error": {
    "code": "QT10_VIOLATION",
    "message": "Phiếu bảo hành chưa đóng (trạng thái hiện tại khác 'DA_DONG'), không được phép làm khảo sát"
  }
}
\\\

## 4. Bảng Validation cho POST /api/surveys
| Trường dữ liệu | Bắt buộc | Kiểu / Ràng buộc kỹ thuật | Thông báo lỗi khi vi phạm |
| :--- | :---: | :--- | :--- |
| \	icket_id\ | Có | Số nguyên dương, tồn tại trong bảng \warranty_tickets\ | Mã phiếu bảo hành không hợp lệ hoặc không tồn tại |
| \csat_score\ | Có | Số nguyên, giá trị 1 đến 5 | Điểm CSAT bắt buộc là số nguyên từ 1 đến 5 |
| \comment\ | Không | Kiểu chuỗi, độ dài tối đa 1000 ký tự | Nhận xét không được vượt quá 1000 ký tự |
