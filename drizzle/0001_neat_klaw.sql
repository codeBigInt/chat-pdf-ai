CREATE TABLE IF NOT EXISTS "subscription" (
	"subscription" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"create_at" timestamp DEFAULT now() NOT NULL,
	"subscribed" boolean NOT NULL
);
