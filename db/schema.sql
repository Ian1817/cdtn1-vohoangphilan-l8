CREATE TABLE IF NOT EXISTS customers (
    customer_id SERIAL PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    email VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS technicians (
    technician_id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    center_id INT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS warranty_tickets (
    ticket_id SERIAL PRIMARY KEY,
    ticket_code VARCHAR(50) UNIQUE NOT NULL,
    customer_id INT NOT NULL REFERENCES customers(customer_id) ON DELETE RESTRICT,
    technician_id INT NOT NULL REFERENCES technicians(technician_id) ON DELETE RESTRICT,
    device_name VARCHAR(100) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'TIEP_NHAN',
    closed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS survey_responses (
    survey_id SERIAL PRIMARY KEY,
    ticket_id INT UNIQUE NOT NULL REFERENCES warranty_tickets(ticket_id) ON DELETE RESTRICT,
    csat_score INT NOT NULL CHECK (csat_score >= 1 AND csat_score <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_tickets_status ON warranty_tickets(status);
CREATE INDEX idx_tickets_technician ON warranty_tickets(technician_id);
CREATE INDEX idx_surveys_created_at ON survey_responses(created_at DESC);
