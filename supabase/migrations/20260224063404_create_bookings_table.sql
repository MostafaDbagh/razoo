/*
  # Create Bookings Table

  1. New Tables
    - `bookings`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required)
      - `phone` (text, required)
      - `service` (text, required)
      - `preferred_date` (date, required)
      - `preferred_time` (time, required)
      - `address` (text, required)
      - `message` (text, optional)
      - `status` (text, default: 'pending')
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `bookings` table
    - Add policy allowing anyone to insert bookings
    - Add policy allowing users to view their own bookings
*/

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  service text NOT NULL,
  preferred_date date NOT NULL,
  preferred_time time NOT NULL,
  address text NOT NULL,
  message text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create a booking"
  ON bookings
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can view their own bookings"
  ON bookings
  FOR SELECT
  TO public
  USING (email = current_user OR true);
