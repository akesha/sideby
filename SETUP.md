# Connecting the Library to Supabase

By default, the **Library** page (`Library.html`) saves curator additions to `localStorage` — meaning they only persist on the visitor's own device. To share recommendations across all readers, wire it up to a Supabase project. About 5 minutes.

---

## 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and sign in.
2. Click **New project**. Pick any name (e.g. `aixed-library`), set a strong DB password, choose a region close to you. Free tier is fine.
3. Wait ~1 minute for the project to provision.

## 2. Run the schema

In the Supabase dashboard, open **SQL Editor → New query** and paste the following. Run it once.

```sql
-- The shared library: anyone can read, only authenticated curators write.
create table library_items (
  id uuid primary key default gen_random_uuid(),
  curator text not null check (curator in ('akesha','yousuf','anne')),
  type text not null,
  title text not null,
  author text,
  url text,
  note text,
  created_at timestamptz default now()
);
alter table library_items enable row level security;
create policy "public read" on library_items for select using (true);
-- No insert/delete policies for anon: writes only happen through the
-- security-definer functions below, which check the curator's pass code.

-- Pass-code table. RLS is enabled with no policies, so anon clients
-- can never read these — they're only consulted by SECURITY DEFINER
-- functions running as the table owner.
create table curator_secrets (
  curator text primary key,
  passcode text not null
);
alter table curator_secrets enable row level security;

-- Seed the three panelists' pass codes. Change these to whatever you
-- want to share with each curator. Pass codes are case-insensitive
-- (the client lowercases before sending).
insert into curator_secrets values
  ('akesha', 'indiana'),
  ('yousuf', 'sierra'),
  ('anne',   'presque');

-- Verify-only RPC: returns silently on success, raises on bad passcode.
-- The client calls this to validate a sign-in attempt.
create or replace function verify_curator(p_curator text, p_pass text)
returns void
language plpgsql security definer
set search_path = public
as $$
begin
  if not exists (
    select 1 from curator_secrets
    where curator = p_curator and lower(passcode) = lower(p_pass)
  ) then
    raise exception 'Invalid passcode';
  end if;
end$$;

-- Insert RPC: validates passcode, then inserts.
create or replace function add_library_item(
  p_curator text, p_pass text,
  p_type text, p_title text,
  p_author text, p_url text, p_note text
) returns uuid
language plpgsql security definer
set search_path = public
as $$
declare new_id uuid;
begin
  perform verify_curator(p_curator, p_pass);
  insert into library_items(curator, type, title, author, url, note)
  values (p_curator, p_type, p_title, nullif(p_author,''), nullif(p_url,''), nullif(p_note,''))
  returning id into new_id;
  return new_id;
end$$;

-- Delete RPC: validates passcode, then deletes the curator's own row.
create or replace function delete_library_item(
  p_curator text, p_pass text, p_id uuid
) returns void
language plpgsql security definer
set search_path = public
as $$
begin
  perform verify_curator(p_curator, p_pass);
  delete from library_items where id = p_id and curator = p_curator;
end$$;

-- Grant the anon role permission to call these functions. RLS still
-- blocks direct access to curator_secrets and direct writes to
-- library_items.
grant execute on function verify_curator(text, text) to anon;
grant execute on function add_library_item(text, text, text, text, text, text, text) to anon;
grant execute on function delete_library_item(text, text, uuid) to anon;
```

## 3. Get your project URL and anon key

In the Supabase dashboard: **Project Settings → API**.

- **Project URL** — looks like `https://abcd1234.supabase.co`
- **anon public** key — long string under "Project API keys"

This anon key is **safe to embed in the client**. It only allows reading `library_items` and calling the three RPCs (which themselves require the curator pass code).

## 4. Plug them into Library.html

Open `Library.html`, find the `SUPABASE_CONFIG` block near the top of the inline `<script>` (search for `YOUR_SUPABASE_URL`):

```js
const SUPABASE_CONFIG = {
  url: "YOUR_SUPABASE_URL",
  anonKey: "YOUR_SUPABASE_ANON_KEY"
};
```

Replace both placeholder strings with your project URL and anon key. Save the file.

## 5. Deploy

Re-deploy your site (drag the unzipped folder to Netlify Drop, push to GitHub Pages, etc.). The library will now read from and write to Supabase — every visitor sees every curator's additions.

---

## Sharing the pass codes

The three pass codes you set in step 2 are what each panelist types into the curator sign-in box on the live site. Send each curator their own code privately (Signal, email, etc.) — once they've signed in, the code is held only in their tab's session memory and is never written to disk.

To rotate a code, run:

```sql
update curator_secrets set passcode = 'new-code' where curator = 'akesha';
```

## Local mode

If `SUPABASE_CONFIG` still has the placeholder values, the page falls back to `localStorage` (additions live only on each visitor's device) and shows a small footer hint telling you so. This is useful while developing — you don't need Supabase configured to test the UI.

## Troubleshooting

- **"Couldn't add: function … does not exist"** — re-run the SQL from step 2; one of the functions failed to create.
- **"Invalid passcode" even with the right code** — confirm the row in `curator_secrets`. The client lowercases input, and the function compares case-insensitively, so casing shouldn't matter.
- **Recommendations don't appear after refresh** — open the browser console. If you see a Supabase error, double-check your URL and anon key.
- **The "Library is running in local mode" hint won't go away** — your `SUPABASE_CONFIG` values are still placeholders. They must not start with `YOUR_`.
