-- database name: aa_ds_solo

-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"username" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"first_name" varchar(255),
	"last_name" varchar(255),
	"user_email" varchar(255),
	"user_type" varchar(64),
	"supplier_company_name" varchar(255),
	"supplier_company_address" varchar(255),
	"supplier_email" varchar(255),
	"supplier_company_phone" integer,
	"supplier_company_url" varchar(255)
);

CREATE TABLE "object_type_table" (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"object_type" VARCHAR(80) NOT NULL
);
	
INSERT INTO "object_type_table" ("object_type")
	VALUES ('Camera'), ('Access Control'), ('Badging');

CREATE TABLE "object" (
	"id" SERIAL PRIMARY KEY,
	"part_name" varchar(255) NOT NULL,
	"part_number" varchar(255) NOT NULL,
	"description" varchar(255) NOT NULL,
	"object_type_id" integer NOT NULL REFERENCES "object_type_table",
	"mttf_months" integer NOT NULL,
	"lead_time_weeks" integer NOT NULL
);

INSERT INTO "object" ("part_name", "part_number", "description", "object_type_id", "mttf_months", "lead_time_weeks")
--VALUES ('QNO-8080', 'QNO-8080', '8MP Bullet Style Indoor/Outdoor Camera', '1', '72', '5'),
--('QNV-8080', 'QNV-800', '8MP Vandal Dome Style Indoor/Outdoor Camera', '1', '72', '5'),
--('QND-8080', 'QND-800', '8MP Indoor Dome Style Indoor/Outdoor Camera', '1', '72', '5');
VALUES ('2U Hybrid NVR', '1608-12T-R2A', '16TB, 8 Analog Input Hybrid NVR', '1', '60', '12'), 
('OHDC', '2315AL', 'SENTROL 2315 series A type Long Overhead Door Contact', '2', '120', '1'),
('MELM 1', 'MELM1', 'Line Module, type 1', '2', '240', '2'),
('MELM 2', 'MELM2', 'Line Module, type 2', '2', '240', '2'),
('Magnetic Lock', 'ML8011', '24VDC 1200 LB Magnetic Lock', '2', '84', '6'),
('Strobe and Horn', '90428922HWL', '12VDC Horn and strobe combination, 1EO box size', '3', '240', '4'),
('Multi Tone Fire Horn', 'MT1224W', 'Wheelock Multi Tone programmable fire horn', '3', '240', '6'),
('Public Address Horn', 'PA430T', 'University Paging Horn with Transformer', '3', '120', '12')
;

CREATE TABLE "my_objects_table" (
	"mot_id" SERIAL PRIMARY KEY NOT NULL,
	"user_id" integer REFERENCES "user" NOT NULL,
	"object_id" integer REFERENCES "object" NOT NULL,
	"quantity_in_field" integer NOT NULL,
	"quantity_owned" integer NOT NULL,
	"quantity_to_order" integer DEFAULT 0,
	"stock_override" BOOLEAN DEFAULT FALSE,
	"stock_override_qty" integer
);

-- ALTER TABLE "my_objects_table"
-- RENAME COLUMN id TO mot_id;

INSERT INTO "my_objects_table" (user_id, object_id, quantity_in_field, quantity_owned, quantity_to_order) 
VALUES ('1', '2', '100', '2', '3'), ('1','4','300', '4', '11'), 
('1', '7', '600', '1', '2'), ('1', '8', '1000', '30', '5'),
('1', '9', '6000', '20', '40'), ('1', '10', '20', '0', '1');

INSERT INTO "my_objects_table" (user_id, object_id, quantity_in_field, quantity_owned) 
VALUES ('1', '11', '300', '4'), ('1', '12', '400', '3'),
('1', '13', '750', '7');


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

INSERT INTO suppliers (supplier_name, supplier_address, supplier_email, supplier_phone, supplier_url, primary_contact_name, primary_contact_phone, primary_contact_email)
VALUES ('Doyle Security Products', '2211 West River Rd N, Minneapolis, MN 55411', 'sales@doylesecurity.com', '6125216226', 'https://doylesecurity.com', 'John Doyle', '6125216226', 'jd@doylesecurity.com'),
('Alarm Products Distributors', '2341 St Croix St, Roseville MN 55113', 'sales@apdmn.com', '6516470234', 'https://www.apdmn.com/', 'Chris Rossow', '6512511802', 'chrisr@apdmn.com')
;


CREATE TABLE "object_suppliers" (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"object_id" integer REFERENCES "object" NOT NULL,
	"supplier_id" integer REFERENCES "suppliers" NOT NULL
);

SELECT my_objects_table.id, * FROM "my_objects_table"
    JOIN "object" ON object.id = my_objects_table.object_id
    JOIN "object_type_table" ON object_type_table.id = object.object_type_id
    ORDER BY part_name ASC;