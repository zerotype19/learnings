-- Add origin and source_scenario columns to terms_v2 table
ALTER TABLE terms_v2 ADD COLUMN origin TEXT;
ALTER TABLE terms_v2 ADD COLUMN source_scenario TEXT;
