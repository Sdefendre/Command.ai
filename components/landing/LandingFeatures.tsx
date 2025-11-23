'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageSquare, GraduationCap, Target, Map, Users, Lock } from 'lucide-react'
import { LANDING_FEATURES } from '@/constants/landing'

const iconMap = {
  MessageSquare,
  GraduationCap,
  Target,
  Map,
  Users,
  Lock,
}

export function LandingFeatures() {
  return (
    <section id="features" className="py-16 sm:py-24 relative overflow-hidden">
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 not-italic font-sans">
            {LANDING_FEATURES.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {LANDING_FEATURES.description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {LANDING_FEATURES.items.map((feature, index) => {
            const Icon = iconMap[feature.iconName as keyof typeof iconMap]
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-white/20 dark:border-white/10 glass hover:bg-white/20 dark:hover:bg-white/10 hover:border-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-150 group cursor-default shadow-lg relative overflow-hidden">
                  {/* Gradient background on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-150 -z-10`}
                  />
                  <CardHeader>
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-150 shadow-lg`}
                    >
                      <Icon className="h-7 w-7" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary-gradient transition-colors duration-150">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
