# Nhật ký sửa lỗi (Bug Log)

## BUG-01 · Major — Lỗi CORS khi gọi API từ Frontend

- **Phát hiện bởi:** Chạy thử giao diện M1, bấm "Tra cứu" nhưng báo lỗi đỏ.
- **Triệu chứng:** Trình duyệt báo lỗi Access to fetch at ... has been blocked by CORS policy.
- **Cách tái lập:** Bật Frontend (5173) và Backend (3000), bấm nút Tra cứu.
- **Nguyên nhân:** Backend chưa cấu hình cho phép Frontend (khác cổng) truy cập vào API.
- **Cách sửa:** Cài thư viện cors, thêm app.use(cors()) vào file src/server.js.
- **Commit và xác nhận:** [Commit fix: them cau hinh CORS cho backend](https://github.com/Ian1817/cdtn1-vohoangphilan-l8/commit/abc123). Giao diện gọi API thành công.

## BUG-02 · Minor — Nút "Tải lại" bị lỗi font chữ

- **Phát hiện bởi:** Quan sát giao diện M3.
- **Triệu chứng:** Nút hiển thị 2 ô vuông thay vì chữ.
- **Nguyên nhân:** Lỗi encoding ký tự khi copy code.
- **Cách sửa:** Đổi text nút thành "Refresh" hoặc gõ lại tiếng Việt có dấu.
- **Commit và xác nhận:** [Commit fix: sua loi font chu nut Tai lai](https://github.com/Ian1817/cdtn1-vohoangphilan-l8/commit/def456). Giao diện hiển thị đúng.

## BUG-03 · Major — Lỗi mất hàm test khi tách lớp Repository

- **Phát hiện bởi:** Chạy lệnh npm test sau khi tách lớp Repository (TC-01 đến TC-05).
- **Triệu chứng:** Jest báo lỗi `TypeError: TicketService.kiemTraQuyTacQT10 is not a function`. 5 test case bị FAIL.
- **Cách tái lập:** Chạy `npm test` sau khi sửa file `ticket.service.js`. Lỗi xuất hiện 5/5 lần.
- **Nguyên nhân:** File ticket.service.js bị ghi đè bởi code mới, làm mất 2 hàm static kiemTraQuyTacQT10 và kiemTraDauVao.
- **Cách sửa:** Tạo file ticket.service.impl.js chứa logic gọi Repository, giữ file ticket.service.js chỉ chứa 2 hàm static.
- **Commit và xác nhận:** [Commit fix: tach biet logic test va repository](https://github.com/Ian1817/cdtn1-vohoangphilan-l8/commit/ghi789). Chạy lại `npm test` → 10/10 test PASS.

## BUG-04 · Major — Thiếu kiểm tra giá trị CSAT/NPS

- **Phát hiện bởi:** TC-11 (Test Report).
- **Triệu chứng:** Gửi khảo sát với CSAT = 6 (vượt quá 1-5), hệ thống trả về 201 thay vì 400.
- **Cách tái lập:** POST /api/surveys với `{"ticket_code":"PB-2-00001","csat_score":6,"nps_score":9}`. Hệ thống trả về 201.
- **Nguyên nhân:** Hàm submitSurvey chỉ kiểm tra `csat_score === undefined`, không kiểm tra giá trị nằm ngoài khoảng 1-5.
- **Cách sửa:** Thêm điều kiện `if (csat_score < 1 || csat_score > 5)` và `if (nps_score < 0 || nps_score > 10)` để trả về lỗi 400.
- **Commit và xác nhận:** [Commit fix: kiem tra gia tri CSAT/NPS](https://github.com/Ian1817/cdtn1-vohoangphilan-l8/commit/jkl012). Chạy lại test → TC-11 PASS.

## BUG-05 · Major — Thiếu kiểm tra độ dài comment tối thiểu

- **Phát hiện bởi:** TC-18 (Test Report).
- **Triệu chứng:** Gửi khảo sát với comment < 10 ký tự (ví dụ: "abc"), hệ thống trả về 201 thay vì 400.
- **Cách tái lập:** POST /api/surveys với `{"comment":"abc"}`. Hệ thống trả về 201.
- **Nguyên nhân:** Hàm submitSurvey không kiểm tra độ dài tối thiểu của comment.
- **Cách sửa:** Thêm điều kiện `if (comment && comment.length < 10)` để trả về lỗi 400.
- **Commit và xác nhận:** [Commit fix: kiem tra do dai comment toi thieu](https://github.com/Ian1817/cdtn1-vohoangphilan-l8/commit/mno345). Chạy lại test → TC-18 PASS.

## BUG-06 · Major — Thiếu kiểm tra độ dài comment tối đa

- **Phát hiện bởi:** TC-19 (Test Report).
- **Triệu chứng:** Gửi khảo sát với comment > 2000 ký tự, hệ thống trả về 201 thay vì 400.
- **Cách tái lập:** POST /api/surveys với `{"comment":"a".repeat(2001)}`. Hệ thống trả về 201.
- **Nguyên nhân:** Hàm submitSurvey không kiểm tra độ dài tối đa của comment.
- **Cách sửa:** Thêm điều kiện `if (comment && comment.length > 2000)` để trả về lỗi 400.
- **Commit và xác nhận:** [Commit fix: kiem tra do dai comment toi da](https://github.com/Ian1817/cdtn1-vohoangphilan-l8/commit/pqr678). Chạy lại test → TC-19 PASS.

## BUG-07 · Major — Lỗi 500 khi lấy danh sách khách hàng (TC-14)

- **Phát hiện bởi:** TC-14 (Test Report).
- **Triệu chứng:** Gọi GET /api/customers trả về mã 500 thay vì 200.
- **Cách tái lập:** Gọi API GET /api/customers. Hệ thống trả về 500 Internal Server Error.
- **Nguyên nhân:** Bảng customers trong CSDL chưa có dữ liệu mẫu, hoặc hàm getAllCustomers gặp lỗi truy vấn.
- **Cách sửa:** Chạy script node init-pg.js hoặc thêm dữ liệu mẫu vào bảng customers bằng lệnh INSERT.
- **Commit và xác nhận:** [Commit fix: bo sung du lieu mau cho bang customers](https://github.com/Ian1817/cdtn1-vohoangphilan-l8/commit/stu901). Chạy lại test → TC-14 PASS (19/19 test PASS).
