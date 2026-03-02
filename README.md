# test-retest-003

A simple responsive landing page built with Next.js 14 and TypeScript featuring a hero section, a features grid, and a contact form. Includes backend endpoints for contact messages, a small features API, and a health endpoint. An admin dashboard allows viewing and managing contact submissions.

## Features
- Responsive hero section with CTA
- Features grid sourced from API
- Contact form with client/server validation
- Thank-you confirmation page
- Admin dashboard to list, view, and delete submissions
- Health endpoint for uptime monitoring

## Tech Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Prisma + SQLite
- Jest + Testing Library
- Playwright

## Prerequisites
- Node.js 18+
- npm

## Quick Start
```bash
./install.sh
# or on Windows
./install.ps1
```

Then run:
```bash
npm run dev
```

## Environment Variables
Create a `.env` file based on `.env.example`:
- `DATABASE_URL`
- `JWT_SECRET`
- `NEXT_PUBLIC_API_URL`
- `ADMIN_TOKEN` (optional token for admin access)

## Project Structure
```
src/
  app/               # App Router pages and API routes
  components/        # UI components and landing/admin sections
  providers/         # Auth and toast providers
  lib/               # Utilities, prisma client, auth helpers
  types/             # Shared TypeScript types
prisma/              # Prisma schema
```

## API Endpoints
- `GET /api/health`
- `GET /api/hero`
- `GET /api/features`
- `POST /api/contact`
- `GET /api/contact` (admin)
- `GET /api/contact/:id` (admin)
- `DELETE /api/contact/:id` (admin)

## Available Scripts
- `npm run dev` - start dev server
- `npm run build` - generate Prisma client and build
- `npm run start` - start production server
- `npm run lint` - run ESLint
- `npm run test` - run Jest tests
- `npm run test:e2e` - run Playwright tests

## Testing
- Unit/Integration: `npm run test`
- E2E: `npm run test:e2e`

## Admin Access
Provide an `ADMIN_TOKEN` in `.env` and use it in the Admin Dashboard token field. Requests must include `Authorization: Bearer <ADMIN_TOKEN>`.
