/*
  # Fix user authentication setup

  1. Changes
    - Properly set up user authentication with correct password hashing
    - Ensure all required fields are present
    - Fix auth identity setup
  2. Security
    - Use proper password hashing with pgcrypto
    - Set up complete auth identity chain
*/

-- Enable pgcrypto extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pgcrypto;

DO $$
DECLARE
  test_user_id uuid;
  existing_user_id uuid;
BEGIN
  -- Check if user already exists
  SELECT id INTO existing_user_id
  FROM auth.users
  WHERE email = 'marmet430@hotmail.com';

  -- Only proceed if user doesn't exist
  IF existing_user_id IS NULL THEN
    -- Generate UUID for test user
    test_user_id := gen_random_uuid();

    -- Create test user (password: test123)
    INSERT INTO auth.users (
      id,
      instance_id,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      aud,
      role,
      created_at,
      updated_at,
      is_super_admin,
      last_sign_in_at
    )
    VALUES (
      test_user_id,
      '00000000-0000-0000-0000-000000000000'::uuid,
      'marmet430@hotmail.com',
      crypt('test123', gen_salt('bf')),
      now(),
      jsonb_build_object(
        'provider', 'email',
        'providers', array['email']
      ),
      jsonb_build_object(
        'email', 'marmet430@hotmail.com'
      ),
      'authenticated',
      'authenticated',
      now(),
      now(),
      false,
      now()
    );

    -- Create auth identity with all required fields
    INSERT INTO auth.identities (
      id,
      user_id,
      identity_data,
      provider,
      provider_id,
      last_sign_in_at,
      created_at,
      updated_at,
      email
    ) VALUES (
      test_user_id,
      test_user_id,
      jsonb_build_object(
        'sub', test_user_id,
        'email', 'marmet430@hotmail.com',
        'email_verified', true
      ),
      'email',
      'marmet430@hotmail.com',
      now(),
      now(),
      now(),
      'marmet430@hotmail.com'
    );

    -- Create profile for test user
    INSERT INTO profiles (
      id,
      role,
      hotel_id
    ) 
    VALUES (
      test_user_id,
      'manager',
      (SELECT id FROM hotels LIMIT 1)
    );
  END IF;
END $$;