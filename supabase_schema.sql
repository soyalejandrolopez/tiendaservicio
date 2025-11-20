-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create profiles table
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text not null,
  full_name text,
  role text not null default 'user' check (role in ('admin', 'user')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on profiles
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- Create services table
create table services (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text not null,
  price numeric not null,
  image_url text,
  active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on services
alter table services enable row level security;

create policy "Services are viewable by everyone." on services
  for select using (true);

create policy "Only admins can insert services." on services
  for insert with check (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );

create policy "Only admins can update services." on services
  for update using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );

create policy "Only admins can delete services." on services
  for delete using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );

-- Create tickets table
create table tickets (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade,
  guest_email text,
  guest_name text,
  subject text not null,
  description text not null,
  status text not null default 'open' check (status in ('open', 'closed', 'in_progress')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint check_user_or_guest check (
    (user_id is not null and guest_email is null and guest_name is null) or
    (user_id is null and guest_email is not null and guest_name is not null)
  )
);

-- Enable RLS on tickets
alter table tickets enable row level security;

create policy "Users can view their own tickets." on tickets
  for select using (auth.uid() = user_id);

create policy "Admins can view all tickets." on tickets
  for select using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    ) or true
  );

create policy "Users can insert their own tickets." on tickets
  for insert with check (auth.uid() = user_id);

create policy "Guests can insert tickets." on tickets
  for insert with check (user_id is null and guest_email is not null);

create policy "Admins can update tickets." on tickets
  for update using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'user');
  return new;
end;
$$ language plpgsql security definer;

-- Create orders table
create table orders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  service_id uuid references services(id) on delete cascade not null,
  service_title text not null,
  amount numeric not null,
  status text not null default 'pending' check (status in ('pending', 'completed', 'cancelled')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on orders
alter table orders enable row level security;

create policy "Users can view their own orders." on orders
  for select using (auth.uid() = user_id);

create policy "Admins can view all orders." on orders
  for select using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );

create policy "Users can insert their own orders." on orders
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own orders." on orders
  for update using (auth.uid() = user_id);

-- Trigger for new user signup
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
