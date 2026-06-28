-- Add note_type column to admin_notes table
-- Run this in your Supabase SQL Editor

ALTER TABLE admin_notes 
ADD COLUMN IF NOT EXISTS note_type TEXT;
