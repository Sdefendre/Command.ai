import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Changelog - Command',
  description: 'All notable changes and updates to Command.',
}

export default function ChangelogPage() {
  redirect('/features#changelog')
}
