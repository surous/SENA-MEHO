# Sena Medical Hospital - Public Demo

A fully functional hospital management system demo built with Next.js 15, Prisma, and NextAuth.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL (Prisma ORM)
- **Auth**: NextAuth.js
- **Icons**: Lucide React
- **Analytics**: Recharts
- **Notifications**: React Hot Toast

## Key Features
- **Public Landing Page**: Modern, responsive design with services, doctors, and contact sections.
- **Patient Portal**: Dashboard for health overview, appointment booking, and history.
- **Doctor Dashboard**: Schedule management, patient attendance tracking, and note-taking.
- **Admin Console**: User management, department controls, and mock analytics.
- **Role-Based Access**: Specialized views and permissions for Admin, Doctor, and Patient roles.
- **Mock Systems**: Integrated simulated payment flow and notification system.

## Setup Instructions

1. **Clone the repository**
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Configure Environment Variables**
   Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Add your `DATABASE_URL` and `NEXTAUTH_SECRET`.

4. **Setup Database**
   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

5. **Run Development Server**
   ```bash
   npm run dev
   ```

## Demo Credentials

| Role    | Email                | Password   |
|---------|----------------------|------------|
| Admin   | admin@sena.com       | admin123   |
| Doctor  | sarah.wilson@sena.com| doctor123  |
| Patient | john.doe@gmail.com   | patient123 |

## Deployment
This project is Vercel-ready. Ensure you add the environment variables in the Vercel dashboard.

---
*Note: This is a demo system. Payments, notifications, and medical data are simulated for demonstration purposes only.*
