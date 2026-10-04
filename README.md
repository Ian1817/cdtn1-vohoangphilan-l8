# Hệ thống Quản lý và Thu thập Khảo sát Hài lòng (CSAT/NPS) - Mekong Mobile

- **Sinh viên**: Võ Hoàng Phi Lân - 2374802010269
- **Học phần**: Chuyên đề Tốt nghiệp 1 (HK1 2026-2027)
- **Track**: SE (Node.js/Express)
- **Luồng nghiệp vụ**: L8 - Khảo sát hài lòng CSAT / NPS

## 1. Mục tiêu
Hệ thống cung cấp dịch vụ backend hỗ trợ tự động hóa việc tiếp nhận phản hồi khảo sát CSAT (thang điểm 1-5) kèm nhận xét từ khách hàng sau khi phiếu bảo hành đã đóng (tuân thủ quy tắc QT-10), ngăn chặn khảo sát trùng lặp và cung cấp API báo cáo điểm trung bình theo kỹ thuật viên cùng trung tâm bảo hành.

## 2. Yêu cầu môi trường
- Node.js v20+ LTS (hiện hành: Node.js v24)
- Express framework
- Biến môi trường: xem file \.env.example\

## 3. Hướng dẫn chạy
\\\ash
cp .env.example .env
npm install
npm start
\\\
Mở trình duyệt: http://localhost:3000/health

## 4. Cấu trúc thư mục
- \docs/\: Chứa tài liệu đặc tả SRS, API Contract, AI Disclosure và minh chứng Smoke Test.
- \src/\: Mã nguồn chính của ứng dụng backend (Express).
- \	ests/\: Chứa các kịch bản kiểm thử tự động.
- \data/\: Thư mục lưu trữ dữ liệu mẫu/mô phỏng.

## 5. Kiểm thử
\\\ash
npm test
\\\

## 6. Trạng thái hiện tại
- [x] Khởi tạo project, smoke test chạy được (buổi 2)
- [ ] Module tiếp nhận khảo sát và kiểm soát QT-10 (buổi 8-10)
- [ ] Module báo cáo thống kê chỉ số CSAT theo kỹ thuật viên & trung tâm (buổi 10-12)
