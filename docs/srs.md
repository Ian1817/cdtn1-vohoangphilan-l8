# SRS RÚT GỌN – SMART CRM MEKONG MOBILE

## 1. Tổng quan

### 1.1. Phạm vi
Đề tài tập trung vào **Luồng L8 – Khảo sát hài lòng CSAT/NPS** trong hệ thống Smart CRM của Mekong Mobile.

Trong phạm vi này, em tập trung phân tích quá trình hệ thống tự động cung cấp biểu mẫu và tiếp nhận đánh giá mức độ hài lòng của khách hàng sau khi phiếu bảo hành đã hoàn tất sửa chữa và chuyển sang trạng thái ĐÃ_ĐÓNG (`DA_DONG`). Quy trình gồm các bước chính: tra cứu thông tin tóm tắt phiếu bảo hành, kiểm tra và áp dụng quy tắc nghiệp vụ QT-10 (chỉ cho phép khảo sát phiếu đã đóng và ngăn chặn gửi trùng lặp), tiếp nhận điểm CSAT (thang điểm 1-5 sao) kèm nhận xét văn bản, tổng hợp báo cáo chỉ số CSAT theo kỹ thuật viên/trạm bảo hành, và truy vấn danh sách phản hồi hỗ trợ phân trang, lọc theo điểm số.

### 1.2. Người dùng chính
* **Khách hàng:** là người trực tiếp nhận máy sau bảo hành, tra cứu thông tin phiếu và điền form đánh giá CSAT (1-5 sao) kèm ý kiến đóng góp.
* **Quản lý trung tâm:** xem danh sách phản hồi khảo sát, lọc theo số sao, theo dõi báo cáo thống kê chỉ số CSAT trung bình của từng kỹ thuật viên và các trạm bảo hành để đánh giá chất lượng dịch vụ.
* **Kỹ thuật viên:** xem điểm CSAT trung bình và danh sách nhận xét chi tiết đối với các phiếu bảo hành do chính mình xử lý.

### 1.3. Các thực thể liên quan
Trong quá trình phân tích, em xác định các thực thể chính gồm:
* `customer`: lưu trữ thông tin khách hàng (họ tên, số điện thoại, email).
* `technician`: lưu trữ thông tin kỹ thuật viên sửa chữa và trạm làm việc.
* `warranty_ticket`: hồ sơ phiếu bảo hành thiết bị (mã phiếu, trạng thái, ngày đóng).
* `survey_response`: bản ghi kết quả khảo sát CSAT (điểm số 1-5, nhận xét, thời gian gửi).

### 1.4. Bảng thuật ngữ
| Thuật ngữ | Giải thích |
|---|---|
| CRM | Customer Relationship Management – hệ thống quản lý quan hệ khách hàng |
| CSAT | Customer Satisfaction Score – chỉ số đo lường mức độ hài lòng của khách hàng (thang điểm 1 đến 5 sao) |
| Warranty Ticket | Phiếu bảo hành/sửa chữa thiết bị của khách hàng |
| QT-10 | Quy tắc nghiệp vụ quy định chỉ cho phép gửi khảo sát khi phiếu bảo hành ở trạng thái ĐÃ_ĐÓNG (`DA_DONG`) |
| Unique Constraint | Ràng buộc duy nhất trong CSDL đảm bảo mỗi phiếu bảo hành chỉ có tối đa 1 bản ghi khảo sát |
| SLA | Thời hạn cam kết xử lý và phản hồi yêu cầu bảo hành |
| GWT | Given – When – Then, khung cú pháp tiêu chuẩn dùng để mô tả tiêu chí chấp nhận (Acceptance Criteria) |
| MoSCoW | Phương pháp phân loại mức độ ưu tiên yêu cầu: MUST, SHOULD, COULD, WON'T |

---

## 2. User Story

### US01 – Tra cứu thông tin phiếu bảo hành
**MoSCoW: MUST**

**User Story:**
> Là Khách hàng, em muốn tra cứu thông tin tóm tắt phiếu bảo hành bằng mã phiếu để xác nhận đúng thông tin thiết bị và kỹ thuật viên xử lý trước khi điền form đánh giá.

**Tiêu chí chấp nhận:**
* **GWT01:** Given em nhập mã phiếu bảo hành hợp lệ và tồn tại trên hệ thống (ví dụ: `WT-1052`), When em thực hiện tra cứu, Then hệ thống hiển thị thông tin tóm tắt gồm tên thiết bị, họ tên kỹ thuật viên xử lý và trạng thái hiện tại của phiếu.
* **GWT02 – Ngoại lệ:** Given em nhập mã phiếu không tồn tại trong CSDL, When em thực hiện tra cứu, Then hệ thống hiển thị thông báo lỗi "Mã phiếu bảo hành không tồn tại" và không hiển thị form khảo sát.

### US02 – Gửi đánh giá CSAT
**MoSCoW: MUST**

**User Story:**
> Là Khách hàng, em muốn gửi điểm đánh giá CSAT (từ 1 đến 5 sao) và nhận xét cá nhân cho phiếu bảo hành đã hoàn thành để phản hồi chất lượng phục vụ của kỹ thuật viên.

**Tiêu chí chấp nhận:**
* **GWT03:** Given phiếu bảo hành đang ở trạng thái `DA_DONG` và chưa từng thực hiện khảo sát, When em chọn mức điểm từ 1 đến 5 sao và bấm gửi, Then hệ thống lưu bản ghi khảo sát vào CSDL và hiển thị thông báo cảm ơn khách hàng.
* **GWT04 – Ngoại lệ (Vi phạm QT-10):** Given phiếu bảo hành chưa ở trạng thái `DA_DONG` (đang `TIEP_NHAN` hoặc `DANG_SUA`), When em cố gắng gửi khảo sát, Then hệ thống từ chối ghi nhận, hiển thị thông báo "Phiếu sửa chữa chưa hoàn tất, quý khách vui lòng khảo sát sau khi nhận máy".
* **GWT05 – Ngoại lệ (Gửi trùng lặp):** Given phiếu bảo hành đã từng được gửi khảo sát trước đó, When em cố gắng gửi lại khảo sát cho phiếu này, Then hệ thống từ chối tiếp nhận và thông báo "Phiếu bảo hành này đã được hoàn tất khảo sát trước đó".

### US03 – Xem báo cáo CSAT theo Kỹ thuật viên
**MoSCoW: MUST**

**User Story:**
> Là Quản lý trung tâm, em muốn xem báo cáo thống kê điểm CSAT trung bình theo từng kỹ thuật viên để đánh giá năng lực chuyên môn và thái độ phục vụ của nhân viên.

**Tiêu chí chấp nhận:**
* **GWT06:** Given em truy cập vào trang báo cáo quản lý, When em chọn kỳ báo cáo và trạm bảo hành, Then hệ thống hiển thị bảng điểm gồm các cột: Mã KTV, Họ tên, Tổng số phiếu đã đóng, Số lượt khảo sát, Điểm CSAT trung bình (thang điểm 1.0 - 5.0) và Tỷ lệ đánh giá 5 sao.
* **GWT07:** Given kỹ thuật viên chưa có lượt khảo sát nào trong kỳ, When hệ thống xuất báo cáo, Then cột điểm CSAT trung bình hiển thị dạng "N/A" hoặc "Chưa có đánh giá".

### US04 – Lọc danh sách phản hồi theo thang điểm
**MoSCoW: SHOULD**

**User Story:**
> Là Quản lý trung tâm, em muốn lọc danh sách các phản hồi khảo sát theo mức điểm sao (từ 1 đến 5 sao) để nhanh chóng phát hiện và xử lý các trường hợp khách hàng không hài lòng.

**Tiêu chí chấp nhận:**
* **GWT08:** Given em đang ở trang danh sách phản hồi, When em chọn bộ lọc "1 sao" hoặc "2 sao", Then hệ thống chỉ hiển thị các bản ghi khảo sát có điểm `csat_score` tương ứng.
* **GWT09:** Given em chọn xem chi tiết một phản hồi, When hệ thống hiển thị, Then số điện thoại của khách hàng được che mặt nạ bảo mật dạng `090xxxx123`.

### US05 – Kỹ thuật viên xem phản hồi cá nhân
**MoSCoW: SHOULD**

**User Story:**
> Là Kỹ thuật viên, em muốn xem điểm trung bình và các nhận xét từ khách hàng đối với các phiếu do chính em xử lý để tự cải thiện chất lượng công việc.

**Tiêu chí chấp nhận:**
* **GWT10:** Given em là Kỹ thuật viên đã đăng nhập vào hệ thống, When em vào mục "Khảo sát cá nhân", Then hệ thống chỉ truy vấn và hiển thị các bản ghi khảo sát gắn liền với `technician_id` của em.
* **GWT11 – Ngoại lệ:** Given em là Kỹ thuật viên, When em cố gắng truy cập đường dẫn báo cáo của kỹ thuật viên khác hoặc báo cáo toàn trạm, Then hệ thống từ chối truy cập và báo lỗi thiếu quyền hạn (403 Forbidden).

### US06 – Chỉnh sửa đánh giá khảo sát
**MoSCoW: WON'T**

**User Story:**
> Là Khách hàng, em muốn chỉnh sửa lại mức điểm sao hoặc nhận xét sau khi đã nộp form khảo sát để thay đổi ý kiến cá nhân.

**Tiêu chí chấp nhận:**
* **GWT12:** Given bản ghi khảo sát đã được lưu thành công vào CSDL, When khách hàng hoặc bất kỳ người dùng nào yêu cầu cập nhật, Then hệ thống không cung cấp tính năng này nhằm đảm bảo tính khách quan và tính toàn vẹn dữ liệu.

---

## 3. Use Case

### 3.1. Danh sách Use Case
| Mã   | Use Case                                | Actor chính                             | MoSCoW |
| ---- | --------------------------------------- | --------------------------------------- | ------ |
| UC01 | Tra cứu thông tin phiếu bảo hành        | Khách hàng                              | MUST   |
| UC02 | Gửi đánh giá CSAT                       | Khách hàng                              | MUST   |
| UC03 | Kiểm tra điều kiện QT-10 & Chống trùng  | Hệ thống Smart CRM                      | MUST   |
| UC04 | Xem báo cáo CSAT theo kỹ thuật viên     | Quản lý trung tâm                       | MUST   |
| UC05 | Lọc danh sách phản hồi khảo sát         | Quản lý trung tâm                       | SHOULD |
| UC06 | Xem phản hồi CSAT cá nhân               | Kỹ thuật viên                           | SHOULD |

### 3.2. Trách nhiệm
| Đối tượng           | Trách nhiệm                                                                                                 |
| ------------------- | ----------------------------------------------------------------------------------------------------------- |
| Khách hàng          | Tra cứu mã phiếu, chọn điểm số CSAT (1-5 sao) và nhập ý kiến nhận xét.                                     |
| Quản lý trung tâm   | Theo dõi báo cáo CSAT tổng hợp, lọc danh sách đánh giá xấu (1-2 sao) để xử lý khiếu nại.                    |
| Kỹ thuật viên       | Đăng nhập xem tổng kết điểm CSAT trung bình và nhận xét đối với các phiếu do chính mình hoàn thành.         |
| Hệ thống Smart CRM  | Tự động kiểm tra trạng thái phiếu `DA_DONG`, chặn gửi trùng lặp, lưu dữ liệu khảo sát và băm/che số điện thoại.|

---

## 4. Yêu cầu chức năng

| Mã   | Yêu cầu                                                                                                    |
| ---- | ---------------------------------------------------------------------------------------------------------- |
| FR01 | Hệ thống cho phép tra cứu thông tin tóm tắt của phiếu bảo hành bằng mã phiếu.                              |
| FR02 | Hệ thống cho phép tiếp nhận thông tin đánh giá CSAT (thang điểm 1-5) kèm nhận xét văn bản từ khách hàng.   |
| FR03 | Hệ thống kiểm tra và áp dụng quy tắc QT-10: từ chối nếu phiếu chưa `DA_DONG` hoặc đã được khảo sát.        |
| FR04 | Hệ thống tổng hợp và cung cấp báo cáo thống kê điểm CSAT trung bình theo từng kỹ thuật viên và trung tâm. |
| FR05 | Hệ thống cung cấp chức năng truy vấn danh sách phản hồi khảo sát kèm bộ lọc theo thang điểm (1-5 sao).     |
| FR06 | Hệ thống hỗ trợ phân trang danh sách phản hồi (mặc định 20 dòng/trang).                                    |

---

## 5. Yêu cầu phi chức năng

| Mã    | Yêu cầu                                | Tiêu chí số đo cụ thể                                                      |
| ----- | -------------------------------------- | -------------------------------------------------------------------------- |
| NFR01 | Thời gian phản hồi API gửi khảo sát    | ≤ 500 ms với kết nối mạng tiêu chuẩn                                       |
| NFR02 | Thời gian tổng hợp báo cáo CSAT        | ≤ 1.5 giây với CSDL có 50.000 bản ghi                                      |
| NFR03 | Tính sẵn sàng của hệ thống (Availability)| ≥ 99.5% thời gian hoạt động                                                |
| NFR04 | Chống trùng lặp khảo sát               | 100% không phát sinh bản ghi trùng trên cùng `ticket_id` (Dùng `UNIQUE`)   |
| NFR05 | Bảo mật thông tin khách hàng           | 100% số điện thoại hiển thị trên danh sách quản lý được che dạng `090xxxx123` |
| NFR06 | Tính toàn vẹn dữ liệu                  | 100% bản ghi khảo sát không được phép chỉnh sửa (`UPDATE`) hay xóa (`DELETE`) |

---

## 6. Truy vết yêu cầu

| User Story | Use Case | Functional Requirement | Bảng dữ liệu CSDL | Màn hình Wireframe |
| ---------- | -------- | ---------------------- | ----------------- | ------------------ |
| US01       | UC01     | FR01                   | `warranty_tickets`, `customers` | M1: Form Khảo sát CSAT |
| US02       | UC02     | FR02                   | `survey_responses` | M1: Form Khảo sát CSAT |
| US02       | UC03     | FR03                   | `warranty_tickets` | M1: Form Khảo sát CSAT |
| US03       | UC04     | FR04                   | `technicians`, `survey_responses` | M2: Báo cáo CSAT theo KTV |
| US04       | UC05     | FR05, FR06             | `survey_responses` | M3: Danh sách & Lọc phản hồi |
| US05       | UC06     | FR04, FR05             | `survey_responses` | M2: Báo cáo CSAT theo KTV |

---

# API CONTRACT – TRACK SE (LUỒNG L8)

## API 1 – Tra cứu phiếu bảo hành trước khảo sát
**GET `/api/tickets/{ticket_code}/summary`**

Mục đích: Cho phép khách hàng tra cứu thông tin tóm tắt phiếu bảo hành trước khi điền form khảo sát.

**Response thành công – 200 OK**
```json
{
  "ticket_id": 1052,
  "ticket_code": "WT-2026-1052",
  "device_name": "iPhone 13 Pro Max",
  "technician_name": "Nguyen Van A",
  "status": "DA_DONG",
  "can_survey": true
}
Không tìm thấy mã phiếu – 404 Not Found

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
