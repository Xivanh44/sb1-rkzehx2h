/*
  # Create test user and configure permissions
  
  1. Creates test user with email/password authentication if not exists
  2. Sets up proper auth identities and profile
  3. Grants necessary database permissions
*/

-- Enable pgcrypto
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create or replace function to safely create test user
CREATE OR REPLACE FUNCTION create_test_user_if_not_exists()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER 
AS $$
DECLARE
  test_user_id uuid;
  hotel_id uuid;
  existing_user_id uuid;
BEGIN
  -- Check if user already exists
  SELECT id INTO existing_user_id
  FROM auth.users
  WHERE email = 'test@westotel.com';

  -- Only create user if they don't exist
  IF existing_user_id IS NULL THEN
    -- Get first hotel ID
    SELECT id INTO hotel_id FROM hotels LIMIT 1;

    -- Create test user
    INSERT INTO auth.users (
      id,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      aud,
      role,
      created_at,
      updated_at
    )
    VALUES (
      gen_random_uuid(),
      'test@westotel.com',
      crypt('test123', gen_salt('bf')),
      now(),
      jsonb_build_object('provider', 'email', 'providers', ARRAY['email']),
      jsonb_build_object('email_verified', true),
      'authenticated',
      'authenticated',
      now(),
      now()
    )
    RETURNING id INTO test_user_id;

    -- Create identity
    INSERT INTO auth.identities (
      provider_id,
      user_id,
      identity_data,
      provider,
      email,
      created_at,
      updated_at
    ) VALUES (
      'test@westotel.com',
      test_user_id,
      jsonb_build_object(
        'sub', test_user_id,
        'email', 'test@westotel.com',
        'email_verified', true
      ),
      'email',
      'test@westotel.com',
      now(),
      now()
    );

    -- Create profile
    INSERT INTO public.profiles (
      id,
      role,
      hotel_id,
      created_at,
      updated_at
    ) VALUES (
      test_user_id,
      'manager',
      hotel_id,
      now(),
      now()
    );
  END IF;
END;
$$;

-- Create test user safely
SELECT create_test_user_if_not_exists();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;