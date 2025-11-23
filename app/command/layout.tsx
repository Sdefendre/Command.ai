export default function CommandLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-full overflow-hidden bg-background flex flex-col">{children}</div>
  )
}
