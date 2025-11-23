'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PieChart, Shield, Check, Zap, TrendingUp, Lock, BarChart3 } from 'lucide-react'

const features = [
  {
    title: 'Resource Leak Detection',
    description:
      'Automated surveillance of income, bills, and subscriptions. Identify and plug financial leaks before they compromise your stability.',
    icon: PieChart,
    gradient: 'from-indigo-500 to-blue-500',
  },
  {
    title: 'Stability Fortress Protocol',
    description:
      'Construct a defensive financial perimeter. We assist in building a 90-day runway to ensure operational continuity.',
    icon: Shield,
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    title: 'Tactical Directives',
    description:
      'Receive clear, actionable weekly missions. No vague advice—just precise orders to optimize your finances and habits.',
    icon: Check,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Strategic AI Advisor',
    description:
      'An intelligent system that communicates like a commander, not a calculator. It demands action and enforces accountability.',
    icon: Zap,
    gradient: 'from-indigo-500 to-violet-500',
  },
  {
    title: 'Real-Time Analytics',
    description:
      'Live financial dashboards with instant insights. Track spending patterns, income trends, and budget performance in real-time.',
    icon: BarChart3,
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Secure & Private',
    description:
      'Bank-level encryption protects your data. Your financial information stays private and secure, always under your control.',
    icon: Lock,
    gradient: 'from-cyan-500 to-blue-500',
  },
]

export function LandingFeatures() {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background gradients for glass effect visibility */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/40 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Eliminate Uncertainty. Execute with Precision.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Data without action is noise. Life Command OS transforms metrics into missions, ensuring
            you never operate blind again.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full border-white/20 dark:border-white/10 glass hover:bg-white/20 dark:hover:bg-white/10 hover:border-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-default shadow-lg relative overflow-hidden">
                {/* Gradient background on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10`}
                />
                <CardHeader>
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}
                  >
                    <feature.icon className="h-7 w-7" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
