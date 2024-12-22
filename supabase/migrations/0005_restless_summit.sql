/*
  # Add new test user with marmet430@hotmail.com

  1. New Data
    - Create a test user with email/password authentication
    - Create corresponding profile entry with manager role
    - Add auth identity with proper provider ID
  2. Security
    - Password is hashed using pgcrypto
    - User has authenticated role
    - Complete auth identity setup
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
      confirmation_token,
      recovery_token,
      is_super_admin
    )
    VALUES (
      test_user_id,
      '00000000-0000-0000-0000-000000000000'::uuid,
      'marmet430@hotmail.com',
      crypt('test123', gen_salt('bf')), -- Properly hashed password
      now(),
      jsonb_build_object('provider', 'email', 'providers', array['email']),
      '{}'::jsonb,
      'authenticated',
      'authenticated',
      now(),
      now(),
      encode(gen_random_bytes(32), 'hex'),
      encode(gen_random_bytes(32), 'hex'),
      false
    );

    -- Create auth identity
    INSERT INTO auth.identities (
      id,
      user_id,
      identity_data,
      provider,
      provider_id,
      last_sign_in_at,
      created_at,
      updated_at
    ) VALUES (
      test_user_id,
      test_user_id,
      jsonb_build_object(
        'sub', test_user_id,
        'email', 'marmet430@hotmail.com'
      ),
      'email',
      'marmet430@hotmail.com',  -- Use email as provider_id for email provider
      now(),
      now(),
      now()
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
      (SELECT id FROM hotels LIMIT 1)  -- Assign to first hotel
    );
  END IF;
END $$;