-- Run this SQL in your Supabase SQL Editor to create the insurance policy reviews table
-- This is a separate query to avoid conflicts with existing policies

-- Table for insurance policy reviews
CREATE TABLE IF NOT EXISTS insurance_policy_reviews (
    id BIGSERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    understanding_statement TEXT NOT NULL,
    ip_address TEXT,
    id_type TEXT,
    id_front_url TEXT,
    id_back_url TEXT,
    review_completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    FOREIGN KEY (email) REFERENCES loan_applications(email) ON DELETE CASCADE
);

-- Enable Row Level Security (RLS) on new table
ALTER TABLE insurance_policy_reviews ENABLE ROW LEVEL SECURITY;

-- Create policies for insurance_policy_reviews
CREATE POLICY "Public read access for insurance_policy_reviews" ON insurance_policy_reviews
    FOR SELECT USING (true);

CREATE POLICY "Public insert access for insurance_policy_reviews" ON insurance_policy_reviews
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Public update access for insurance_policy_reviews" ON insurance_policy_reviews
    FOR UPDATE USING (true);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_insurance_policy_reviews_email ON insurance_policy_reviews(email);
