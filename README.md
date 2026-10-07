# LavaLust Admin

React frontend for the LavaLust admin workspace and member catalog. This project builds to static files and deploys independently from the PHP backend. It reads and writes through the backend API; it does not keep account or inventory records in browser storage.

## Sign in and first admin

Admins and members use the same sign-in page at `/`. After sign-in, admins are sent to the control room and users or moderators are sent to the member catalog at `/account/`.

If the database has no administrator yet, add a unique secret to the backend's ignored `.env` file:

```dotenv
ADMIN_BOOTSTRAP_KEY=replace-with-a-long-random-secret
```

Restart the LavaLust server, open the frontend root, and use that key in the first-admin setup form. Choose a password with at least 12 characters. The bootstrap endpoint is disabled as soon as an administrator account exists.

## Run locally

Run the backend server from the sibling `Lab#6` directory and Vite from this directory:

```powershell
Set-Location -LiteralPath 'C:\xampp\htdocs\Lab6\Lab#6'
php lava serve
```

```powershell
Set-Location -LiteralPath 'C:\xampp\htdocs\Lab6\frontend'
npm install
npm run dev
```

Open `http://localhost:5173/`. Vite proxies API requests to the local backend at `http://127.0.0.1:3000`.

## Separate deployment

The production build is configured to call `https://lab6-valdez-ryanemmanuel.onrender.com`. To point it at a different backend, set `VITE_API_BASE_URL` in the frontend build environment and build with `npm run build`. Deploy the generated `dist/` directory to a static host that serves `index.html` for `/account/` paths.

On the backend, set `FRONTEND_ORIGINS` to the exact frontend origin (for example, `https://app.example.com`). For cross-site frontend and API domains, configure `SESSION_COOKIE_SECURE=true` and `SESSION_COOKIE_SAMESITE=None`; use HTTPS for both sites. These settings are required for browser session cookies to be sent with API requests.

## Backend features

- Overview metrics are queried from `users` and `products`.
- Product CRUD uses `name`, unique `sku`, `category`, `description`, `price`, `stock`, and `status`.
- User management uses the existing `admin`, `moderator`, and `user` roles, active status, and password hashes.
- Migration status and pending migration execution are available to authenticated administrators.
- All management endpoints require an active admin session. Public bootstrap is allowed only when no admin exists and a bootstrap key is configured.
