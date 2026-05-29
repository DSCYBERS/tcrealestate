Deploying to Vercel
===================

This project is a static Vite site. The following steps prepare and deploy it to Vercel.

1. Push repository to GitHub (or Git provider) and connect it to Vercel.

2. In Vercel → Import Project → select the repo.
   - Framework Preset: `Vite` (auto-detected)
   - Build command: `npm run build`
   - Output directory: `dist`

3. Add Environment Variables in Vercel Settings (Project → Settings → Environment Variables):
   - `VITE_SUPABASE_URL` = https://<your-project-ref>.supabase.co
   - `VITE_SUPABASE_ANON_KEY` = <your-anon-key>

4. Deploy. Vercel will build and publish. Preview deployments are created for branches.

Local build & test
------------------
Build locally to verify before pushing:

```bash
npm install
npm run build
npx serve dist # or any static server to test
```

Notes
-----
- The site uses `vercel.json` for static build and to route all requests to `index.html` (SPA fallback).
- For server-side notifications (email/WhatsApp), use Supabase Edge Functions or a serverless provider; cPanel is not suitable for serverless functions.
- After deployment, add your production domain in Supabase Auth settings (allowed origins & redirect URIs).
