import { MainHeader } from '@/components/MainHeader'
import { LandingFooter } from '@/components/landing/LandingFooter'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <MainHeader />
      <main className="flex-1 container mx-auto px-4 py-12 mt-20 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <div className="prose dark:prose-invert max-w-none space-y-4">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <p>
            Welcome to Command. This Privacy Policy explains how we collect, use, disclose, and
            safeguard your information when you visit our website.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
          <p>
            We may collect information about you in a variety of ways. The information we may
            collect on the Site includes:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Personal Data:</strong> Personally identifiable information, such as your
              name, shipping address, email address, and telephone number.
            </li>
            <li>
              <strong>Derivative Data:</strong> Information our servers automatically collect when
              you access the Site, such as your IP address, your browser type, your operating
              system, your access times, and the pages you have viewed directly before and after
              accessing the Site.
            </li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">2. Use of Your Information</h2>
          <p>
            Having accurate information about you permits us to provide you with a smooth,
            efficient, and customized experience. We may use information collected about you via the
            Site to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Create and manage your account.</li>
            <li>Email you regarding your account or order.</li>
            <li>
              Fulfill and manage purchases, orders, payments, and other transactions related to the
              Site.
            </li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">3. Contact Us</h2>
          <p>If you have questions or comments about this Privacy Policy, please contact us.</p>
        </div>
      </main>
      <LandingFooter />
    </div>
  )
}
