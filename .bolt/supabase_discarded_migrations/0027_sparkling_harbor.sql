/*
  # Add image rotation support

  1. Changes
    - Add rotation column to items table with default value of 0
    - Add descriptive comment explaining valid rotation values
*/

-- Add rotation column to items table
ALTER TABLE items 
ADD COLUMN IF NOT EXISTS rotation integer DEFAULT 0;

-- Add comment to explain the column
COMMENT ON COLUMN items.rotation IS 'Image rotation in degrees (0, 90, 180, 270)';