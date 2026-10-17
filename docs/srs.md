# SRS RÚT GỌN – SMART CRM MEKONG MOBILE

## 1. Tổng quan

### 1.1. Phạm vi
Đề tài tập trung vào **Luồng L8 – Khảo sát hài lòng CSAT/NPS** trong hệ thống Smart CRM của Mekong Mobile.

Trong phạm vi này, phân hệ tập trung vào quá trình hệ thống tự động cung cấp biểu mẫu và tiếp nhận đánh giá mức độ hài lòng của khách hàng sau khi phiếu bảo hành đã hoàn tất sửa chữa và chuyển sang trạng thái ĐÃ_ĐÓNG (`DA_DONG`). Quy trình gồm các bước chính: tra cứu thông tin tóm tắt phiếu bảo hành, kiểm tra và áp dụng quy tắc nghiệp vụ QT-10 (chỉ cho phép khảo sát phiếu đã đóng và ngăn chặn gửi trùng lặp), tiếp nhận điểm CSAT (thang điểm 1-5 sao) kèm nhận xét văn bản, tổng hợp báo cáo chỉ số CSAT theo kỹ thuật viên/trạm bảo hành, và truy vấn danh sách phản hồi hỗ trợ phân trang, lọc theo điểm số.

### 1.2. Người dùng chính
- **Khách hàng:** là người trực tiếp nhận máy sau bảo hành, tra cứu thông tin phiếu và điền form đánh giá CSAT (1-5 sao) kèm ý kiến đóng góp.
- **Quản lý trung tâm:** xem danh sách phản hồi khảo sát, lọc theo số sao, theo dõi báo cáo thống kê chỉ số CSAT trung bình của từng kỹ thuật viên và các trạm bảo hành để đánh giá chất lượng dịch vụ.
- **Kỹ thuật viên:** xem điểm CSAT trung bình và danh sách nhận xét chi tiết đối với các phiếu bảo hành do chính mình xử lý.

### 1.3. Các thực thể liên quan
Trong quá trình phân tích, các thực thể CSDL chính gồm:
- `customer`: lưu trữ thông tin khách hàng (họ tên, số điện thoại, email).
- `technician`: lưu trữ thông tin kỹ thuật viên sửa chữa và trạm làm việc.
- `warranty_ticket`: hồ sơ phiếu bảo hành thiết bị (mã phiếu, trạng thái, ngày đóng).
- `survey_response`: bản ghi kết quả khảo sát CSAT (điểm số 1-5, nhận xét, thời gian gửi).

### 1.4. Bảng thuật ngữ & Quy tắc nghiệp vụ
| Thuật ngữ / Quy tắc | Giải thích & Ràng buộc chi tiết |
|---|---|
| CRM | Customer Relationship Management – hệ thống quản lý quan hệ khách hàng |
| CSAT | Customer Satisfaction Score – chỉ số đo lường mức độ hài lòng của khách hàng (thang điểm 1 đến 5 sao) |
| Warranty Ticket | Phiếu bảo hành/sửa chữa thiết bị của khách hàng |
| **QT-10** | Quy tắc nghiệp vụ quy định chỉ cho phép gửi khảo sát khi phiếu bảo hành ở trạng thái ĐÃ_ĐÓNG (`DA_DONG`) và mỗi `ticket_id` chỉ được khảo sát duy nhất 1 lần (sử dụng ràng buộc `UNIQUE`). |
| **QT-11** | Tính bất biến của đánh giá: Phản hồi khảo sát sau khi đã lưu vào CSDL không được phép sửa (`UPDATE`) hay xóa (`DELETE`) bởi bất kỳ người dùng nào. |
| **QT-12** | Thang điểm CSAT hợp lệ: Điểm đánh giá `csat_score` bắt buộc phải là số nguyên từ 1 đến 5 sao (`CHECK (csat_score BETWEEN 1 AND 5)`). |
| Unique Constraint | Ràng buộc duy nhất trong CSDL đảm bảo không trùng lặp dữ liệu khảo sát. |
| MoSCoW | Phương pháp phân loại mức độ ưu tiên yêu cầu: MUST, SHOULD, COULD, WON'T |

---

## 2. User Story

### US01 – Tra cứu thông tin phiếu bảo hành
**MoSCoW: MUST**

**User Story:**
> Là Khách hàng, tôi muốn tra cứu thông tin tóm tắt phiếu bảo hành bằng mã phiếu để xác nhận đúng thông tin thiết bị và kỹ thuật viên xử lý trước khi điền form đánh giá.

**Tiêu chí chấp nhận:**
- **GWT01:** Given tôi nhập mã phiếu bảo hành hợp lệ và tồn tại trên hệ thống (ví dụ: `WT-1052`), When tôi thực hiện tra cứu, Then hệ thống hiển thị thông tin tóm tắt gồm tên thiết bị, họ tên kỹ thuật viên xử lý và trạng thái hiện tại của phiếu.
- **GWT02 – Ngoại lệ:** Given tôi nhập mã phiếu không tồn tại trong CSDL, When tôi thực hiện tra cứu, Then hệ thống hiển thị thông báo lỗi "Mã phiếu bảo hành không tồn tại" và không hiển thị form khảo sát.

### US02 – Gửi đánh giá CSAT
**MoSCoW: MUST**

**User Story:**
> Là Khách hàng, tôi muốn gửi điểm đánh giá CSAT (từ 1 đến 5 sao) và nhận xét cá nhân cho phiếu bảo hành đã hoàn thành để phản hồi chất lượng phục vụ của kỹ thuật viên.

**Tiêu chí chấp nhận:**
- **GWT03:** Given phiếu bảo hành đang ở trạng thái `DA_DONG` và chưa từng thực hiện khảo sát, When tôi chọn mức điểm từ 1 đến 5 sao và bấm gửi, Then hệ thống lưu bản ghi khảo sát vào CSDL và hiển thị thông báo cảm ơn khách hàng.
- **GWT04 – Ngoại lệ (Vi phạm QT-10):** Given phiếu bảo hành chưa ở trạng thái `DA_DONG` (đang `TIEP_NHAN` hoặc `DANG_SUA`), When tôi cố gắng gửi khảo sát, Then hệ thống từ chối ghi nhận, hiển thị thông báo "Phiếu sửa chữa chưa hoàn tất, quý khách vui lòng khảo sát sau khi nhận máy".
- **GWT05 – Ngoại lệ (Gửi trùng lặp):** Given phiếu bảo hành đã từng được gửi khảo sát trước đó, When tôi cố gắng gửi lại khảo sát cho phiếu này, Then hệ thống từ chối tiếp nhận và thông báo "Phiếu bảo hành này đã được hoàn tất khảo sát trước đó".

### US03 – Xem báo cáo CSAT theo Kỹ thuật viên & Trung tâm
**MoSCoW: MUST**

**User Story:**
> Là Quản lý trung tâm, tôi muốn xem báo cáo thống kê điểm CSAT trung bình theo từng kỹ thuật viên và toàn trung tâm để đánh giá năng lực chuyên môn và thái độ phục vụ của nhân viên.

**Tiêu chí chấp nhận:**
- **GWT06:** Given tôi truy cập vào trang báo cáo quản lý, When tôi chọn kỳ báo cáo và trạm bảo hành, Then hệ thống hiển thị bảng điểm gồm các cột: Mã KTV, Họ tên, Tổng số phiếu đã đóng, Số lượt khảo sát, Điểm CSAT trung bình (thang điểm 1.0 - 5.0) và Tỷ lệ đánh giá 5 sao.
- **GWT07:** Given kỹ thuật viên chưa có lượt khảo sát nào trong kỳ, When hệ thống xuất báo cáo, Then cột điểm CSAT trung bình hiển thị dạng "N/A" hoặc "Chưa có đánh giá".

### US04 – Lọc danh sách phản hồi theo thang điểm
**MoSCoW: SHOULD**

**User Story:**
> Là Quản lý trung tâm, tôi muốn lọc danh sách các phản hồi khảo sát theo mức điểm sao (từ 1 đến 5 sao) để nhanh chóng phát hiện và xử lý các trường hợp khách hàng không hài lòng.

**Tiêu chí chấp nhận:**
- **GWT08:** Given tôi đang ở trang danh sách phản hồi, When tôi chọn bộ lọc "1 sao" hoặc "2 sao", Then hệ thống chỉ hiển thị các bản ghi khảo sát có điểm `csat_score` tương ứng.
- **GWT09:** Given tôi chọn xem chi tiết một phản hồi, When hệ thống hiển thị, Then số điện thoại của khách hàng được che mặt nạ bảo mật dạng `090xxxx123`.

### US05 – Kỹ thuật viên xem phản hồi cá nhân
**MoSCoW: SHOULD**

**User Story:**
> Là Kỹ thuật viên, tôi muốn xem điểm trung bình và các nhận xét từ khách hàng đối với các phiếu do chính tôi xử lý để tự cải thiện chất lượng công việc.

**Tiêu chí chấp nhận:**
- **GWT10:** Given tôi là Kỹ thuật viên đã đăng nhập vào hệ thống, When tôi vào mục "Khảo sát cá nhân", Then hệ thống chỉ truy vấn và hiển thị các bản ghi khảo sát gắn liền với `technician_id` của tôi.
- **GWT11 – Ngoại lệ:** Given tôi là Kỹ thuật viên, When tôi cố gắng truy cập đường dẫn báo cáo của kỹ thuật viên khác hoặc báo cáo toàn trạm, Then hệ thống từ chối truy cập và báo lỗi thiếu quyền hạn (403 Forbidden).

### US06 – Chỉnh sửa đánh giá khảo sát
**MoSCoW: WON'T**

**User Story:**
> Là Khách hàng, tôi muốn chỉnh sửa lại mức điểm sao hoặc nhận xét sau khi đã nộp form khảo sát để thay đổi ý kiến cá nhân.

**Tiêu chí chấp nhận:**
- **GWT12:** Given bản ghi khảo sát đã được lưu thành công vào CSDL, When khách hàng hoặc bất kỳ người dùng nào yêu cầu cập nhật, Then hệ thống không cung cấp tính năng này theo quy tắc QT-11 nhằm đảm bảo tính khách quan và tính toàn vẹn dữ liệu.

---

## 3. Use Case

### 3.1. Danh sách Use Case (Chuẩn 6 Use Case)
| Mã   | Use Case                                | Actor chính                             | MoSCoW |
| ---- | --------------------------------------- | --------------------------------------- | ------ |
| UC01 | Tra cứu thông tin phiếu bảo hành        | Khách hàng                              | MUST   |
| UC02 | Gửi đánh giá CSAT                       | Khách hàng                              | MUST   |
| UC03 | Kiểm tra điều kiện QT-10 & Chống trùng  | Hệ thống Smart CRM                      | MUST   |
| UC04 | Xem báo cáo CSAT theo kỹ thuật viên     | Quản lý trung tâm                       | MUST   |
| UC05 | Lọc danh sách phản hồi khảo sát         | Quản lý trung tâm                       | SHOULD |
| UC06 | Xem phản hồi CSAT cá nhân               | Kỹ thuật viên                           | SHOULD |

### 3.2. Đặc tả chi tiết Use Case: UC02 – Submit CSAT Rating (Gửi đánh giá CSAT)
- **Use Case ID:** UC02
- **Use Case Name:** Submit CSAT Rating (Gửi đánh giá CSAT)
- **Primary Actor:** Khách hàng (End User)
- **Pre-conditions (Điều kiện tiền đề):**
  1. Khách hàng tra cứu phiếu bảo hành thành công và phiếu có trạng thái `status = 'DA_DONG'`.
  2. Phiếu bảo hành chưa từng gửi đánh giá khảo sát (chưa tồn tại `ticket_id` trong bảng `survey_responses`).
- **Post-conditions (Điều kiện sau thực hiện):**
  1. Bản ghi khảo sát được lưu thành công vào bảng `survey_responses` (`survey_id`, `ticket_id`, `csat_score`, `comment`, `created_at`).
  2. Hệ thống ghi nhận trạng thái phiếu đã hoàn thành khảo sát để chặn các lần gửi tiếp theo.

#### Main Flow (Luồng chính):
1. Khách hàng xem thông tin phiếu bảo hành và bấm chọn mức điểm đánh giá từ 1 đến 5 sao (`csat_score`).
2. Khách hàng nhập nội dung nhận xét chi tiết (`comment` - không bắt buộc).
3. Khách hàng nhấn nút "GỬI ĐÁNH GIÁ".
4. Hệ thống gọi Use Case **UC03: Kiểm tra điều kiện QT-10 & Chống trùng**.
5. Hệ thống ghi nhận thông tin đánh giá vào bảng `survey_responses`.
6. Hệ thống hiển thị thông báo "Cảm ơn quý khách đã gửi đánh giá" và hoàn tất Use Case.

#### Alternative Flows (Luồng rẽ nhánh):
- **4a. Vi phạm quy tắc QT-10 (Phiếu chưa ở trạng thái `DA_DONG`):**
  1. Hệ thống phát hiện `status != 'DA_DONG'`.
  2. Hệ thống hiển thị thông báo lỗi: *"Phiếu sửa chữa chưa hoàn tất, quý khách vui lòng khảo sát sau khi nhận máy."*
  3. Use Case kết thúc mà không lưu dữ liệu.
- **4b. Vi phạm chống gửi trùng (Đã có bản ghi khảo sát trong CSDL):**
  1. Hệ thống phát hiện `ticket_id` đã tồn tại trong bảng `survey_responses`.
  2. Hệ thống hiển thị thông báo lỗi: *"Phiếu bảo hành này đã được hoàn tất khảo sát trước đó."*
  3. Use Case kết thúc.

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

## 6. Bảng Truy vết Yêu cầu (Traceability Matrix)

| User Story | Use Case | Functional Requirement | Bảng dữ liệu CSDL | Màn hình Wireframe | MoSCoW |
| ---------- | -------- | ---------------------- | ----------------- | ------------------ | :---: |
| US01       | UC01     | FR01                   | `warranty_tickets`, `customers` | M1: Form Khảo sát CSAT | **MUST** |
| US02       | UC02     | FR02                   | `survey_responses` | M1: Form Khảo sát CSAT | **MUST** |
| US02       | UC03     | FR03                   | `warranty_tickets` | M1: Form Khảo sát CSAT | **MUST** |
| US03       | UC04     | FR04                   | `technicians`, `survey_responses` | M2: Báo cáo CSAT theo KTV | **MUST** |
| US04       | UC05     | FR05, FR06             | `survey_responses` | M3: Danh sách & Lọc phản hồi | **SHOULD** |
| US05       | UC06     | FR04, FR05             | `survey_responses` | M2: Báo cáo CSAT theo KTV | **SHOULD** |
