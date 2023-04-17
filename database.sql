
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user_data" (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"username" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"user_email" varchar(255) NOT NULL,
	"user_type" varchar(64) NOT NULL,
	"supplier_company_name" varchar(255) NOT NULL,
	"supplier_company_address" varchar(255) NOT NULL,
	"supplier_email" varchar(255) NOT NULL,
	"supplier_company_phone" integer NOT NULL,
	"supplier_company_url" varchar(255) NOT NULL
);

CREATE TABLE "object_type_table" (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"object_type" VARCHAR(80) NOT NULL
);

CREATE TABLE "object" (
	"id" SERIAL PRIMARY KEY,
	"part_name" varchar(255) NOT NULL,
	"part_number" varchar(255) NOT NULL,
	"object_type_id" integer NOT NULL REFERENCES "object_type_table",
	"mttf_months" integer NOT NULL,
	"lead_time_weeks" integer NOT NULL
);

CREATE TABLE "my_objects_table" (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"user_id" integer REFERENCES "user_data" NOT NULL,
	"object_id" integer REFERENCES "object" NOT NULL,
	"quantity_in_field" integer NOT NULL,
	"quantity_owned" integer NOT NULL,
	"quantity_to_order" integer NOT NULL,
	"stock_override" BOOLEAN NOT NULL,
	"stock_override_qty" integer NOT NULL
);

CREATE TABLE "suppliers" (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"supplier_name" varchar(255) NOT NULL,
	"supplier_address" varchar(255) NOT NULL,
	"supplier_email" varchar(255) NOT NULL,
	"supplier_phone" varchar(255) NOT NULL,
	"supplier_url" varchar(255) NOT NULL,
	"primary_contact_name" varchar(255) NOT NULL,
	"primary_contact_phone" varchar(255) NOT NULL,
	"primary_contact_email" varchar(255) NOT NULL
);

CREATE TABLE "object_suppliers" (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"object_id" integer REFERENCES "object" NOT NULL,
	"supplier_id" integer REFERENCES "suppliers" NOT NULL
);