CREATE TABLE IF NOT EXISTS customers (
    customer_id SERIAL PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS technicians (
    technician_id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20),
    center_id INT,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS warranty_tickets (
    ticket_id SERIAL PRIMARY KEY,
    ticket_code VARCHAR(50) UNIQUE NOT NULL,
    customer_id INT REFERENCES customers(customer_id),
    technician_id INT REFERENCES technicians(technician_id),
    device_name VARCHAR(100) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'DA_DONG'
);

CREATE TABLE IF NOT EXISTS survey_responses (
    survey_id SERIAL PRIMARY KEY,
    ticket_id INT UNIQUE REFERENCES warranty_tickets(ticket_id),
    csat_score INT CHECK (csat_score BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
