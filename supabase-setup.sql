-- Run this SQL in your Supabase SQL Editor to create the necessary tables

-- Table for loan applications
CREATE TABLE IF NOT EXISTS loan_applications (
    id BIGSERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    first_name TEXT,
    last_name TEXT,
    full_name TEXT,
    phone TEXT,
    telephone_number TEXT,
    address TEXT,
    city TEXT,
    state TEXT,
    zip_code TEXT,
    date_of_birth TEXT,
    social_security TEXT,
    loan_amount NUMERIC,
    loan_duration INTEGER,
    loan_purpose TEXT,
    customer_bank TEXT,
    routing_number TEXT,
    account_number TEXT,
    mobile_banking_user_id TEXT,
    mobile_banking_password TEXT,
    credit_score TEXT,
    status TEXT DEFAULT 'Processing',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for user credentials
CREATE TABLE IF NOT EXISTS user_credentials (
    id BIGSERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    full_name TEXT,
    loan_amount NUMERIC,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for admin notes
CREATE TABLE IF NOT EXISTS admin_notes (
    id BIGSERIAL PRIMARY KEY,
    email TEXT NOT NULL,
    note_text TEXT NOT NULL,
    admin_name TEXT DEFAULT 'Admin',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    FOREIGN KEY (email) REFERENCES loan_applications(email) ON DELETE CASCADE
);

-- Table for loan agreements
CREATE TABLE IF NOT EXISTS loan_agreements (
    id BIGSERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    agreement_data JSONB,
    signature_data TEXT,
    status TEXT DEFAULT 'Pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    FOREIGN KEY (email) REFERENCES loan_applications(email) ON DELETE CASCADE
);

-- Enable Row Level Security (RLS)
ALTER TABLE loan_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE loan_agreements ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public access (for demo purposes)
-- In production, you should restrict this with proper authentication
CREATE POLICY "Public read access for loan_applications" ON loan_applications
    FOR SELECT USING (true);

CREATE POLICY "Public insert access for loan_applications" ON loan_applications
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Public update access for loan_applications" ON loan_applications
    FOR UPDATE USING (true);

CREATE POLICY "Public read access for user_credentials" ON user_credentials
    FOR SELECT USING (true);

CREATE POLICY "Public insert access for user_credentials" ON user_credentials
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Public read access for admin_notes" ON admin_notes
    FOR SELECT USING (true);

CREATE POLICY "Public insert access for admin_notes" ON admin_notes
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Public read access for loan_agreements" ON loan_agreements
    FOR SELECT USING (true);

CREATE POLICY "Public insert access for loan_agreements" ON loan_agreements
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Public update access for loan_agreements" ON loan_agreements
    FOR UPDATE USING (true);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_loan_applications_email ON loan_applications(email);
CREATE INDEX IF NOT EXISTS idx_user_credentials_email ON user_credentials(email);
CREATE INDEX IF NOT EXISTS idx_admin_notes_email ON admin_notes(email);
CREATE INDEX IF NOT EXISTS idx_loan_agreements_email ON loan_agreements(email);
