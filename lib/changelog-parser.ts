import { readFileSync } from 'fs'
import { join } from 'path'

export interface ChangelogEntry {
  version: string
  date?: string
  sections: {
    added?: string[]
    changed?: string[]
    deprecated?: string[]
    removed?: string[]
    fixed?: string[]
    security?: string[]
  }
}

export interface ParsedChangelog {
  entries: ChangelogEntry[]
}

/**
 * Parses the CHANGELOG.md file following the Keep a Changelog format
 */
export function parseChangelog(): ParsedChangelog {
  try {
    const filePath = join(process.cwd(), 'CHANGELOG.md')
    const content = readFileSync(filePath, 'utf-8')

    const entries: ChangelogEntry[] = []
    const lines = content.split('\n')

    let currentEntry: ChangelogEntry | null = null
    let currentSection: keyof ChangelogEntry['sections'] | null = null

    for (let i = 0; i < lines.length; i++) {
      const originalLine = lines[i]
      const line = originalLine.trim()

      // Match version headers: ## [Version] - Date or ## [Unreleased]
      const versionMatch = line.match(/^##\s+\[(.*?)\](?:\s+-\s+(.*?))?$/)
      if (versionMatch) {
        // Save previous entry if exists
        if (currentEntry) {
          entries.push(currentEntry)
        }

        currentEntry = {
          version: versionMatch[1],
          date: versionMatch[2] || undefined,
          sections: {},
        }
        currentSection = null
        continue
      }

      // Skip empty lines or non-section headers if no entry
      if (!currentEntry || !line) continue

      // Match section headers: ### Added, ### Changed, etc.
      const sectionMatch = line.match(
        /^###\s+(Added|Changed|Deprecated|Removed|Fixed|Security|Technical Improvements)$/i
      )
      if (sectionMatch) {
        const sectionName = sectionMatch[1].toLowerCase() as keyof ChangelogEntry['sections']
        // Map "technical improvements" to "changed" for now
        const mappedSection = sectionName === 'technical improvements' ? 'changed' : sectionName
        if (
          ['added', 'changed', 'deprecated', 'removed', 'fixed', 'security'].includes(mappedSection)
        ) {
          currentSection = mappedSection as keyof ChangelogEntry['sections']
          if (!currentEntry.sections[currentSection]) {
            currentEntry.sections[currentSection] = []
          }
        }
        continue
      }

      // Match bullet points: - Item (handles both top-level and nested)
      if (currentSection && line.startsWith('-')) {
        const item = line.replace(/^-\s+/, '').trim()
        if (item) {
          // Check if this is a nested item (indented with 2+ spaces before the dash)
          const isNested = /^\s{2,}-/.test(originalLine)
          const lastItem =
            currentEntry.sections[currentSection]?.[
              currentEntry.sections[currentSection]!.length - 1
            ]

          if (isNested && lastItem) {
            // Append nested item to last item with proper formatting
            currentEntry.sections[currentSection]![
              currentEntry.sections[currentSection]!.length - 1
            ] = lastItem + '\n  • ' + item
          } else {
            // New top-level item
            currentEntry.sections[currentSection]!.push(item)
          }
        }
        continue
      }

      // Handle multi-line bullet points (continuation lines - not starting with - or #)
      if (currentSection && line && !line.startsWith('#') && !line.startsWith('-')) {
        const lastItem =
          currentEntry.sections[currentSection]?.[currentEntry.sections[currentSection]!.length - 1]
        if (lastItem) {
          // Check if this is a continuation of a nested item (starts with spaces)
          const isNestedContinuation = /^\s{2,}/.test(originalLine)
          const indent = isNestedContinuation ? '  • ' : ' '

          // Append to last item
          currentEntry.sections[currentSection]![
            currentEntry.sections[currentSection]!.length - 1
          ] = lastItem + indent + line.trim()
        }
      }
    }

    // Don't forget the last entry
    if (currentEntry) {
      entries.push(currentEntry)
    }

    return { entries }
  } catch (error) {
    console.error('Error parsing changelog:', error)
    return { entries: [] }
  }
}

/**
 * Gets section display name
 */
export function getSectionDisplayName(section: string): string {
  const names: Record<string, string> = {
    added: 'Added',
    changed: 'Changed',
    deprecated: 'Deprecated',
    removed: 'Removed',
    fixed: 'Fixed',
    security: 'Security',
  }
  return names[section] || section.charAt(0).toUpperCase() + section.slice(1)
}

/**
 * Gets section icon (using emoji for simplicity, can be replaced with Lucide icons)
 */
export function getSectionIcon(section: string): string {
  const icons: Record<string, string> = {
    added: '✨',
    changed: '🔄',
    deprecated: '⚠️',
    removed: '🗑️',
    fixed: '🐛',
    security: '🔒',
  }
  return icons[section] || '•'
}
