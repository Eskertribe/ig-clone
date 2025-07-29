-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Verify the extension is installed
SELECT * FROM pg_extension WHERE extname = 'uuid-ossp';