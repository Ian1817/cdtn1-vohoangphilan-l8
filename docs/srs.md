# Bản Đặc tả Yêu cầu Phần mềm (SRS rút gọn) - Luồng L8
*Tham chiếu: Rút gọn theo tinh thần chuẩn ISO/IEC/IEEE 29148*

- **Dự án**: Hệ thống Quản lý Khảo sát Hài lòng (CSAT/NPS) - Mekong Mobile
- **Sinh viên thực hiện**: Võ Hoàng Phi Lân - MSSV: 2374802010269
- **Track**: SE (Node.js/Express) - **Luồng nghiệp vụ**: L8

---

## 1. Giới thiệu và Phạm vi
- **Bối cảnh doanh nghiệp**: Mekong Mobile cần hệ thống hóa việc đo lường mức độ hài lòng của khách hàng sau sửa chữa bảo hành (giải quyết vấn đề V7). Trước đây việc này làm thủ công hoặc bỏ sót, dẫn đến không nắm bắt được chất lượng dịch vụ thực tế của các trạm.
- **Phạm vi hệ thống**: Cung cấp API backend tiếp nhận đánh giá CSAT (thang điểm 1-5), kiểm soát chặt chẽ điều kiện đóng phiếu theo quy tắc QT-10, chống gửi trùng lặp, và tổng hợp báo cáo điểm trung bình theo kỹ thuật viên cùng trung tâm.
- **Điều chủ ý không làm (MoSCoW - WON'T)**: Không cho phép chỉnh sửa hoặc xóa đánh giá sau khi đã lưu; không tích hợp cổng gửi SMS/Zalo OTP ở giai đoạn prototype này.
- **Bảng thuật ngữ nhất quán**:
  - *Phiếu bảo hành (warranty_ticket)*: Hồ sơ sửa chữa thiết bị của khách hàng.
  - *Phiếu khảo sát (survey_response)*: Bản ghi phản hồi đánh giá của khách hàng cho một phiếu bảo hành.
  - *Điểm CSAT (Customer Satisfaction Score)*: Thang điểm số nguyên từ 1 (rất không hài lòng) đến 5 (rất hài lòng).
  - *QT-10*: Quy tắc nghiệp vụ quy định chỉ cho phép khảo sát khi phiếu bảo hành ở trạng thái ĐÃ_ĐÓNG.

## 2. Các bên liên quan và Vai trò người dùng (Actors)
| Vai trò (Actor) | Trách nhiệm chính trong hệ thống | Giới hạn quyền hạn |
| :--- | :--- | :--- |
| **Khách hàng** | Tra cứu thông tin phiếu và gửi biểu mẫu đánh giá CSAT kèm nhận xét. | Chỉ gửi khảo sát một lần cho mỗi phiếu đã đóng; không xem được khảo sát của người khác. |
| **Quản lý trung tâm** | Xem danh sách đánh giá, lọc theo điểm số, xem báo cáo tổng hợp chỉ số CSAT của KTV và các trung tâm. | Xem toàn bộ báo cáo phân tích nhưng không được sửa hay xóa phản hồi của khách. |
| **Kỹ thuật viên** | Xem điểm CSAT trung bình và nhận xét từ các phiếu do chính mình xử lý. | Không xem được báo cáo tổng thể của trung tâm hoặc của kỹ thuật viên khác. |

## 3. Yêu cầu Chức năng (Functional Requirements - FR)
- **FR1**: Hệ thống cho phép tiếp nhận thông tin đánh giá CSAT (thang điểm 1-5) kèm nhận xét từ khách hàng cho một phiếu bảo hành cụ thể.
- **FR2**: Hệ thống kiểm tra và áp dụng quy tắc QT-10: từ chối tiếp nhận khảo sát nếu phiếu bảo hành chưa ở trạng thái ĐÃ_ĐÓNG hoặc đã từng được khảo sát trước đó.
- **FR3**: Hệ thống cho phép tra cứu thông tin tóm tắt của phiếu bảo hành bằng mã phiếu để phục vụ kiểm tra tính hợp lệ trước khi hiển thị form khảo sát.
- **FR4**: Hệ thống tổng hợp và cung cấp báo cáo thống kê điểm CSAT trung bình, tổng số phản hồi theo từng kỹ thuật viên và theo trung tâm bảo hành.
- **FR5**: Hệ thống cung cấp chức năng truy vấn danh sách phản hồi khảo sát kèm bộ lọc theo thang điểm (1-5) và hỗ trợ phân trang dữ liệu.

## 4. Yêu cầu Phi chức năng (Non-Functional Requirements - NFR)
- **NFR1 (Hiệu năng)**: API tiếp nhận khảo sát (POST /api/surveys) có thời gian phản hồi trung bình dưới 500ms; API báo cáo thống kê (GET /api/reports/csat-technicians) phản hồi dưới 1.5 giây với cơ sở dữ liệu có 50.000 bản ghi.
- **NFR2 (Bảo mật)**: Che dấu số điện thoại của khách hàng (dạng 090xxxx123) khi hiển thị trên giao diện hoặc API trả về cho kỹ thuật viên; mật khẩu và thông tin xác thực quản lý được băm bằng thuật toán an toàn trước khi lưu.
- **NFR3 (Tính tin cậy & Toàn vẹn)**: Đảm bảo 100% không xảy ra tình trạng trùng lặp đánh giá trên cùng một mã phiếu bảo hành thông qua ràng buộc cơ sở dữ liệu duy nhất (UNIQUE constraint trên cột ticket_id).

## 5. Ràng buộc và Quy tắc nghiệp vụ
- **QT-10 (Kiểm soát trạng thái phiếu)**: Phiếu khảo sát chỉ được tạo thành công khi phiếu bảo hành tương ứng mang trạng thái 'DA_DONG'.
- **Ràng buộc thang điểm**: Điểm CSAT bắt buộc là số nguyên có giá trị nằm trong đoạn [1, 5].
- **Ràng buộc duy nhất**: Mỗi phiếu bảo hành chỉ có tối đa 1 bản ghi khảo sát trong toàn bộ hệ thống.
- **Quy tắc bất biến**: Bản ghi khảo sát sau khi đã lưu vào cơ sở dữ liệu không được phép cập nhật (UPDATE) hoặc xóa vật lý (DELETE).

## 6. Bảng truy vết yêu cầu (Traceability Matrix)
| Mã FR | Tên yêu cầu chức năng | User Story | Use Case | MoSCoW | Test Case (BT3) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **FR1** | Tiếp nhận đánh giá CSAT kèm nhận xét | US1 | UC2 | MUST | TC01, TC02 |
| **FR2** | Kiểm soát trạng thái theo quy tắc QT-10 và chống trùng lặp | US1 | UC3 | MUST | TC03, TC04 |
| **FR3** | Tra cứu thông tin tóm tắt phiếu bảo hành | US2 | UC1 | MUST | TC05, TC06 |
| **FR4** | Tổng hợp báo cáo chỉ số CSAT theo kỹ thuật viên | US3 | UC4 | MUST | TC07, TC08 |
| **FR5** | Lọc danh sách phản hồi khảo sát theo thang điểm | US4 | UC5 | SHOULD | TC09 |
