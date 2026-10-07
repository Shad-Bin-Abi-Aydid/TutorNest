# TutorNest

> A full-stack tutoring marketplace: students find and book tutors, tutors manage their sessions, and admins keep the platform running.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express)
![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)

**🔗 Live site:** https://tutor-nest-wine.vercel.app
**🔗 API:** https://tutornest-jn28.onrender.com

> The API runs on Render's free tier. If the site has been idle, the first request can take up to a minute while the server wakes up.

![TutorNest home page](docs/screenshots/home.png)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Booking Lifecycle](#booking-lifecycle)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Deployment](#deployment)
- [Roadmap](#roadmap)
- [Author](#author)

---

## Overview

TutorNest connects students with tutors across subjects such as English, ICT and Computer Science. It has three roles (**Student**, **Tutor** and **Admin**), each with its own dashboard. Permissions are enforced on both the frontend and the API.

## Features

### For students
- Browse tutors and filter by name, subject, price range and minimum rating, with sorting
- View tutor profiles with experience, hourly rate and reviews
- Book a session by choosing a subject, date and time, and duration
- Track all bookings in a personal dashboard and cancel when plans change
- Rate and review a tutor after a completed session (one review per booking)

### For tutors
- Create a public tutor profile: bio, subjects, years of experience and hourly rate
- Manage incoming bookings: confirm them, mark them completed, or cancel

### For admins
- Overview dashboard of platform activity
- Manage subject categories (create, edit, delete)
- Manage users: change roles and block or unblock accounts
- See every booking on the platform with its status

### Platform
- Email/password and Google sign-in, powered by **Better Auth**
- Role-based access control on every protected page and API route
- Blocked users are rejected at login and on every protected endpoint
- Users with booking history can't be deleted. They're blocked instead, so nobody loses their booking records
- Optional profile photo at sign-up, uploaded directly to **Cloudinary** and cropped to a face-centered square. Users without a photo get an initials avatar
- Light and dark mode, responsive on every screen size

## Screenshots

| | |
|:---:|:---:|
| ![Find tutors](docs/screenshots/tutors.png) | ![Tutor profile](docs/screenshots/tutor-profile.png) |
| **Find tutors with filters** | **Tutor profile and booking** |
| ![Student dashboard](docs/screenshots/student-dashboard.png) | ![Tutor dashboard](docs/screenshots/tutor-dashboard.png) |
| **Student dashboard** | **Tutor dashboard** |
| ![Admin dashboard](docs/screenshots/admin-dashboard.png) | ![Manage users](docs/screenshots/admin-users.png) |
| **Admin dashboard** | **User management** |

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, shadcn/ui (Radix UI), Zod, Sonner, next-themes |
| **Backend** | Node.js, Express 5, TypeScript |
| **Authentication** | Better Auth (email/password and Google OAuth) |
| **Database** | PostgreSQL with Prisma ORM 7 |
| **Media storage** | Cloudinary |
| **Hosting** | Vercel (frontend), Render (API), Neon (PostgreSQL) |

## Architecture

```mermaid
flowchart LR
    B[Browser] -->|pages and /api/*| V[Next.js on Vercel]
    V -->|rewrites /api/*| R[Express API on Render]
    R --> D[(PostgreSQL on Neon)]
    B -->|profile photo upload| C[Cloudinary]
```

Key engineering decisions:

- **Single origin for authentication.** The frontend and API are hosted on different domains, so a session cookie set by the API would never reach Next.js server components. Next.js rewrites every `/api/*` request to the Express server. The browser only talks to the Vercel domain, which keeps the session cookie first-party and readable on the server.
- **Direct-to-storage uploads.** Profile photos go from the browser straight to Cloudinary through an unsigned upload preset, and only the resulting URL is stored. Image files never pass through the API, whose host has a temporary filesystem.
- **Data integrity over convenience.** Foreign keys use `RESTRICT`, so deleting a user who has bookings is refused with a clear `409 Conflict` instead of silently erasing other people's history. Admins block such users instead.
- **Blocking enforced at two layers.** A Better Auth session hook stops blocked users from logging in, and the API's auth middleware rejects any session that already exists.

## Booking Lifecycle

```
PENDING ──▶ CONFIRMED ──▶ COMPLETED ──▶ student can leave a review
   │            │
   └────────────┴──▶ CANCELLED
```

| Role | Allowed actions |
|---|---|
| Student | Create bookings, cancel their own bookings |
| Tutor | Confirm, complete or cancel bookings for their own profile |
| Admin | Set any status, delete bookings |

## Project Structure

```
TutorNest/
├── client/                    # Next.js frontend
│   ├── src/app/               # Routes (App Router), incl. protected dashboards
│   ├── src/components/        # UI components and feature modules
│   ├── src/lib/               # Auth client, helpers, image upload
│   └── next.config.ts         # /api proxy to the backend
└── server/                    # Express API
    ├── prisma/                # Schema, migrations and seed script
    └── src/
        ├── lib/               # Better Auth and Prisma setup
        ├── middlewares/       # Auth guard and global error handler
        └── modules/           # categories, users, tutorProfile, bookings, availability, reviews
```

## Getting Started

### Prerequisites
- Node.js 20 or later
- A PostgreSQL database (local, or hosted such as Neon)
- A Google OAuth client, for Google sign-in
- A Cloudinary account with an **unsigned** upload preset, for profile photos

### 1. Clone the repository
```bash
git clone https://github.com/Shad-Bin-Abi-Aydid/TutorNest.git
cd TutorNest
```

### 2. Set up the backend
```bash
cd server
npm install
```

Create `server/.env`:
```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/tutornest"
BETTER_AUTH_SECRET="a-long-random-string"
BETTER_AUTH_URL="http://localhost:5000"
APP_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

Create the tables, generate the Prisma client, add starter data and start the API:
```bash
npx prisma migrate deploy
npx prisma generate
npx prisma db seed
npm run dev
```
The API runs on http://localhost:5000.

### 3. Set up the frontend
```bash
cd ../client
npm install
```

Create `client/.env.local`:
```env
NEXT_PUBLIC_API_URL="http://localhost:5000"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="your-unsigned-preset"
```

```bash
npm run dev
```
The app runs on http://localhost:3000.

## Environment Variables

### Server (`server/.env`)

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `BETTER_AUTH_SECRET` | Secret used to sign sessions |
| `BETTER_AUTH_URL` | Public URL where auth routes are reached. Locally this is the API (`http://localhost:5000`). In production it's the **frontend** URL, because auth goes through the `/api` proxy |
| `APP_URL` | Frontend URL, used for CORS and trusted origins |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google OAuth credentials. Authorized redirect URI: `<BETTER_AUTH_URL>/api/auth/callback/google` |
| `NODE_ENV` | Set to `production` in production |
| `PORT` | Optional, defaults to `5000` |

### Client (`client/.env.local`)

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Base URL for API calls. Locally this is the API. In production it's the frontend's own URL, so requests go through the proxy |
| `API_URL` | Where the `/api` proxy forwards requests (the Express server). Defaults to `http://localhost:5000` |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | Name of the unsigned upload preset |

## API Reference

Base path: `/api`. Protected routes require a valid session cookie.

<details>
<summary><b>Authentication</b> (<code>/api/auth/*</code>)</summary>

Handled by Better Auth: email/password sign-up and sign-in, Google OAuth, session lookup and sign-out.
</details>

<details>
<summary><b>Tutor profiles</b> (<code>/api/tutor-profiles</code>)</summary>

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/` | Public | List tutors. Query: `search`, `categoryId`, `minPrice`, `maxPrice`, `minRating`, `sortBy`, `sortOrder` |
| GET | `/:id` | Public | Get one tutor profile |
| GET | `/me` | Tutor | Get your own profile |
| POST | `/` | Tutor | Create your profile |
| PATCH | `/:id` | Tutor, Admin | Update a profile |
| DELETE | `/:id` | Tutor, Admin | Delete a profile |
</details>

<details>
<summary><b>Bookings</b> (<code>/api/bookings</code>)</summary>

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/` | Student | Create a booking |
| GET | `/` | Any signed-in user | List bookings, scoped to your role |
| GET | `/:id` | Any signed-in user | Get one of your bookings |
| PATCH | `/:id` | Any signed-in user | Update status, following the role rules above |
| DELETE | `/:id` | Admin | Delete a booking |
</details>

<details>
<summary><b>Reviews</b> (<code>/api/reviews</code>)</summary>

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/` | Student | Review a completed booking (one per booking) |
| GET | `/tutor/:tutorProfileId` | Public | List a tutor's reviews |
</details>

<details>
<summary><b>Categories</b> (<code>/api/categories</code>)</summary>

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/` | Public | List categories |
| GET | `/:id` | Public | Get one category |
| POST | `/` | Admin | Create a category |
| PATCH | `/:id` | Admin | Rename a category |
| DELETE | `/:id` | Admin | Delete a category |
</details>

<details>
<summary><b>Users</b> (<code>/api/users</code>)</summary>

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/` | Admin | List users |
| GET | `/:id` | Admin | Get one user |
| PATCH | `/:id` | Admin | Change role or status (`ACTIVE` / `BLOCKED`) |
| DELETE | `/:id` | Admin | Delete a user with no booking history (`409` otherwise) |
</details>

<details>
<summary><b>Availability</b> (<code>/api/availabilities</code>)</summary>

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/` | Tutor | Add an availability slot |
| GET | `/my` | Tutor | List your own slots |
| GET | `/:id` | Public | List a tutor's slots |
| PATCH | `/:id` | Tutor | Update a slot |
| DELETE | `/:id` | Tutor, Admin | Delete a slot |
</details>

## Deployment

| Part | Platform | Configuration |
|---|---|---|
| Frontend | Vercel | Root directory `client`. Set the client environment variables, with `API_URL` pointing to the Express server |
| API | Render | Root directory `server`. Build: `npm install && npx prisma generate && npm run build`. Start: `npm start` |
| Database | Neon | Run `npx prisma migrate deploy` against the production `DATABASE_URL` |

## Roadmap

- Edit profile and change profile photo after sign-up
- Availability management in the tutor dashboard (the API already supports it)
- Email verification and password reset
- Online payments for sessions
- Email notifications for booking updates

## Author

**Shad Bin Abi Aydid**
GitHub: [@Shad-Bin-Abi-Aydid](https://github.com/Shad-Bin-Abi-Aydid)
