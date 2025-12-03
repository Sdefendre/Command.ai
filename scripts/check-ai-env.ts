import { config } from 'dotenv'
import path from 'path'
import fs from 'fs'

// Load environment variables from .env.local
const envPath = path.resolve(process.cwd(), '.env.local')
if (fs.existsSync(envPath)) {
  console.log(`Loading environment from ${envPath}`)
  config({ path: envPath })
} else {
  console.log('No .env.local file found. Checking process environment...')
}

const requiredVars = ['XAI_API_KEY', 'NEXT_PUBLIC_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_ANON_KEY']

const optionalVars = [
  'OPENAI_API_KEY', // For voice agent or other OpenAI features
  'SUPABASE_SERVICE_ROLE_KEY', // For server-side rate limiting/admin
]

console.log('\n--- Checking AI Command Environment Variables ---\n')

let missingRequired = false

requiredVars.forEach((varName) => {
  if (process.env[varName]) {
    console.log(`✅ ${varName} is set`)
  } else {
    console.error(`❌ ${varName} is MISSING`)
    missingRequired = true
  }
})

console.log('\n--- Optional Variables ---\n')

optionalVars.forEach((varName) => {
  if (process.env[varName]) {
    console.log(`✅ ${varName} is set`)
  } else {
    console.log(`⚠️  ${varName} is not set (some features might be limited)`)
  }
})

console.log('\n----------------------------------------------')

if (missingRequired) {
  console.error('\n❌ Configuration incomplete. The Command chat will NOT work.')
  console.log('Please add the missing variables (Grok key) to your .env.local file.')
  process.exit(1)
} else {
  console.log('\n✅ Configuration looks good! The AI Command Chat should work.')
  console.log('Run "npm run dev" and visit http://localhost:3000/command to test.')
}
