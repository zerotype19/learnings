
UPDATE terms_v2 
SET 
  created_at = datetime('now', '-' || CAST(ABS(RANDOM() % 1825) AS TEXT) || ' days'),
  updated_at = datetime('now', '-' || CAST(ABS(RANDOM() % 30) AS TEXT) || ' days'),
  views = CAST(400 + (RANDOM() % 1601) AS INTEGER)
WHERE id IS NOT NULL;



-- Add some terms with very high view counts (viral terms)
UPDATE terms_v2 
SET views = CAST(2000 + (RANDOM() % 3000) AS INTEGER)
WHERE RANDOM() % 10 = 0;

-- Add some terms with moderate view counts
UPDATE terms_v2 
SET views = CAST(800 + (RANDOM() % 1200) AS INTEGER)
WHERE RANDOM() % 3 = 0;

-- Ensure all terms have at least 400 views
UPDATE terms_v2 
SET views = 400 + (RANDOM() % 100)
WHERE views < 400;
