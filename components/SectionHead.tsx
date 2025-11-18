interface SectionHeadProps {
  kicker?: string
  title: string
  subtitle?: string
  id?: string
}

export function SectionHead({ kicker, title, subtitle, id }: SectionHeadProps) {
  return (
    <div className="text-center">
      {kicker && <p className="text-sm font-medium text-blue-400 uppercase tracking-wider mb-2">{kicker}</p>}
      <h2 id={id} className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>
      {subtitle && <p className="text-lg text-gray-300 max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  )
}
