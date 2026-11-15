# API Documentation - Smart CRM, Flow L8 (Track SE)

## Base URL
`http://localhost:3000/api`

## Authentication
No authentication required in this version. All endpoints are public.

---

## 1. Get Ticket Summary
**GET** `/api/tickets/:ticket_code/summary`

**Description:** Retrieve summary information of a warranty ticket by its code.

**Path Parameters:**
- `ticket_code` (string): The ticket code (e.g., PB-2-00001).

**Success Response (200 OK):**
```json
{
  "ticket_id": 1052,
  "ticket_code": "PB-2-00001",
  "device_name": "iPhone 13 Pro Max",
  "technician_name": "Nguyen Van A",
  "status": "DA_DONG",
  "can_survey": true
}
Error Response (404 Not Found):

json
{
  "error": "KHONG_TIM_THAY_PHIEU"
}
2. Submit CSAT Survey
POST /api/surveys

Description: Submit a customer satisfaction survey for a closed ticket.

Request Body:

json
{
  "ticket_code": "PB-2-00001",
  "csat_score": 5,
  "nps_score": 9,
  "comment": "Dịch vụ rất tốt"
}
Validation Rules:

ticket_code: required, must exist in database.

csat_score: required, integer from 1 to 5.

nps_score: optional, integer from 0 to 10.

comment: optional, length from 10 to 2000 characters.

Success Response (201 Created):

json
{
  "survey_id": 1,
  "ticket_id": 1052,
  "csat_score": 5,
  "nps_score": 9,
  "comment": "Dịch vụ rất tốt",
  "created_at": "2026-11-15T10:00:00.000Z"
}
Error Responses:

400 Bad Request (invalid data or ticket not closed):

json
{ "error": "DU_LIEU_KHONG_HOP_LE" }
json
{ "error": "PHIEU_CHUA_DONG_KHONG_THE_KHAO_SAT" }
404 Not Found (ticket does not exist):

json
{ "error": "KHONG_TIM_THAY_PHIEU" }
3. Get CSAT Report by Technician
GET /api/reports/csat

Description: Retrieve average CSAT score grouped by technician.

Success Response (200 OK):

json
[
  { "technician_name": "Nguyen Van A", "total_surveys": 5, "avg_csat": 4.4 },
  { "technician_name": "Tran Van B", "total_surveys": 1, "avg_csat": 5.0 }
]
4. Get All Surveys
GET /api/surveys

Description: Retrieve a list of all survey responses.

Success Response (200 OK):

json
[
  {
    "survey_id": 1,
    "ticket_code": "PB-2-00001",
    "device_name": "iPhone 13 Pro Max",
    "technician_name": "Nguyen Van A",
    "csat_score": 5,
    "nps_score": 9,
    "comment": "Dịch vụ tốt",
    "created_at": "2026-11-15T10:00:00.000Z"
  }
]
5. Get All Customers
GET /api/customers

Description: Retrieve a list of all customers.

Success Response (200 OK):

json
[
  { "customer_id": 1, "full_name": "Nguyen Van A", "phone": "0901234567" },
  { "customer_id": 2, "full_name": "Tran Thi B", "phone": "0987654321" }
]
Error Codes Summary
HTTP Status	Meaning
200	Success
201	Created successfully
400	Invalid input data or business rule violation
404	Resource not found
500	Internal server error