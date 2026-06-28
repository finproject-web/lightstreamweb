-- Add agreement tracking columns to loan_applications table
-- Run this in your Supabase SQL Editor

ALTER TABLE loan_applications 
ADD COLUMN IF NOT EXISTS agreement_sent BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS agreement_sent_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS agreement_signed BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS agreement_signed_at TIMESTAMP WITH TIME ZONE;
