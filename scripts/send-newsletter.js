#!/usr/bin/env node

/**
 * Script to send newsletter for a new blog post
 * Usage: node scripts/send-newsletter.js <blog-post-id>
 * Example: node scripts/send-newsletter.js claude-code-game-changer
 */

const https = require('https')
const http = require('http')

async function sendNewsletter(blogPostId) {
  if (!blogPostId) {
    console.error('❌ Blog post ID is required')
    console.log('Usage: node scripts/send-newsletter.js <blog-post-id>')
    console.log('Example: node scripts/send-newsletter.js claude-code-game-changer')
    process.exit(1)
  }

  const data = JSON.stringify({
    blogPostId: blogPostId,
    secretKey: 'defendre-newsletter-2025' // In production, use environment variable
  })

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/send-blog-newsletter',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length,
    },
  }

  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let responseData = ''

      res.on('data', (chunk) => {
        responseData += chunk
      })

      res.on('end', () => {
        try {
          const result = JSON.parse(responseData)
          if (res.statusCode === 200) {
            console.log('✅ Newsletter sent successfully!')
            console.log(`📧 Blog post: ${result.blogPost}`)
            console.log(`👥 Subscribers: ${result.subscriberCount}`)
            resolve(result)
          } else {
            console.error('❌ Failed to send newsletter:', result.error)
            reject(new Error(result.error))
          }
        } catch (error) {
          console.error('❌ Failed to parse response:', error.message)
          reject(error)
        }
      })
    })

    req.on('error', (error) => {
      console.error('❌ Request failed:', error.message)
      reject(error)
    })

    req.write(data)
    req.end()
  })
}

// Get blog post ID from command line arguments
const blogPostId = process.argv[2]

console.log('📤 Sending newsletter...')
console.log(`📝 Blog post ID: ${blogPostId}`)

sendNewsletter(blogPostId)
  .then(() => {
    console.log('🎉 Done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('💥 Error:', error.message)
    process.exit(1)
  })