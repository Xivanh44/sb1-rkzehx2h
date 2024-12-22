/*
  # Create test user with pgcrypto hashing

  1. Setup
    - Enable pgcrypto extension for secure password hashing
  2. New Data
    - Create test user with properly hashed password
    - Create auth identity with email provider
    - Create manager profile
  3. Security
    - Password is hashed using pgcrypto's crypt function
    - Proper provider_id setup for auth identity
*/

-- Enable pgcrypto extension for password hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

DO $$
DECLARE
  test_user_id uuid;
  existing_user_id uuid;
BEGIN
  -- Check if user already exists
  SELECT id INTO existing_user_id
  FROM auth.users
  WHERE email = 'test@westotel.com';

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
      is_super_admin
    )
    VALUES (
      test_user_id,
      '00000000-0000-0000-0000-000000000000'::uuid,
      'test@westotel.com',
      crypt('test123', gen_salt('bf')), -- Hash password using pgcrypto
      now(),
      jsonb_build_object('provider', 'email', 'providers', array['email']),
      '{}'::jsonb,
      'authenticated',
      'authenticated',
      now(),
      now(),
      false
    );

    -- Create auth identity with provider_id
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
        'email', 'test@westotel.com'
      ),
      'email',
      'test@westotel.com',  -- Add provider_id for email authentication
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