# 📧 Automated Blog Newsletter System

## Overview

Automatically send beautiful newsletters to subscribers whenever you publish a new blog post. The system stores subscribers, creates professional HTML emails, and tracks engagement.

## Features

✅ **Subscriber Management** - Automatic storage and management  
✅ **Professional Email Design** - Glass morphism aesthetic matching your site  
✅ **Blog Post Detection** - Automatically pulls post content and metadata  
✅ **Batch Email Sending** - Sends to all active subscribers  
✅ **Admin Notifications** - Get notified when newsletters are sent  
✅ **Unsubscribe Support** - Simple reply-to-unsubscribe  

## Quick Start

### 1. Send Newsletter for New Blog Post

```bash
# Using npm script (recommended)
npm run send-newsletter claude-code-game-changer

# Or directly with node
node scripts/send-newsletter.js claude-code-game-changer
```

### 2. Available Blog Post IDs

Check `constants/blog.ts` for available blog post IDs:
- `claude-code-game-changer`
- Add new blog posts to the BLOG_POSTS array

## API Endpoints

### Subscribe to Newsletter
```
POST /api/newsletter
Content-Type: application/json

{
  "email": "user@example.com"
}
```

### Send Blog Newsletter
```
POST /api/send-blog-newsletter
Content-Type: application/json

{
  "blogPostId": "your-blog-post-id",
  "secretKey": "defendre-newsletter-2025"
}
```

## File Structure

```
├── app/api/
│   ├── newsletter/route.ts          # Subscribe endpoint
│   └── send-blog-newsletter/route.ts  # Send blog newsletter
├── lib/
│   └── subscribers.ts               # Subscriber management
├── data/
│   └── subscribers.json            # Subscriber storage
├── scripts/
│   └── send-newsletter.js          # CLI script
└── NEWSLETTER.md                   # This documentation
```

## Subscriber Storage

Subscribers are stored in `data/subscribers.json`:

```json
{
  "subscribers": [
    {
      "email": "user@example.com",
      "subscribedAt": "2025-08-22T20:54:58.536Z",
      "isActive": true
    }
  ]
}
```

## Email Templates

### Welcome Email
- Sent when user first subscribes
- Explains newsletter benefits
- Professional glass morphism design

### Blog Post Newsletter
- Sent for each new blog post
- Includes post title, excerpt, tags
- Call-to-action button to read full post
- Matching site aesthetic

## Environment Variables

Required for email functionality:

```env
GMAIL_USER=steve.defendre12@gmail.com
GMAIL_APP_PASSWORD=your_app_password
NEXT_PUBLIC_SITE_URL=https://defendresolutions.com
NEWSLETTER_SECRET_KEY=your_secret_key  # Optional, defaults to 'defendre-newsletter-2025'
```

## Workflow for New Blog Posts

1. **Add blog post** to `constants/blog.ts`
2. **Test locally** with dev server running
3. **Send newsletter**:
   ```bash
   npm run send-newsletter your-new-post-id
   ```
4. **Verify delivery** - Check admin notification email

## Production Considerations

### Database Migration
For production, consider migrating from JSON file to a database:
- PostgreSQL with Prisma
- Supabase
- MongoDB
- Firebase Firestore

### Enhanced Features
- Email templates with dynamic content
- Subscriber preferences (frequency, topics)
- Analytics and open tracking
- A/B testing for subject lines
- Automated scheduling

### Security
- Use environment variables for secret keys
- Implement proper authentication for admin endpoints
- Rate limiting for subscription endpoint
- Email validation and spam protection

## Troubleshooting

### No Emails Sent
1. Check `GMAIL_APP_PASSWORD` environment variable
2. Verify Gmail app password is correct
3. Check console logs for error messages

### Newsletter Not Found
1. Verify blog post ID exists in `constants/blog.ts`
2. Check spelling of blog post ID

### Subscriber Issues
1. Check `data/subscribers.json` exists and is writable
2. Verify JSON format is valid

## Support

For issues or questions:
- Check console logs for detailed error messages
- Verify all environment variables are set
- Test with a single subscriber first

---

**Defendre Solutions Newsletter System**  
Built with Next.js, Nodemailer, and TypeScript