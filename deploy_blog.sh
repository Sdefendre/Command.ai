#!/bin/bash

# Deploy script for updating blog posts

echo "🚀 Defendre Solutions Blog Update Script"
echo "========================================="

# Navigate to project directory
cd "/Users/stevesmacmini/Desktop/Code/Active Projects/code/DefendreSolutions"

# Create new branch
echo "📝 Creating new branch: updated-blog-posts"
git checkout -b updated-blog-posts

# Check if there are changes
echo "🔍 Checking for changes..."
git status

# Add all blog post files
echo "📁 Adding blog post files..."
git add blog_posts/
git add constants_updated.tsx

# Commit changes
echo "💾 Committing changes..."
git commit -m "feat: Add 15 comprehensive blog posts for veteran tech content

- Military Precision to Code: How military training shapes developers
- Building Secure Applications: Defense sector security lessons  
- Rapid Deployment Strategies: CI/CD with military principles
- Military Approach to Requirements: Intelligence-based gathering
- Clear Communication: Military comms for dev teams
- Beyond Claude Code: Comprehensive AI tools guide
- Future of Defense Tech: AI, cybersecurity, and innovation
- Responsible AI Development: Ethics and best practices
- Transitioning Military to Tech: Complete veteran guide
- Building Diverse Teams: Why veteran hiring matters
- Military Networking: Leveraging veteran connections
- Giving Back: Supporting veteran tech education
- Remote Work Strategies: Military precision for distributed teams
- Braids by Rose Case Study: Project showcase
- Veteran Entrepreneurship 2025: State of the ecosystem

All posts are SEO-optimized, engaging, and leverage military experience to provide unique insights into software development and tech leadership."

# Push to GitHub
echo "⬆️ Pushing to GitHub..."
git push origin updated-blog-posts

echo "✅ Success! Blog posts have been pushed to the 'updated-blog-posts' branch"
echo ""
echo "Next steps:"
echo "1. Go to GitHub and create a Pull Request"
echo "2. Review the changes"
echo "3. Merge to main branch"
echo "4. Deploy to production"
echo ""
echo "🎖️ Mission complete!"