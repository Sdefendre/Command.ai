import fs from 'fs'
import path from 'path'

const SUBSCRIBERS_FILE = path.join(process.cwd(), 'data', 'subscribers.json')

export interface Subscriber {
  email: string
  subscribedAt: string
  isActive: boolean
}

export interface SubscribersData {
  subscribers: Subscriber[]
}

// Get all subscribers
export function getSubscribers(): Subscriber[] {
  try {
    if (!fs.existsSync(SUBSCRIBERS_FILE)) {
      // Create the file if it doesn't exist
      const initialData: SubscribersData = { subscribers: [] }
      fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(initialData, null, 2))
      return []
    }
    
    const data = fs.readFileSync(SUBSCRIBERS_FILE, 'utf8')
    const parsed: SubscribersData = JSON.parse(data)
    return parsed.subscribers || []
  } catch (error) {
    console.error('Error reading subscribers:', error)
    return []
  }
}

// Add a new subscriber
export function addSubscriber(email: string): boolean {
  try {
    // Ensure data directory exists
    const dataDir = path.dirname(SUBSCRIBERS_FILE)
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }
    
    const subscribers = getSubscribers()
    
    // Check if already subscribed
    const existing = subscribers.find(sub => sub.email.toLowerCase() === email.toLowerCase())
    if (existing) {
      if (existing.isActive) {
        return false // Already subscribed
      } else {
        // Reactivate subscription
        existing.isActive = true
        existing.subscribedAt = new Date().toISOString()
      }
    } else {
      // Add new subscriber
      subscribers.push({
        email: email.toLowerCase(),
        subscribedAt: new Date().toISOString(),
        isActive: true
      })
    }
    
    const data: SubscribersData = { subscribers }
    fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(data, null, 2))
    return true
  } catch (error) {
    console.error('Error adding subscriber:', error)
    return false
  }
}

// Get active subscribers only
export function getActiveSubscribers(): Subscriber[] {
  return getSubscribers().filter(sub => sub.isActive)
}

// Remove a subscriber (mark as inactive)
export function removeSubscriber(email: string): boolean {
  try {
    // Ensure data directory exists
    const dataDir = path.dirname(SUBSCRIBERS_FILE)
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }
    
    const subscribers = getSubscribers()
    const subscriber = subscribers.find(sub => sub.email.toLowerCase() === email.toLowerCase())
    
    if (subscriber) {
      subscriber.isActive = false
    }
    
    const data: SubscribersData = { subscribers }
    fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(data, null, 2))
    return true
  } catch (error) {
    console.error('Error removing subscriber:', error)
    return false
  }
}