## Goal

Replace static content with a full database-backed CMS. Admin (admin@tcrealestate.in) can log in and manage everything live without code.

## Database tables

- `profiles` — user profile (id → auth.users)
- `user_roles` + `app_role` enum + `has_role()` security-definer fn — admin gating
- `properties` — name, type, location, size, price_per_sqyd, total_price, image_urls[], highlights[], description, map_url, amenities[], landmarks[], is_featured, roi, slug, seo_title, seo_description
- `leads` — name, phone, email, requirement, location, source, message, status (new/contacted/qualified/won/lost), notes
- `location_pages` — slug, name, hero_image, starting_price, why_invest[], landmarks[], description, seo fields
- `testimonials` — name, role, quote, avatar_url, rating, sort_order
- `blog_posts` — slug, title, excerpt, content (markdown), cover_image, published, published_at, seo_title, seo_description, og_image
- `site_content` — key/value JSON store for hero text, headlines, CTAs, contact info
- `homepage_featured` — ordered list of featured property IDs
- Storage bucket `property-images` (public read)

All tables: RLS enabled. Public read for properties/locations/blog (published)/testimonials/site_content. Admin-only write via `has_role(auth.uid(), 'admin')`. Leads: anon insert allowed, admin read/update.

## Auth

- Email/password (Google sign-in skipped for admin-only panel — can add later)
- Admin account `admin@tcrealestate.in` created manually after first signup (instructions printed)
- Session via `@/integrations/supabase/client`, route guard `_admin` layout checks role
- Default auth.users without admin role are rejected from /admin

## Server functions (createServerFn)

- `notifyNewLead` — sends email to admin@tcrealestate.in via Resend connector (auto-triggered on lead insert via DB trigger → pg_net → `/api/public/hooks/lead-notify`)
- `uploadPropertyImage` — auth-protected, uploads to storage bucket
- Admin CRUD goes directly via supabase-js with RLS enforcing admin role

## Routes

Public (DB-backed, replacing hardcoded data):

- `/`, `/properties`, `/properties/$id`, `/locations/$slug`, `/about`, `/contact`, `/blog`, `/blog/$slug`

Admin (under `_admin` layout, role-guarded):

- `/admin` — dashboard (counts, recent leads)
- `/admin/login`
- `/admin/properties` (list + create/edit/delete + featured toggle + image upload)
- `/admin/leads` (list + status + notes + WhatsApp/call buttons + CSV export)
- `/admin/locations` (CRUD)
- `/admin/blog` (CRUD with markdown editor)
- `/admin/testimonials` (CRUD)
- `/admin/homepage` (hero text, CTA, featured properties picker)
- `/admin/seo` (per-page SEO overrides via site_content)

## Notifications

- Email to admin on every new lead via Resend connector (will prompt to connect)
- WhatsApp: deferred — note added saying it needs WhatsApp Business API (Twilio/Meta) setup

## Migration of existing data

- Seed `properties`, `location_pages`, `testimonials` from current static files so site doesn't go blank
- Keep `src/lib/leads.ts` localStorage fallback removed — leads now persist in DB

## Out of scope for this build (acknowledged, not built)

- WhatsApp notifications (needs paid Business API account)
- True drag-and-drop reordering (will use sort_order number inputs)
- Investment calculator, comparison tool, exit popup (separate scope)
- Sitemap auto-regen from DB (will update `sitemap.xml` route to pull from DB)

## Execution order

1. DB migration (all tables, RLS, storage bucket, triggers)
2. Seed existing static data
3. Auth: signup/login page + `_admin` route guard
4. Admin dashboard shell + sidebar nav
5. Properties CRUD (most complex — image upload)
6. Leads dashboard
7. Locations CRUD
8. Testimonials CRUD
9. Blog CRUD
10. Homepage/SEO editor
11. Rewrite public routes to read from DB
12. Lead notification email (server fn + DB trigger)
13. Update sitemap to pull from DB

This is ~15-25 file changes. I'll execute it as one continuous build.
