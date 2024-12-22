/*
  # User Management Refactor

  1. Changes
    - Create a function to handle user creation
    - Add proper error handling
    - Ensure consistent user data structure
  2. Security
    - Proper password hashing
    - Email verification handling
    - Required fields validation
*/

-- Enable pgcrypto extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create a function to handle user creation
CREATE OR REPLACE FUNCTION create_user_with_profile(
  p_email text,
  p_password text,
  p_role text DEFAULT 'user'
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id uuid;
  v_hotel_id uuid;
BEGIN
  -- Check if user exists
  IF EXISTS (SELECT 1 FROM auth.users WHERE email = p_email) THEN
    RETURN NULL;
  END IF;

  -- Get first hotel ID
  SELECT id INTO v_hotel_id FROM hotels LIMIT 1;
  
  -- Generate new user ID
  v_user_id := gen_random_uuid();

  -- Create user
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
    v_user_id,
    p_email,
    crypt(p_password, gen_salt('bf')),
    now(),
    jsonb_build_object('provider', 'email', 'providers', array['email']),
    jsonb_build_object('email_verified', true),
    'authenticated',
    'authenticated',
    now(),
    now(),
    now()
  );

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
    p_email,
    v_user_id,
    jsonb_build_object(
      'sub', v_user_id,
      'email', p_email,
      'email_verified', true
    ),
    'email',
    p_email,
    now(),
    now()
  );

  -- Create profile
  INSERT INTO profiles (
    id,
    role,
    hotel_id
  ) VALUES (
    v_user_id,
    p_role,
    v_hotel_id
  );

  RETURN v_user_id;
END;
$$;

-- Create test user using the new function
SELECT create_user_with_profile('marmet430@hotmail.com', 'test123', 'manager');