export type ProjectLinks = {
  live?: string
  code?: string
}

export type Project = {
  title: string
  tag: string
  desc: string
  metrics?: string
  links: ProjectLinks
}

export const PROJECTS: Project[] = [
  {
    title: "Braids by Rose",
    tag: "Business Website",
    desc: "Professional hair braiding business website with online booking system, gallery showcase, and mobile-optimized design.",
    metrics: "300% increase in bookings • 2-week delivery • 5-star client review",
    links: {
      live: "https://braidsbyrose.com",
    },
  },

]

