import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Product Roadmap - Command',
  description: 'Future plans and feature roadmap for Command.',
}

export default function RoadmapPage() {
  redirect('/features#roadmap')
}
