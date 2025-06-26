# Booking CRM Frontend

Booking CRM is a customer relationship management system tailored for service-based businesses. It allows businesses to register, manage services, set schedules, and accept online bookings from clients. The platform is designed to streamline the booking process and enhance communication with clients.

---

## Key Features

### MVP 1.0

- Business registration, login & profile
- Service creation and management
- Schedule & availability setup
- Guest online booking (name & contact)
- Admin booking management (view, edit, cancel)
- Email booking confirmations & reminders

### MVP 2.0 (Planned)

- Client accounts (auth, booking history, rebook)
- Multi-employee management with individual schedules
- Business analytics (clients, bookings, revenue)
- Optional: payment integration, reviews, calendar sync

---

## System Requirements

### Version requirements

- **Node.js** 18.x or later (recommended LTS)
- **npm** 9.x or later

### Required software

- Git
- Code Editor
- Prettier
- ESLint

---

## Architecture

The project uses the **App Router** in Next.js and follows a **modular architecture**, which can evolve toward FSD (Feature-Sliced Design) as complexity grows.

### `src/` folder structure:

- **app/** — Main app configuration, routing, layout
- **components/** — Reusable UI components
- **features/** — Feature-level logic (e.g., auth, booking)
- **entities/** — Domain models and logic (e.g., User, Booking)
- **shared/** — Common utils, constants, API client, hooks, styles

_Note: folders like `features/`, `entities/`, etc., will be added as needed during development._

---

## Installing Dependencies

Make sure Node.js and npm are installed. Check with:

```bash
node -v
npm -v
```

### Clone the project

Using HTTPS:

```bash
git clone https://github.com/BookingCRMteam/booking-crm-front.git
```

Using SSH:

```bash
git clone git@github.com:BookingCRMteam/booking-crm-front.git
```

Navigate into the project folder:

```bash
cd booking-crm-front
```

Install dependencies:

```bash
npm install
```

---

## Project Scripts

| Script    | Description                                                    |
| --------- | -------------------------------------------------------------- |
| `dev`     | Starts the development server using Next.js (`localhost:3000`) |
| `build`   | Builds the app for production                                  |
| `start`   | Starts the production server after build                       |
| `lint`    | Runs ESLint on the codebase                                    |
| `format`  | Formats the code using Prettier                                |
| `prepare` | Initializes Husky to enable Git hooks                          |
| `test`    | Placeholder for future Jest tests                              |

---

## Code Quality

### Pre-commit hooks (via Husky + lint-staged)

Automatically formats and lints staged files before every commit:

```json
"lint-staged": {
  "*.{js,jsx,ts,tsx,json,css,md}": [
    "prettier --write",
    "eslint --fix"
  ]
}
```

---

## Contribution

1. Checkout the latest version of `dev` branch:

   ```bash
   git checkout dev
   git pull origin dev
   ```

2. Create a feature branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Code your feature, commit with Conventional Commits:

   ```
   feat: implement booking form
   ```

4. Push and open a Pull Request into `dev`

5. Use the `.github/pull_request_template.md`

6. Delete the feature branch after merge

---

**Made with ❤️ by the Booking CRM Frontend team**
