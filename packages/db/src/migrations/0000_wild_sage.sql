

CREATE OR REPLACE FUNCTION update_prefixes_cache()
  RETURNS TRIGGER AS $$
  BEGIN
    IF TG_OP = 'DELETE' THEN
      PERFORM pg_notify('delete_prefixes', NEW.guild_id::TEXT);
    ELSIF TG_OP = 'UPDATE' AND OLD.prefixes <> NEW.prefixes THEN
      PERFORM pg_notify('update_prefixes',
        JSON_BUILD_OBJECT(
              'guild_id', NEW.guild_id,
              'prefixes', NEW.prefixes
            )::TEXT
          );
    ELSIF TG_OP = 'INSERT' AND NEW.prefixes <> ARRAY[]::TEXT[] THEN
        PERFORM pg_notify('update_prefixes',
        JSON_BUILD_OBJECT(
              'guild_id', NEW.guild_id,
              'prefixes', NEW.prefixes
            )::TEXT
          );
    END IF;
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_prefixes_cache_trigger ON guilds;

CREATE TRIGGER update_prefixes_cache_trigger
  AFTER INSERT OR UPDATE OR DELETE
  ON guilds
  FOR EACH ROW
  EXECUTE PROCEDURE update_prefixes_cache()