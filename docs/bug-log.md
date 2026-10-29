\# Nhật ký sửa lỗi (Bug Log)



\## BUG-001 · Major — Lỗi CORS khi gọi API từ Frontend

\- \*\*Phát hiện bởi:\*\* Chạy thử giao diện M1, bấm "Tra cứu" nhưng báo lỗi đỏ.

\- \*\*Triệu chứng:\*\* Trình duyệt báo lỗi `Access to fetch at ... has been blocked by CORS policy`.

\- \*\*Cách tái lập:\*\* Bật Frontend (5173) và Backend (3000), bấm nút Tra cứu.

\- \*\*Nguyên nhân:\*\* Backend chưa cấu hình cho phép Frontend (khác cổng) truy cập vào API.

\- \*\*Cách sửa:\*\* Cài thư viện `cors`, thêm `app.use(cors())` vào file `src/server.js`.

\- \*\*Commit và xác nhận:\*\* Commit `fix: them cau hinh CORS cho backend`. Giao diện gọi API thành công.



\## BUG-002 · Minor — Nút "Tải lại" bị lỗi font chữ

\- \*\*Phát hiện bởi:\*\* Quan sát giao diện M3.

\- \*\*Triệu chứng:\*\* Nút hiển thị 2 ô vuông thay vì chữ.

\- \*\*Nguyên nhân:\*\* Lỗi encoding ký tự khi copy code.

\- \*\*Cách sửa:\*\* Đổi text nút thành "Refresh" hoặc gõ lại tiếng Việt có dấu.

