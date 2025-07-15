# Subly Admin Panel

A modern, modular admin dashboard built with Next.js, React, and Tailwind CSS. This project is designed for flexibility, clean code, and easy extension—ideal for managing products, users, orders, and more.

---

## 🚀 Features

- **Next.js 15** with file-based routing
- **Component-based architecture** (generic, reusable tables & modals)
- **Supabase** integration for backend data
- **Authentication** with NextAuth.js
- **React Query** for data fetching & caching
- **Radix UI** for accessible dialogs, switches, etc.
- **Tailwind CSS** for fast, responsive design
- **Fully responsive** (mobile/tablet/desktop)
- **Easy to extend**: add new resources, columns, or forms with minimal code

---

## 🛠️ Stack & Main Packages

- `next`, `react`, `react-dom`
- `@supabase/supabase-js` (API integration)
- `@tanstack/react-query` (data fetching)
- `@radix-ui/react-*` (UI primitives)
- `tailwindcss`, `postcss`, `autoprefixer`
- `next-auth` (authentication)
- `sonner` (toasts/notifications)
- `lucide-react` (icons)

---

## 📁 Folder Structure (Key Parts)

```
components/
  Table/           # All generic table & modal components
  ui/              # Low-level UI primitives (Button, Input, Dialog, ...)
layouts/           # App layout wrappers
pages/             # Next.js pages (dashboard, products, customers, ...)
services/          # API & backend service functions
styles/            # Tailwind/global CSS
lib/               # Utility functions
```

---

## ⚡ Getting Started

1. **Clone the repo:**
   ```bash
   git clone https://github.com/erfanmirasadi/SUBLY-admin-Page.git
   cd SUBLY-admin-Page
   ```
2. **Install dependencies:**
   ```bash
   yarn install
   # or npm install
   ```
3. **Configure environment variables:**
   - Copy the following into a `.env` file at the root:
     ```env
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
     NEXT_PUBLIC_SUPABASE_KEY=your_supabase_key
     # (Never commit real keys to public repos)
     ```
4. **Run the development server:**
   ```bash
   yarn dev
   # or npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000)

---

## 🧩 Main Components & Usage

### Generic Table (`components/Table/GenericTable.jsx`)

A highly reusable table with built-in CRUD actions, pagination, and modals.

**Example Usage:**

```jsx
import GenericTable from "@/components/Table/GenericTable";
import { userColumns } from "./userColumns";
import { userFormFields } from "./userFormFields";
import useTableModalForm from "@/components/Table/useTableModalForm";

const modalProps = useTableModalForm();

<GenericTable
  columns={userColumns}
  data={users}
  formFields={userFormFields}
  modalProps={modalProps}
  onSubmit={handleUserSubmit}
  onDelete={handleUserDelete}
  isLoading={isLoading}
/>;
```

- **columns**: Array of column definitions (see `/pages/*/userColumns.js`)
- **formFields**: Array of form field configs (see `/pages/*/userFormFields.js`)
- **modalProps**: Modal state/handlers from `useTableModalForm`

### Generic Form Modal (`components/Table/GenericFormModal.jsx`)

A flexible modal for add/edit forms, used inside the table but can be used standalone.

**Props:**

- `open`, `mode`, `initialValues`, `onClose`, `onSubmit`, `formFields`, ...

---

## 🏗️ How to Add a New Resource (e.g. Products)

1. Define your columns: `pages/product/allProducts/productColumns.js`
2. Define your form fields: `pages/product/allProducts/productFormFields.js`
3. Use `<GenericTable ... />` in your page, pass the right props.
4. (Optional) Add API service in `services/`

---

## 🧩 UI Primitives

All low-level UI elements (Button, Input, Dialog, Spinner, etc.) are in `components/ui/` and are used throughout the app for consistency.

---

## 🔒 Security & Environment

- **Never commit real API keys or secrets.** Use `.env` and add it to `.gitignore`.
- All sensitive config (Supabase, Auth, etc.) is loaded from environment variables.

---

## 🧑‍💻 Contributing

- Fork the repo, create a feature branch, and submit a pull request.
- Please keep code modular and follow the existing component structure.
- For new tables/resources, use the generic table/modal pattern.

---

## 📣 Contact

For questions, suggestions, or issues, open an issue on GitHub or contact the maintainer.

---

Enjoy building with Subly Admin Panel!
