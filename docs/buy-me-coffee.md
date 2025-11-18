# Buy Me a Coffee - Stripe Integration

This document explains the "Buy Me a Coffee" payment integration added to DefendreSolutions.

## Overview

A Stripe-powered donation/tip feature has been added to the contact section, allowing visitors to support development with a coffee purchase.

## Features

- **Multiple Amount Options**: $3, $5, $10, $20 preset amounts
- **Stripe Checkout**: Secure payment processing via Stripe's hosted checkout
- **Responsive Design**: Integrated seamlessly with existing glassmorphism design
- **Mobile Friendly**: Works across all device sizes

## Implementation Details

### Files Added/Modified

1. **Components**:
   - `components/BuyMeCoffee.tsx` - Main component with Stripe integration
   - `components/defendre-solutions-portfolio.tsx` - Modified to include the component

2. **API Routes**:
   - `app/api/create-checkout-session/route.ts` - Server-side Stripe session creation

3. **Configuration**:
   - `.env.local` - Environment variables for Stripe keys
   - `package.json` - Added Stripe dependencies

### Environment Variables Required

```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
```

**Note**: Currently using placeholder keys. Replace with actual Stripe keys for production.

### Integration Location

The Buy Me a Coffee component is integrated as a third card in the contact section:
- **Mobile**: Spans full width below the other two cards
- **Tablet**: Spans two columns 
- **Desktop**: Single column alongside Email and Quick intro form

## Usage

1. Visitor selects an amount ($3, $5, $10, or $20)
2. Clicks "Buy Coffee for $X" button
3. Redirected to Stripe Checkout
4. After payment, returns to site with success confirmation

## Stripe Setup Required

1. Create Stripe account at https://stripe.com
2. Get publishable and secret keys from Stripe dashboard
3. Replace placeholder keys in `.env.local`
4. Test with Stripe test keys first
5. Switch to live keys for production

## Success/Cancel URLs

- **Success**: `/?success=true`
- **Cancel**: `/?canceled=true`

Consider adding success/cancel page handling for better UX.