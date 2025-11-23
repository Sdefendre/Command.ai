# How to Get Your Supabase Service Role Key

The Reddit scraper needs the **Service Role Key** to insert data into your Supabase database. Here's how to get it:

## Steps

1. **Go to your Supabase Dashboard**
   - Visit: https://supabase.com/dashboard
   - Select your project: `wmyptvcnwmmspknmeooy`

2. **Navigate to Settings**
   - Click on **Settings** in the left sidebar
   - Click on **API** under Project Settings

3. **Find the Service Role Key**
   - Scroll down to find the **service_role** key (it's a JWT token)
   - **⚠️ WARNING**: This key has full access to your database and bypasses RLS
   - **Never expose this key publicly or commit it to git**

4. **Add to .env.local**
   - Open your `.env.local` file
   - Add this line (replace with your actual key):

   ```env
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

5. **Run the Scraper**
   ```bash
   npm run scrape-reddit 200
   ```

## Security Note

The service role key:

- ✅ **Should be used** in server-side scripts (like the scraper)
- ✅ **Should be used** in backend API routes
- ❌ **Should NEVER** be exposed in client-side code
- ❌ **Should NEVER** be committed to git (already in .gitignore)

Your `.env.local` file is already in `.gitignore`, so it's safe to store the key there.

## Alternative: Use MCP Supabase

If you have MCP Supabase configured, you can also insert data directly using MCP tools instead of the scraper script. However, the scraper is more convenient for bulk operations.
