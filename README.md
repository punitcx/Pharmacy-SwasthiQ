CREATE DATABASE pharmacy_db OWNER pharmacy_user;
CREATE USER pharmacy_user WITH PASSWORD 'swasthiQ';
ALTER ROLE pharmacy_user SET client_encoding TO 'utf8';
ALTER ROLE pharmacy_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE pharmacy_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE pharmacy_db TO pharmacy_user;
ALTER SCHEMA public OWNER TO pharmacy_user;
\q
