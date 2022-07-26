DELETE FROM optical_heads;

--@block
DELETE FROM dates;

--@block
ALTER TABLE optical_heads ADD UNIQUE (name);