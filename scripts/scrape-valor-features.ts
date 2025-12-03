/**
 * Valor AI Features Scraper
 *
 * This script scrapes features from tryvalor.ai and converts them
 * into roadmap items for Command.
 *
 * Usage: npm run scrape-valor-features
 */

import * as cheerio from 'cheerio'
import { writeFileSync } from 'fs'
import { join } from 'path'

interface ScrapedFeature {
  title: string
  description: string
  imageUrl?: string
}

interface RoadmapItem {
  id: string
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
  complexity: 'high' | 'medium' | 'low'
  status: 'planned' | 'in-progress' | 'completed' | 'on-hold'
  phase: string
}

/**
 * Generate a unique ID from a title
 */
function generateId(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 50)
}

/**
 * Scrape features from tryvalor.ai
 */
async function scrapeValorFeatures(): Promise<ScrapedFeature[]> {
  const urls = [
    'https://www.tryvalor.ai',
    'https://www.tryvalor.ai/roadmap',
    'https://www.tryvalor.ai/#features',
  ]

  const allFeatures: ScrapedFeature[] = []

  for (const url of urls) {
    try {
      console.log(`Fetching ${url}...`)
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        },
      })

      if (!response.ok) {
        console.log(`Skipping ${url} - HTTP error! status: ${response.status}`)
        continue
      }

      const html = await response.text()
      const $ = cheerio.load(html)
      const features: ScrapedFeature[] = []

      // Look for features section - try multiple selectors
      // Common patterns: section#features, [id*="feature"], etc.

      // Method 1: Look for section with id="features" or similar
      const featuresSection = $(
        '#features, [id*="feature" i], section:has(h2:contains("Feature")), section:has(h2:contains("How"))'
      )

      if (featuresSection.length > 0) {
        console.log('Found features section')

        // Look for feature cards or items within the section
        featuresSection
          .find('[class*="card" i], [class*="feature" i], article, .grid > div')
          .each((_, element) => {
            const $el = $(element)
            const title = $el.find('h3, h4, h2, [class*="title" i]').first().text().trim()
            const description = $el
              .find('p, [class*="description" i], [class*="text" i]')
              .first()
              .text()
              .trim()
            const imageUrl =
              $el.find('img').first().attr('src') || $el.find('img').first().attr('data-src')

            if (title && description && title.length > 3 && description.length > 10) {
              features.push({
                title,
                description,
                imageUrl: imageUrl
                  ? imageUrl.startsWith('http')
                    ? imageUrl
                    : `https://www.tryvalor.ai${imageUrl}`
                  : undefined,
              })
            }
          })
      }

      // Method 2: If no features found, look for common feature patterns across the page
      if (features.length === 0) {
        console.log('No features section found, searching for feature patterns...')

        // Look for cards with titles and descriptions
        $('div[class*="card"], div[class*="feature"], article').each((_, element) => {
          const $el = $(element)
          const title = $el.find('h3, h4, h2, h5').first().text().trim()
          const description = $el.find('p').first().text().trim()

          // Skip if it looks like navigation or footer content
          const parentSection = $el.closest('section, nav, footer')
          if (parentSection.length > 0) {
            const sectionId = parentSection.attr('id') || ''
            const sectionClass = parentSection.attr('class') || ''
            if (
              sectionId.includes('nav') ||
              sectionClass.includes('nav') ||
              sectionId.includes('footer') ||
              sectionClass.includes('footer')
            ) {
              return
            }
          }

          if (title && description && title.length > 3 && description.length > 20) {
            const imageUrl =
              $el.find('img').first().attr('src') || $el.find('img').first().attr('data-src')

            // Avoid duplicates
            if (!features.some((f) => f.title === title)) {
              features.push({
                title,
                description,
                imageUrl: imageUrl
                  ? imageUrl.startsWith('http')
                    ? imageUrl
                    : `https://www.tryvalor.ai${imageUrl}`
                  : undefined,
              })
            }
          }
        })
      }

      // Method 3: Look for "How it works" or similar sections
      if (features.length === 0) {
        console.log('Searching for "How it works" sections...')

        $('section, div[class*="section"]').each((_, section) => {
          const $section = $(section)
          const heading = $section.find('h2, h3').first().text().toLowerCase()

          if (heading.includes('how') || heading.includes('feature') || heading.includes('work')) {
            $section
              .find('div[class*="card"], div[class*="item"], article, li')
              .each((_, element) => {
                const $el = $(element)
                const title = $el.find('h3, h4, h5, strong').first().text().trim()
                const description = $el.find('p').first().text().trim()

                if (title && description && title.length > 3 && description.length > 15) {
                  if (!features.some((f) => f.title === title)) {
                    features.push({
                      title,
                      description,
                    })
                  }
                }
              })
          }
        })
      }

      // Method 4: Look for roadmap items (if on roadmap page)
      $('[class*="roadmap"], [id*="roadmap"]').each((_, roadmapSection) => {
        const $roadmap = $(roadmapSection)
        $roadmap.find('[class*="item"], [class*="card"], li, article').each((_, element) => {
          const $el = $(element)
          const title = $el.find('h3, h4, h5, h2, strong, [class*="title"]').first().text().trim()
          const description = $el
            .find('p, [class*="description"], [class*="text"]')
            .first()
            .text()
            .trim()

          if (title && description && title.length > 3 && description.length > 10) {
            if (!features.some((f) => f.title === title)) {
              features.push({
                title,
                description,
              })
            }
          }
        })
      })

      // Method 5: Look for any divs with "View Detail" buttons (common pattern for feature cards)
      $('button, a').each((_, button) => {
        const $button = $(button)
        const buttonText = $button.text().toLowerCase()
        if (
          buttonText.includes('view detail') ||
          buttonText.includes('learn more') ||
          buttonText.includes('see more')
        ) {
          const $card = $button.closest('div, article, section')
          const title = $card.find('h3, h4, h5, h2, [class*="title"]').first().text().trim()
          const description = $card.find('p').first().text().trim()

          if (title && description && title.length > 3 && description.length > 10) {
            if (!features.some((f) => f.title === title)) {
              features.push({
                title,
                description,
              })
            }
          }
        }
      })

      console.log(`Found ${features.length} features from ${url}`)

      // Add features, avoiding duplicates
      features.forEach((feature) => {
        if (!allFeatures.some((f) => f.title === feature.title)) {
          allFeatures.push(feature)
        }
      })
    } catch (error) {
      console.error(`Error scraping ${url}:`, error)
      // Continue with other URLs
    }
  }

  console.log(`\nTotal unique features found: ${allFeatures.length}`)
  return allFeatures
}

/**
 * Convert scraped features to roadmap items
 */
function convertToRoadmapItems(features: ScrapedFeature[]): RoadmapItem[] {
  return features.map((feature, index) => {
    // Determine priority and complexity based on feature content
    let priority: 'high' | 'medium' | 'low' = 'medium'
    let complexity: 'high' | 'medium' | 'low' = 'medium'

    const titleLower = feature.title.toLowerCase()
    const descLower = feature.description.toLowerCase()

    // High priority keywords
    if (
      titleLower.includes('ai') ||
      titleLower.includes('assistant') ||
      descLower.includes('ai') ||
      descLower.includes('intelligent')
    ) {
      priority = 'high'
    }

    // Complexity indicators
    if (
      descLower.includes('integration') ||
      descLower.includes('api') ||
      descLower.includes('connect') ||
      descLower.includes('sync')
    ) {
      complexity = 'high'
    } else if (
      descLower.includes('track') ||
      descLower.includes('view') ||
      descLower.includes('display')
    ) {
      complexity = 'low'
    }

    // Assign to appropriate phase
    // Since these are Valor AI features, we'll add them as a new phase or integrate them
    const phase = 'Phase 5: AI-Powered Features (Inspired by Valor AI)'

    return {
      id: generateId(feature.title),
      title: feature.title,
      description: feature.description,
      priority,
      complexity,
      status: 'planned',
      phase,
    }
  })
}

/**
 * Main function
 */
async function main() {
  try {
    console.log('Starting Valor AI features scrape...\n')

    const features = await scrapeValorFeatures()

    if (features.length === 0) {
      console.log('No features found. The website structure may have changed.')
      console.log('You may need to manually inspect the page and update the selectors.')
      return
    }

    console.log('\nScraped features:')
    features.forEach((feature, index) => {
      console.log(`${index + 1}. ${feature.title}`)
      console.log(`   ${feature.description.substring(0, 80)}...`)
    })

    // Convert to roadmap items
    const roadmapItems = convertToRoadmapItems(features)

    // Save to JSON file
    const outputPath = join(process.cwd(), 'valor-features.json')
    writeFileSync(outputPath, JSON.stringify(features, null, 2), 'utf-8')
    console.log(`\n✓ Saved scraped features to ${outputPath}`)

    // Save roadmap items
    const roadmapPath = join(process.cwd(), 'valor-roadmap-items.json')
    writeFileSync(roadmapPath, JSON.stringify(roadmapItems, null, 2), 'utf-8')
    console.log(`✓ Saved roadmap items to ${roadmapPath}`)

    console.log('\nNext steps:')
    console.log('1. Review the scraped features in valor-features.json')
    console.log('2. Review the roadmap items in valor-roadmap-items.json')
    console.log('3. Add the roadmap items to constants/roadmap.ts')
  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
}

// Run if called directly
if (require.main === module) {
  main()
    .then(() => {
      console.log('\nDone!')
      process.exit(0)
    })
    .catch((error) => {
      console.error('Fatal error:', error)
      process.exit(1)
    })
}

export { scrapeValorFeatures, convertToRoadmapItems }
