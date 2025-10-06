/*
  # Fix users table for better auth integration

  1. Tables
    - Update `users` table structure
    - Add proper indexes and constraints
    - Add updated_at timestamp

  2. Security
    - Update RLS policies for better auth integration
    - Add policy for user updates
    - Ensure proper access control

  3. Functions
    - Add trigger for updated_at timestamp
*/

-- Update users table structure
ALTER TABLE users 
  ALTER COLUMN id SET DATA TYPE uuid USING id::uuid,
  ALTER COLUMN created_at SET DEFAULT now(),
  ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now(),
  ADD COLUMN IF NOT EXISTS email_verified boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS last_sign_in_at timestamptz;

-- Ensure email column exists and is properly configured
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'email'
  ) THEN
    ALTER TABLE users ADD COLUMN email text;
  END IF;
END $$;

-- Make email unique if not already
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE table_name = 'users' AND constraint_name = 'users_email_key'
  ) THEN
    ALTER TABLE users ADD CONSTRAINT users_email_key UNIQUE (email);
  END IF;
END $$;

-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Update RLS policies
DROP POLICY IF EXISTS "Users can read own data" ON users;
DROP POLICY IF EXISTS "Users can update own data" ON users;
DROP POLICY IF EXISTS "Users can insert own data" ON users;

-- Create comprehensive RLS policies
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own data"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);
CREATE INDEX IF NOT EXISTS idx_users_last_sign_in ON users(last_sign_in_at);

-- Function to handle user upsert with better error handling
CREATE OR REPLACE FUNCTION handle_user_upsert(
  user_id uuid,
  user_email text,
  user_metadata jsonb DEFAULT '{}'::jsonb
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO users (id, email, created_at, last_sign_in_at, email_verified)
  VALUES (
    user_id, 
    user_email, 
    now(), 
    now(),
    COALESCE((user_metadata->>'email_verified')::boolean, false)
  )
  ON CONFLICT (id) 
  DO UPDATE SET 
    email = EXCLUDED.email,
    last_sign_in_at = now(),
    updated_at = now(),
    email_verified = COALESCE((user_metadata->>'email_verified')::boolean, users.email_verified);
END;
$$;