# Checklist bảo mật - BT3 (Track SE)

## 1. Không có secret nào trong repo — ĐÃ LÀM
- **Minh chứng:** Chạy lệnh `git log --all --oneline -- .env` → kết quả rỗng.
- **Minh chứng:** Chạy lệnh `findstr /s /i /n "password api_key secret" src\*.js` → chỉ tìm thấy tên biến `process.env.DB_PASSWORD`, không có giá trị thật.
- **Ảnh:** `docs/screenshots/sec-verify.png`

## 2. Dữ liệu vào được kiểm ở tầng ứng dụng — ĐÃ LÀM
- **Minh chứng:** Test case TC-09 (thiếu csat_score → 400), TC-11 (csat=6 → 400), TC-18 (comment < 10 → 400).
- **Ảnh:** `docs/screenshots/TC-09.png`

## 3. Kiểm soát truy cập theo chủ sở hữu — CHƯA LÀM
- **Lý do:** Hệ thống chưa có cơ chế đăng nhập phân quyền theo chủ sở hữu. Sẽ bổ sung ở phiên bản sau.

## 4. Mật khẩu được băm — KHÔNG ÁP DỤNG
- **Lý do:** Hệ thống chưa có bảng users, chưa có chức năng đăng nhập bằng mật khẩu (chỉ có đăng nhập giả lập admin/123456 ở Frontend).

## 5. Thông báo lỗi không lộ cấu trúc trong — ĐÃ LÀM
- **Minh chứng:** Gọi API sai `GET /api/khong-ton-tai` → trả về lỗi 404 chung, không có stack trace.
- **Ảnh:** `docs/screenshots/sec-5.png`

## 6. Nhật ký không ghi secret, dữ liệu cá nhân — ĐÃ LÀM
- **Minh chứng:** Chạy lệnh `docker compose logs app | findstr /i "password token secret"` → không có kết quả (chỉ có cảnh báo về version).
- **Ảnh:** `docs/screenshots/sec-verify.png`

## 7. Phụ thuộc ghim phiên bản, đã kiểm lỗ hổng — ĐÃ LÀM
- **Minh chứng:** File `package-lock.json` đã commit. Chạy `npm ls --depth=0` → danh sách thư viện với phiên bản cụ thể.
- **Ảnh:** `docs/screenshots/sec-verify.png`