# 🛍️ ShopSphere — Production-Ready MERN E-Commerce Platform

ShopSphere is a full-stack E-Commerce application built using the **MERN** stack (**M**ongoDB, **E**xpress.js, **R**eact, **N**ode.js). Designed with a clean, modular, and scalable architecture suitable for production deployment and high-grade academic evaluation.

---

## 🛠️ Technology Stack

- **Frontend**: React (Vite), React Router v7, Axios, Lucide Icons, Custom CSS Design System
- **Backend**: Node.js, Express.js
- **Database**: MongoDB & Mongoose ORM
- **Authentication**: JSON Web Tokens (JWT) + HTTP-Only Cookies & Bcrypt.js
- **Security & Utilities**: Helmet, CORS, Morgan, Express Async Handler

---

## 📁 Repository Directory Structure

```
Project 1/
├── .gitignore              # Global git ignore rules (node_modules, .env, build output)
├── README.md               # Root project documentation & setup guide
├── client/                 # React Frontend (Scaffolded with Vite)
│   ├── .env.example        # Frontend environment variables template
│   ├── index.html          # Main HTML entry document
│   ├── package.json        # Client dependencies & scripts
│   ├── vite.config.js      # Vite build configuration
│   └── src/
│       ├── main.jsx        # React application bootstrap entry point
│       ├── App.jsx         # Root component with providers & routing setup
│       ├── assets/         # Static assets (images, branding, logos)
│       ├── components/     # Reusable React UI components
│       │   ├── admin/      # Admin dashboard & management components
│       │   ├── auth/       # Authentication forms & Protected Route wrapper
│       │   ├── cart/       # Cart item cards, checkout summary
│       │   ├── common/     # Global Navbar, Footer, Loader, Modals, Buttons
│       │   ├── layout/     # Page layout wrappers (MainLayout, AuthLayout)
│       │   └── product/    # Product cards, product grid, filters
│       ├── context/        # React Context API (AuthContext, CartContext)
│       ├── hooks/          # Custom hooks (useAuth, useCart, useFetch)
│       ├── pages/          # Full page views (Home, Shop, Cart, Login, Register, Admin)
│       ├── services/       # Axios API layer (api, authService, productService, orderService)
│       ├── styles/         # CSS design system, CSS variables & global utility classes
│       └── utils/          # Constants, currency formatters, date formatters
│
└── server/                 # Node.js + Express REST API Backend
    ├── .env.example        # Backend environment variables template
    ├── package.json        # Server dependencies & npm scripts
    ├── server.js           # Server entry point, middleware setup & server startup
    └── src/
        ├── config/         # Database connection configuration (Mongoose DB setup)
        ├── controllers/    # Request handlers / Business logic
        │   ├── authController.js       # Register, login, profile, logout logic
        │   ├── categoryController.js   # Category management logic
        │   ├── orderController.js      # Order placement & retrieval logic
        │   ├── productController.js    # Product listing, search & pagination logic
        │   └── userController.js       # User administration logic
        ├── middleware/     # Custom Express middleware
        │   ├── authMiddleware.js       # JWT token verification & Admin RBAC check
        │   └── errorMiddleware.js      # Global 404 handler & Express error middleware
        ├── models/         # Mongoose Schemas & Data Models
        │   ├── Category.js             # Product category schema
        │   ├── Order.js                # Order items, shipping & payment schema
        │   ├── Product.js              # Product details, stock & review schema
        │   └── User.js                 # User credentials, password hashing & role schema
        ├── routes/         # Express API Route Definitions
        │   ├── authRoutes.js           # /api/v1/auth routes
        │   ├── categoryRoutes.js       # /api/v1/categories routes
        │   ├── orderRoutes.js          # /api/v1/orders routes
        │   └── productRoutes.js        # /api/v1/products routes
        ├── seeder/         # Database seeding script & mock sample data
        │   ├── sampleData.js           # Initial sample categories and products
        │   └── seeder.js               # DB populator script (`npm run seed`)
        └── utils/          # Backend utility helpers
            ├── apiError.js             # Custom standardized Error class
            ├── apiResponse.js          # Standardized API Response formatter
            └── generateToken.js        # JWT token generator helper
```

---

## ⚡ Getting Started

### 1. Backend Setup (`server/`)
```bash
cd server
npm install
cp .env.example .env     # Configure MONGO_URI and JWT_SECRET in .env
npm run dev              # Starts dev server on http://localhost:5000
```

### 2. Frontend Setup (`client/`)
```bash
cd client
npm install
cp .env.example .env     # Configure VITE_API_BASE_URL if needed
npm run dev              # Starts Vite dev server on http://localhost:5173
```

---

## 📡 API Endpoint Blueprint

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/v1/auth/register` | Register new user account | Public |
| **POST** | `/api/v1/auth/login` | Authenticate user & issue JWT | Public |
| **POST** | `/api/v1/auth/logout` | Clear auth token / cookie | Public |
| **GET** | `/api/v1/auth/profile` | Get current user profile | Private |
| **GET** | `/api/v1/products` | Fetch paginated products with search filter | Public |
| **GET** | `/api/v1/products/:id` | Fetch single product by ID | Public |
| **POST** | `/api/v1/products` | Create a new product | Private/Admin |
| **GET** | `/api/v1/categories` | Fetch all product categories | Public |
| **POST** | `/api/v1/categories` | Create new product category | Private/Admin |
| **POST** | `/api/v1/orders` | Place a new order | Private |
| **GET** | `/api/v1/orders/myorders` | Get logged-in user's orders | Private |
| **GET** | `/api/v1/orders/:id` | Get details for specific order | Private |
