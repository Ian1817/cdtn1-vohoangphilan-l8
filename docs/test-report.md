# Test Report – Luồng L8: Khảo sát CSAT/NPS (Track SE)

Dưới đây là bảng tổng hợp 19 test case đã được chạy thực tế trên môi trường Docker. Tất cả 19/19 test case đều trả về kết quả PASS.

| Mã | Tiền điều kiện | Các bước | Dữ liệu thử | Kết quả mong đợi | Ưu tiên | Kết quả thực tế | P/F |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| TC-01 | Database có phiếu PB-2-00001 (DA_DONG) | Gọi API GET /api/tickets/PB-2-00001/summary | ticket_code = "PB-2-00001" | 200 OK, JSON có ticket_code, device_name, status=DA_DONG, can_survey=true | Cao | 200 OK, JSON đúng thông tin | PASS |
| TC-02 | Database có phiếu PB-2-00001 | Gọi API GET /api/tickets/KHONG-TON-TAI/summary | ticket_code = "KHONG-TON-TAI" | 404 Not Found, error=KHONG_TIM_THAY_PHIEU | Cao | 404 Not Found | PASS |
| TC-03 | Database có phiếu PB-2-00001 | Gọi API POST /api/surveys với body JSON | csat=5, nps=9, comment="Dịch vụ tốt" | 201 Created, survey_id trả về | Cao | 201 Created | PASS |
| TC-04 | Database có phiếu PB-2-00001 | Gọi API POST /api/surveys thiếu csat_score | ticket_code=PB-2-00001 | 400 Bad Request, error=DU_LIEU_KHONG_HOP_LE | Cao | 400, DU_LIEU_KHONG_HOP_LE | PASS |
| TC-05 | Database có phiếu PB-2-00002 (DANG_XU_LY) | Gọi API POST /api/surveys với phiếu chưa đóng | ticket_code=PB-2-00002, csat=5 | 400, error=PHIEU_CHUA_DONG_KHONG_THE_KHAO_SAT | Cao | 400, PHIEU_CHUA_DONG... | PASS |
| TC-06 | Database có phiếu PB-2-00001 | Gọi API POST /api/surveys với csat=6 | csat_score=6 | 400, error=DU_LIEU_KHONG_HOP_LE | Cao | 400, DU_LIEU_KHONG_HOP_LE | PASS |
| TC-07 | Database có phiếu PB-2-00001 | Gọi API POST /api/surveys với csat=1, nps=0 | csat=1, nps=0 | 201 Created | Cao | 201 Created | PASS |
| TC-08 | Database có phiếu PB-2-00001 | Gọi API POST /api/surveys với csat=5, nps=10 | csat=5, nps=10 | 201 Created | Cao | 201 Created | PASS |
| TC-09 | Database có bảng customers | Gọi API GET /api/customers | Không có | 200 OK, mảng dữ liệu | Trung bình | 200 OK | PASS |
| TC-10 | Database có bảng surveys | Gọi API GET /api/surveys | Không có | 200 OK, mảng dữ liệu | Trung bình | 200 OK | PASS |
| TC-11 | Database có bảng reports | Gọi API GET /api/reports/csat | Không có | 200 OK, mảng báo cáo | Trung bình | 200 OK | PASS |
| TC-12 | Database có phiếu PB-2-00001 | Gọi API POST /api/surveys thiếu ticket_code | csat=5, nps=9 | 400, error=DU_LIEU_KHONG_HOP_LE | Cao | 400, DU_LIEU_KHONG_HOP_LE | PASS |
| TC-13 | Database có phiếu PB-2-00001 | Gọi API POST /api/surveys với comment < 10 ký tự | comment="abc" | 400, error=DU_LIEU_KHONG_HOP_LE | Cao | 400, DU_LIEU_KHONG_HOP_LE | PASS |
| TC-14 | Database có phiếu PB-2-00001 | Gọi API POST /api/surveys với comment > 2000 ký tự | comment="a".repeat(2001) | 400, error=DU_LIEU_KHONG_HOP_LE | Cao | 400, DU_LIEU_KHONG_HOP_LE | PASS |
| TC-15 | Database có phiếu PB-2-00001 | Gọi API POST /api/surveys với comment rỗng | comment="" | 201 Created (comment không bắt buộc) | Trung bình | 201 Created | PASS |
| TC-16 | Database có phiếu PB-2-00001 | Gọi API POST /api/surveys với csat=3 | csat=3, nps=5 | 201 Created | Cao | 201 Created | PASS |
| TC-17 | Database có phiếu PB-2-00001 | Gọi API POST /api/surveys với csat=0 | csat=0 | 400, error=DU_LIEU_KHONG_HOP_LE | Cao | 400, DU_LIEU_KHONG_HOP_LE | PASS |
| TC-18 | Database có phiếu PB-2-00001 | Gọi API POST /api/surveys với nps=11 | nps=11 | 400, error=DU_LIEU_KHONG_HOP_LE | Cao | 400, DU_LIEU_KHONG_HOP_LE | PASS |
| TC-19 | Database có phiếu PB-2-00001 | Gọi API POST /api/surveys với nps=-1 | nps=-1 | 400, error=DU_LIEU_KHONG_HOP_LE | Cao | 400, DU_LIEU_KHONG_HOP_LE | PASS |