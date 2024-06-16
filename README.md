# Next.js Checkout Application

This is a Next.js application for a checkout page that integrates with Stripe for payment processing. The application includes a form for users to enter their email, credit card information, and billing address.

## Features

- Collects email, card details, and billing address
- Uses Stripe for secure payment processing
- Includes an option to save billing information for future use

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/emiliaProgram/payment-checkout-page.git
   cd payment-checkout-page
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root of the project and add your Stripe secret key and publishable key:
   ```env
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-publishable-key
   STRIPE_SECRET_KEY=your-secret-key
   ```

## Usage

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Open the application:**
   Open your browser and navigate to `http://localhost:3000` to view the checkout page.

## Project Structure

```
payment-checkout-page/
├── app/
│   ├── api/
│   │   └── checkout_sessions/
│   │       └── route.ts
│   ├── components/
│   │   └── CheckoutForm.tsx
│   │   └── CheckoutForm.module.css
│   └── page.tsx
├── lib/
│   └── stripe.ts
├── .env.local
├── package.json
├── tsconfig.json
└── ...
```

## Components

- **CheckoutForm.tsx**: The main form component where users enter their payment details.
- **CheckoutForm.module.css**: The CSS module for styling the checkout form.

## API Routes

- **route.ts**: Handles creating a Stripe checkout session.

## Styling

- **CSS Modules**: The project uses CSS Modules for component-level styling.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Stripe](https://stripe.com/)
