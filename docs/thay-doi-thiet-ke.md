# Nhật ký thay đổi thiết kế

## Sau phản hồi Bài tập 1 (buổi 8, ngày 17/10/2026)

### TD-01 Đồng bộ danh sách Use Case giữa SRS và sơ đồ Use Case
- Phản hồi của GV : Danh sách UC ở SRS có 6 UC nhưng sơ đồ có 7 UC và đánh số lệch (UC6, UC7).
- Quyết định     : SỬA
- Lý do          : Cắt bỏ UC7 thừa trên sơ đồ, gộp tính năng xem báo cáo tổng hợp vào UC04 để đảm bảo tính nhất quán giữa tài liệu SRS và sơ đồ thiết kế.
- Ảnh hưởng      : Cập nhật file docs/srs.md và vẽ lại sơ đồ usecase.drawio.

### TD-02 Chuẩn hóa thuật ngữ trong đặc tả UC02 khớp với ERD
- Phản hồi của GV : Đặc tả UC2 dùng CSAT_Responses, Survey_Token, hạn 72h, trạng thái ABANDONED – các khái niệm này không có trong ERD và Bảng thuật ngữ.
- Quyết định     : SỬA
- Lý do          : Đồng bộ tên thực thể và thuộc tính với CSDL PostgreSQL thực tế để tránh mâu thuẫn khi lập trình backend.
- Ảnh hưởng      : Thay thế bằng warranty_tickets, survey_responses, ticket_id, csat_score, status = 'DA_DONG' trong đặc tả UC02 tại docs/srs.md.

### TD-03 Bổ sung Quy tắc nghiệp vụ và Ràng buộc
- Phản hồi của GV : SRS thiếu mục Ràng buộc và quy tắc nghiệp vụ (cần ≥ 3 quy tắc).
- Quyết định     : SỬA
- Lý do          : Bổ sung các quy tắc định lượng cụ thể làm căn cứ viết logic kiểm tra (validation) cho API.
- Ảnh hưởng      : Thêm quy tắc QT-10 (chỉ khảo sát phiếu đã đóng & chống trùng), QT-11 (tính bất biến không cho sửa/xóa), QT-12 (thang điểm 1-5 sao) vào Bảng thuật ngữ & Quy tắc nghiệp vụ tại docs/srs.md.

### TD-04 Bổ sung cột MoSCoW vào Bảng truy vết yêu cầu
- Phản hồi của GV : Bảng truy vết chưa có cột MoSCoW.
- Quyết định     : SỬA
- Lý do          : Phân loại mức độ ưu tiên triển khai tính năng theo đúng phương pháp luận Software Engineering.
- Ảnh hưởng      : Thêm cột MoSCoW vào Mục 6 (Traceability Matrix) tại docs/srs.md.

### TD-05 Bổ sung khung chú thích Ký hiệu (Legend) cho các sơ đồ .drawio
- Phản hồi của GV : Các sơ đồ chưa có khung Legend giải thích ký hiệu.
- Quyết định     : SỬA
- Lý do          : Giúp người đọc dễ dàng phân biệt các ký hiệu màu sắc, actor và các mối quan hệ include/extend.
- Ảnh hưởng      : Thêm khung Legend trực quan vào cả 4 file sơ đồ trong docs/ (usecase.drawio, architecture.drawio, wireframe.drawio, erd.drawio).
