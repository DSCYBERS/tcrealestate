-- Supabase schema for TC Real Estates

-- properties table
create table if not exists properties (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique,
  type text,
  status text,
  location text,
  size text,
  price_per_sqyd text,
  total_price text,
  image text,
  highlights jsonb,
  description text,
  roi text,
  amenities jsonb,
  nearby_landmarks jsonb,
  featured boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz
);

-- leads table
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  name text,
  phone text,
  requirement text,
  location text,
  source text,
  message text,
  status text default 'New',
  created_at timestamptz default now()
);

-- locations table
create table if not exists locations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique,
  landing_page jsonb,
  created_at timestamptz default now()
);
