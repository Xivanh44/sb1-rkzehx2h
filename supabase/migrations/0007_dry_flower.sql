/*
  # Simplified user authentication setup

  1. Changes
    - Focus on essential auth fields only
    - Remove optional fields that might cause conflicts
    - Ensure proper email verification status
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

    -- Create test user with minimal required fields
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
      updated_at,
      last_sign_in_at
    )
    VALUES (
      test_user_id,
      'marmet430@hotmail.com',
      crypt('test123', gen_salt('bf')),
      now(),
      jsonb_build_object('provider', 'email', 'providers', array['email']),
      jsonb_build_object('email_verified', true),
      'authenticated',
      'authenticated',
      now(),
      now(),
      now()
    );

    -- Create minimal auth identity
    INSERT INTO auth.identities (
      provider_id,
      user_id,
      identity_data,
      provider,
      email,
      created_at,
      updated_at
    ) VALUES (
      'marmet430@hotmail.com',
      test_user_id,
      jsonb_build_object(
        'sub', test_user_id,
        'email', 'marmet430@hotmail.com',
        'email_verified', true
      ),
      'email',
      'marmet430@hotmail.com',
      now(),
      now()
    );

    -- Create profile
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