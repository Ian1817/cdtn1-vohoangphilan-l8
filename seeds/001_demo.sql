INSERT INTO customers (customer_name, phone_number) VALUES ('Nguyen Van A', '0901234567') ON CONFLICT DO NOTHING;
INSERT INTO technicians (full_name, center_id) VALUES ('Tran Van B', 1) ON CONFLICT DO NOTHING;
INSERT INTO warranty_tickets (ticket_code, customer_id, technician_id, device_name, status) VALUES ('WT-1052', 1, 1, 'iPhone 13 Pro Max', 'DA_DONG') ON CONFLICT DO NOTHING;
