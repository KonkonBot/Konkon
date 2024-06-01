CREATE TABLE IF NOT EXISTS "guilds" (
	"guild_id" text PRIMARY KEY NOT NULL,
	"prefixes" text[] DEFAULT ARRAY[]::text[] NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(200) NOT NULL,
	"content" varchar(2000) NOT NULL,
	"owner_id" text,
	"guild_id" text,
	"uses" integer DEFAULT 0,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"points_to" bigint,
	CONSTRAINT "tags_name_guild_id_unique" UNIQUE("name","guild_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"user_id" text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "locales" (
	"user_id" text,
	"guild_id" text,
	"locale" text PRIMARY KEY DEFAULT 'en' NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tags" ADD CONSTRAINT "tags_points_to_tags_id_fk" FOREIGN KEY ("points_to") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
