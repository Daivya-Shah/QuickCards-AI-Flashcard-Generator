# QuickCards AI

An AI-powered flashcard generator that turns any block of text into a ready-to-study deck in seconds. Built with Next.js, OpenAI, Firebase, Clerk, and Stripe.

## What it does

You paste in some text (lecture notes, a Wikipedia article, anything), click generate, and GPT-4o-mini turns it into 10 flashcards. Each card has a front and back, and you can flip them with a click. Once you like what you see, save the deck under a name and come back to it anytime.

## Features

- **AI flashcard generation** using GPT-4o-mini via the OpenAI API
- **3D flip animation** on every card for a satisfying study experience
- **Save decks to the cloud** so your cards are always there when you need them
- **User accounts** handled by Clerk (sign up, sign in, profile management)
- **Free and Pro plans** with Stripe subscription billing for the paid tier

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| UI | Material UI v6, Tailwind CSS |
| Auth | Clerk |
| Database | Firebase Firestore |
| AI | OpenAI (gpt-4o-mini) |
| Payments | Stripe |

## Getting Started

### Prerequisites

- Node.js 18+
- A Clerk account (for auth)
- A Firebase project (for Firestore)
- An OpenAI API key
- A Stripe account (for payments)

### Installation

1. Clone the repo:

```bash
git clone https://github.com/your-username/QuickCards-AI-Flashcard-Generator.git
cd QuickCards-AI-Flashcard-Generator
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the root and add your credentials:

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

4. Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> Firebase is configured directly in `firebase.js`. If you want to use your own Firebase project, update the config values in that file.

## Project Structure

```
app/
  page.js                     # Landing page (features, pricing, CTAs)
  layout.js                   # Root layout with ClerkProvider
  generate/page.js            # Flashcard generator (text input + preview)
  flashcards/page.js          # Dashboard showing all saved decks
  flashcard/page.js           # Individual deck viewer
  result/page.js              # Stripe payment result page
  sign-in/[[...sign-in]]/     # Clerk sign-in page
  sign-up/[[...sign-up]]/     # Clerk sign-up page
  api/
    generate/route.js         # POST: calls OpenAI to generate flashcards
    checkout_sessions/route.js # POST/GET: Stripe checkout session handling
firebase.js                   # Firebase app + Firestore initialization
middleware.ts                 # Clerk middleware (protects routes)
utils/get-stripe.js           # Stripe.js singleton loader
```

## How It Works

1. A signed-in user types or pastes text into the generator and clicks **Generate Flashcards**.
2. The app sends a POST request to `/api/generate`, which calls GPT-4o-mini with a system prompt that requests exactly 10 flashcards in JSON format.
3. The cards are displayed with a 3D flip animation. Clicking a card flips it to reveal the answer.
4. The user can save the deck by giving it a name. The deck and its cards are written to Firestore under `users/{userId}/{deckName}/`.
5. Saved decks are listed on the `/flashcards` page and can be opened for review anytime.

## Pricing

| Plan | Price | What you get |
|---|---|---|
| Basic | Free | Core flashcard generation and storage |
| Pro | $4.99/month | Unlimited flashcards, advanced features, priority support |

## Deployment

The easiest way to deploy is with [Vercel](https://vercel.com). Connect your GitHub repo and add your environment variables in the Vercel dashboard. Everything else is handled automatically.