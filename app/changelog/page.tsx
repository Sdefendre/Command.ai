import { SiteHeader } from '@/components/SiteHeader'
import { SubtleThreeBackground } from '@/components/SubtleThreeBackground'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import {
  parseChangelog,
  getSectionDisplayName,
  getSectionIcon,
  type ChangelogEntry,
} from '@/lib/changelog-parser'

export const metadata = {
  title: 'Changelog - Life Command OS',
  description: 'All notable changes and updates to Life Command OS.',
}

/**
 * Formats a markdown-style list item to HTML
 * Handles bold text (**text**), code (`text`), and links [text](url)
 */
function formatChangelogItem(item: string): JSX.Element {
  // Split by markdown patterns
  const parts: (string | JSX.Element)[] = []
  let remaining = item

  // Process links [text](url)
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  let linkMatch
  let lastIndex = 0

  const linkMatches: Array<{ start: number; end: number; text: string; url: string }> = []
  while ((linkMatch = linkRegex.exec(item)) !== null) {
    linkMatches.push({
      start: linkMatch.index,
      end: linkMatch.index + linkMatch[0].length,
      text: linkMatch[1],
      url: linkMatch[2],
    })
  }

  // Process bold **text**
  const boldRegex = /\*\*([^*]+)\*\*/g
  const boldMatches: Array<{ start: number; end: number; text: string }> = []
  let boldMatch
  while ((boldMatch = boldRegex.exec(item)) !== null) {
    boldMatches.push({
      start: boldMatch.index,
      end: boldMatch.index + boldMatch[0].length,
      text: boldMatch[1],
    })
  }

  // Process code `text`
  const codeRegex = /`([^`]+)`/g
  const codeMatches: Array<{ start: number; end: number; text: string }> = []
  let codeMatch
  while ((codeMatch = codeRegex.exec(item)) !== null) {
    codeMatches.push({
      start: codeMatch.index,
      end: codeMatch.index + codeMatch[0].length,
      text: codeMatch[1],
    })
  }

  // Combine all matches and sort by position
  const allMatches = [
    ...linkMatches.map((m) => ({ ...m, type: 'link' as const })),
    ...boldMatches.map((m) => ({ ...m, type: 'bold' as const, url: '' })),
    ...codeMatches.map((m) => ({ ...m, type: 'code' as const, url: '' })),
  ].sort((a, b) => a.start - b.start)

  // Build the parts array
  lastIndex = 0
  for (const match of allMatches) {
    if (match.start > lastIndex) {
      parts.push(item.slice(lastIndex, match.start))
    }

    if (match.type === 'link') {
      parts.push(
        <a
          key={`link-${match.start}`}
          href={match.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline font-medium"
        >
          {match.text}
        </a>
      )
    } else if (match.type === 'bold') {
      parts.push(
        <strong key={`bold-${match.start}`} className="font-semibold">
          {match.text}
        </strong>
      )
    } else if (match.type === 'code') {
      parts.push(
        <code
          key={`code-${match.start}`}
          className="px-1.5 py-0.5 bg-accent rounded text-sm font-mono"
        >
          {match.text}
        </code>
      )
    }

    lastIndex = match.end
  }

  if (lastIndex < item.length) {
    parts.push(item.slice(lastIndex))
  }

  return <>{parts.length > 0 ? parts : item}</>
}

/**
 * Renders a changelog entry section
 */
function ChangelogSection({
  title,
  items,
  icon,
}: {
  title: string
  items: string[]
  icon: string
}) {
  if (!items || items.length === 0) return null

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <span className="text-xl">{icon}</span>
        {title}
      </h3>
      <ul className="space-y-2 ml-6">
        {items.map((item, idx) => {
          // Split by newlines to handle nested items
          const parts = item.split('\n')
          const mainItem = parts[0]
          const nestedItems = parts.slice(1)

          return (
            <li key={idx} className="text-muted-foreground leading-relaxed list-disc mb-3">
              {formatChangelogItem(mainItem)}
              {nestedItems.length > 0 && (
                <ul className="mt-2 ml-6 space-y-1.5 list-none">
                  {nestedItems.map((nested, nestedIdx) => (
                    <li
                      key={nestedIdx}
                      className="text-sm text-muted-foreground/90 leading-relaxed"
                    >
                      {formatChangelogItem(nested.replace(/^  •\s*/, ''))}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

/**
 * Renders a single changelog entry
 */
function ChangelogEntry({ entry }: { entry: ChangelogEntry }) {
  const isUnreleased = entry.version.toLowerCase() === 'unreleased'

  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <CardTitle className="text-2xl">
            {isUnreleased ? '🚧 ' : ''}
            {entry.version}
          </CardTitle>
          {entry.date && (
            <Badge variant="outline" className="text-sm">
              {new Date(entry.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(entry.sections).map(([section, items]) => {
            if (!items || items.length === 0) return null
            return (
              <ChangelogSection
                key={section}
                title={getSectionDisplayName(section)}
                items={items}
                icon={getSectionIcon(section)}
              />
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export default function ChangelogPage() {
  const { entries } = parseChangelog()

  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative">
      <SubtleThreeBackground />
      <SiteHeader />

      <main className="container mx-auto px-4 sm:px-6 max-w-4xl py-12 sm:py-16 md:py-20">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Changelog</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            All notable changes to Life Command OS are documented here.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            The format is based on{' '}
            <a
              href="https://keepachangelog.com/en/1.0.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Keep a Changelog
            </a>
            , and this project adheres to{' '}
            <a
              href="https://semver.org/spec/v2.0.0.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Semantic Versioning
            </a>
            .
          </p>
        </div>

        <Separator className="mb-8" />

        {/* Changelog Entries */}
        {entries.length > 0 ? (
          <div>
            {entries.map((entry, index) => (
              <ChangelogEntry key={`${entry.version}-${index}`} entry={entry} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No changelog entries found.</p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
