alter table public.short_links 
add column user_id uuid references auth.users(id);

drop policy if exists "Allow public insert access to short links" on public.short_links;

create policy "Allow authenticated users to insert short links"
on public.short_links for insert
to authenticated
with check (auth.uid() = user_id);
