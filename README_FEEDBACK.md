# Feedback System Documentation

## Overview

The feedback system allows users to submit feedback, bug reports, feature requests, and content feedback from anywhere on the Command website.

## Features

- **Multi-location Access**: Feedback buttons are available in:
  - Site header (desktop & mobile)
  - Blog post pages
  - Dashboard header
  - Floating button (bottom-right corner on all pages)

- **Feedback Types**:
  - General Feedback
  - Bug Report
  - Feature Request
  - Content Feedback

- **Rating System**: Optional 1-5 star rating
- **Optional Email**: Users can provide email for follow-up
- **Path Tracking**: Automatically tracks which page the feedback came from

## Database Schema

The `site_feedback` table stores all feedback submissions:

```sql
site_feedback (
  id: bigint (primary key)
  created_at: timestamptz
  type: 'general' | 'bug' | 'feature' | 'content'
  message: text (required)
  rating: integer (1-5, optional)
  email: text (optional)
  path: text (optional - page URL)
  user_agent: text (optional - browser info)
)
```

## API Endpoints

### POST `/api/feedback`

Submit new feedback.

**Request Body:**

```json
{
  "type": "general" | "bug" | "feature" | "content",
  "message": "Feedback text (required)",
  "rating": 1-5 (optional),
  "email": "user@example.com" (optional),
  "path": "/blog/post-1" (optional, auto-detected),
  "userAgent": "browser info" (optional, auto-detected)
}
```

**Response:**

```json
{
  "message": "Feedback submitted successfully",
  "id": 123
}
```

### GET `/api/feedback`

Retrieve feedback (admin/service role only).

**Query Parameters:**

- `type`: Filter by feedback type
- `limit`: Number of results (default: 50)
- `offset`: Pagination offset (default: 0)
- `minRating`: Minimum rating filter

**Response:**

```json
{
  "feedback": [...],
  "total": 100,
  "limit": 50,
  "offset": 0
}
```

## Components

### FeedbackDialog

Main feedback dialog component.

```tsx
import { FeedbackDialog } from '@/components/FeedbackDialog'
;<FeedbackDialog path="/optional/path" trigger={<CustomButton />} />
```

### FeedbackFloatingButton

Floating feedback button (already included in root layout).

```tsx
import { FeedbackFloatingButton } from '@/components/FeedbackFloatingButton'
;<FeedbackFloatingButton path="/current/page" />
```

## Security

- **Row Level Security (RLS)** is enabled on `site_feedback` table
- Anyone (public) can insert feedback
- Only service role can view feedback (for admin/API access)
- Email addresses are optional and only used for follow-up

## Usage Examples

### Basic Usage

The feedback button is already integrated in:

- `components/SiteHeader.tsx` - Header navigation
- `app/blog/[id]/page.tsx` - Blog post pages
- `components/dashboard-header.tsx` - Dashboard header
- `app/layout.tsx` - Floating button (site-wide)

### Custom Integration

To add feedback to a custom page:

```tsx
'use client'

import { FeedbackDialog } from '@/components/FeedbackDialog'
import { Button } from '@/components/ui/button'

export default function MyPage() {
  return (
    <div>
      <FeedbackDialog path="/my-page" trigger={<Button variant="outline">Give Feedback</Button>} />
    </div>
  )
}
```

## Database Access

To view feedback in Supabase:

1. Log into Supabase Dashboard
2. Navigate to Table Editor
3. Select `site_feedback` table
4. View all submissions

Or use the API:

```bash
# Get all feedback (requires service role key)
curl https://your-site.com/api/feedback

# Get bug reports only
curl https://your-site.com/api/feedback?type=bug

# Get high-rated feedback
curl https://your-site.com/api/feedback?minRating=4
```

## Environment Variables

Ensure these are set in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## Future Enhancements

Potential improvements:

- Email notifications for new feedback
- Admin dashboard to view/manage feedback
- Feedback analytics (rating trends, popular pages)
- Auto-tagging based on content analysis
- Integration with issue tracking systems
