# Quản lý thu thập và thống kê phản hồi khảo sát hài lòng (CSAT) sau bảo hành
Sinh viên:
Võ Hoàng Phi Lân - 2374802010269 - Track SE
Học phần:
Chuyên đề Tốt nghiệp 1, HK1 2026-2027
Luồng nghiệp vụ:
L8 - Khảo sát hài lòng CSAT / NPS

## 1. Mục tiêu
Hệ thống cung cấp dịch vụ backend giúp Mekong Mobile tự động hóa việc thu thập phản hồi đánh giá của khách hàng sau khi hoàn tất sửa chữa bảo hành (giải quyết vấn đề V7). Dịch vụ tiếp nhận điểm đánh giá CSAT (thang điểm 1-5) kèm nhận xét khi phiếu ở trạng thái Đã đóng (tuân thủ quy tắc QT-10), ngăn chặn khảo sát trùng lặp và cung cấp API báo cáo điểm trung bình theo kỹ thuật viên cùng trung tâm bảo hành.

## 2. Yêu cầu môi trường
Node.js 20 LTS (hoặc mới hơn)
Express framework
Biến môi trường: xem .env.example

## 3. Hướng dẫn chạy
(BT2 yêu cầu <= 4 bước)
cp .env.example .env và điền giá trị
npm install
npm start
Mở http://localhost:3000/health

## 4. Cấu trúc thư mục
- docs/: Chứa tài liệu đặc tả SRS, API Contract, sơ đồ Use Case và khai báo AI.
- src/: Mã nguồn ứng dụng backend (Express server, routes, controllers, middleware).
- tests/: Kịch bản kiểm thử tự động (Unit Test / Integration Test).
- data/: Dữ liệu mẫu phục vụ kiểm thử và mô phỏng.

## 5. Kiểm thử
npm test -> hiển thị số test PASS

## 6. Trạng thái hiện tại
[x] Khởi tạo project, smoke test chạy được (buổi 2)
[ ] Module tiếp nhận khảo sát và kiểm soát QT-10 (buổi 8-10)
[ ] Module báo cáo chỉ số CSAT theo kỹ thuật viên và trung tâm (buổi 10-12)
