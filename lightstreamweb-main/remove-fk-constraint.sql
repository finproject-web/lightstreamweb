-- Remove foreign key constraint from admin_notes table
-- Run this in your Supabase SQL Editor

ALTER TABLE admin_notes 
DROP CONSTRAINT IF EXISTS admin_notes_email_fkey;
