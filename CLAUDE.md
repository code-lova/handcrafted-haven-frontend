# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Handcrafted Haven — a Next.js frontend for a marketplace connecting artisans (sellers) with buyers. This repo is the frontend only; it talks to a separate backend API over HTTP (configured via `NEXT_PUBLIC_API_URL`). There is no backend code, database, or ORM in this repo.

## Commands

```bash
npm run dev      # start dev server (Turbopack)
npm run build    # production build
npm run start    # run production build
npm run lint     # next lint (eslint.config.mjs -> next/core-web-vitals, next/typescript)
```

There is no test suite/framework configured in this repo (no test script, no Jest/Vitest config).

Required env vars (`.env.local`): `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `JWT_SECRET`, `NEXT_PUBLIC_API_URL` (backend base URL), `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`.

## Architecture

**Stack:** Next.js 15 (App Router) + React 19 + TypeScript, Tailwind CSS v4, NextAuth v4 (credentials provider, JWT sessions), TanStack Query v5, Formik + Yup for forms, Cloudinary for image hosting.

### Route groups (`src/app`)

- `(auth)` — `/login`, `/signup`, public.
- `(dashboard)` — `/seller/*` and `/buyer/*`, role-protected.
- `(shop)` — `/cart`, `/checkout`, `/story`, `/story/[id]`, `/success`, public browsing.
- `api/auth/[...nextauth]/route.ts` — the only backend-ish code in this repo: NextAuth config. `authorize()` calls the external API's `/auth/login`, and the `jwt`/`session` callbacks stash `role` and `accessToken` on the token/session.

### Auth & route protection

- `src/middleware.ts` uses `withAuth` from `next-auth/middleware`. Its `matcher` only covers `/seller/:path*`, `/buyer/:path*`, `/login`, `/signup` — routes outside that matcher are NOT gated here. It redirects authenticated users away from `/login`/`/signup` based on `token.role`, and redirects role-mismatched access to `/unauthorized`.
- Role model is just two roles: `"seller"` and `"buyer"` (see `roleBasedRoutes` in middleware and `UserRole` in `src/types/index.ts`).
- Client-side auth state: `src/context/userContext.tsx` wraps `useUser` (`src/hooks/useUser.ts`, a TanStack Query hook hitting `getAuthUser`) to expose `user`/`isLoading`/`refetchUser` app-wide.
- Sign-out goes through `useSignOut` pattern in `src/utils/logoutHandler.ts`: calls the backend `logoutRequest` to invalidate the token server-side, clears the QueryClient cache and `UserContext`, then calls NextAuth's `signOut`.
- Authenticated API calls go through `src/utils/fetchWithAuth.ts`, which pulls the access token via `getSession()`, sets the `Authorization: Bearer` header, and force-signs-out on a 401 response.

### Provider nesting (`src/app/layout.tsx`)

`TanstackProvider` > `SessionProviderWrapper` (NextAuth `SessionProvider`) > `UserProvider` > `CartProvider`. Order matters: `CartProvider` and `UserProvider` both depend on the NextAuth session being available above them.

### Data layer pattern (per feature: story, category, comment, order, user, auth)

Each feature under `src/service/request/<feature>/` has `index.ts` (functions like `getAllX`, `createX`, `updateX`, `deleteX`, each doing a raw `fetch`/`fetchWithAuth` call to `${NEXT_PUBLIC_API_URL}/...`, checking `response.ok`, throwing `Error(errorData.message || ...)` on failure) and `type.ts` (the feature's request/response types). Public GET endpoints use plain `fetch`; anything requiring auth uses `fetchWithAuth`.

Components consume these via TanStack Query directly (no repository/store abstraction) — `useQuery({ queryKey, queryFn: getAllX })` for reads, `useMutation({ mutationFn: createX/updateX/deleteX, onSuccess: () => queryClient.invalidateQueries(...) })` for writes, with `react-hot-toast` for success/error feedback. See `src/components/dashboard/seller/category/Index.tsx` for the canonical example of this list/create/edit/delete pattern (query + mutation + modal + skeleton loader).

Form validation uses Formik + a Yup schema from `src/schema/<feature>/`.

### Other structure

- `src/components/core/` — generic reusable UI (buttons, modals, skeletons, spinners, date formatter, image upload).
- `src/components/ui/` — page-level composed views (e.g. `HomePage`, `StoryPage`, `Cart`, `Checkout`) rendered by `src/app` pages.
- `src/components/dashboard/{seller,buyer}/` — role-specific dashboard views, organized by feature subfolder (mirrors `src/service/request` and `src/schema` feature naming).
- Cart is client-side and per-buyer: `src/context/CartContext.tsx` persists to localStorage via `src/utils/CartStorage.ts`, keyed by `buyerId` from the session; it does not sync with a server cart.
- Image uploads go directly from the client to Cloudinary (`src/utils/uploadToCloudinary.ts`) using an unsigned upload preset, then the returned `secure_url`/`public_id` is sent to the backend as part of the story payload.
- Path alias `@/*` maps to `src/*` (see `tsconfig.json`).
