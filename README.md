# 🎓 Dr. Rashed's Academic Portfolio

A comprehensive full-stack portfolio website for university lecturers and academic professionals. Built with modern technologies and featuring a complete content management system.

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-badge-id/deploy-status)](https://app.netlify.com/sites/your-site/deploys)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/rashed-sir-portfolio)

## ✨ Features

### 🎯 **Core Features**
- **Modern Portfolio Design** - Clean, professional academic portfolio
- **Admin Dashboard** - Complete CMS for content management
- **Authentication System** - Secure login for admins
- **Responsive Design** - Optimized for all devices
- **SEO Optimized** - Meta tags and performance optimized

### 📚 **Content Management**
- **Personal Information** - Bio, contact, social links
- **Education Records** - Academic qualifications and degrees
- **Professional Experience** - Work history and positions
- **Teaching Records** - Courses taught and academic responsibilities
- **Research Projects** - Ongoing and completed research
- **Publications** - Academic papers and publications
- **News & Announcements** - Latest updates and achievements
- **Awards & Scholarships** - Recognition and achievements

### 🔧 **Technical Features**
- **Real-time Updates** - TanStack Query for data fetching
- **State Management** - Zustand for client state
- **Form Validation** - React Hook Form with validation
- **File Uploads** - Image and document management
- **Search & Filter** - Easy content discovery
- **Tabular Views** - Efficient data management in admin panel

## 🏗️ Technology Stack

### **Frontend**
- ⚛️ **React 18** - Modern React with hooks
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🧭 **React Router DOM** - Client-side routing
- 📊 **TanStack Query** - Data fetching and caching
- 🗃️ **Zustand** - State management
- 📝 **React Hook Form** - Form handling
- 🎯 **Material Tailwind** - UI components
- 🔥 **React Hot Toast** - Notifications
- ⚡ **Vite** - Build tool and dev server

### **Backend**
- 🚀 **Node.js** - Runtime environment
- 🛣️ **Express.js** - Web framework
- 🗄️ **MongoDB** - Database
- 🔗 **Mongoose** - ODM for MongoDB
- 🔐 **JWT** - Authentication
- 🛡️ **bcryptjs** - Password hashing
- ✅ **Joi** - Input validation
- 🛡️ **Helmet** - Security headers
- 📊 **Morgan** - Request logging

### **Deployment**
- 🌐 **Netlify** - Frontend hosting
- ⚡ **Vercel** - Backend hosting
- 🐙 **GitHub** - Version control

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- npm or yarn
- MongoDB (local or Atlas)

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/rashed-sir-portfolio.git
cd rashed-sir-portfolio
```

### 2. Install Dependencies (Monorepo)
```bash
npm install
npm run install:all
```

### 3. Environment Setup

**Backend (.env):**
```bash
cd backend
cp env.example .env
# Edit .env with your values
```

**Frontend (.env):**
```bash
cd frontend
cp env.example .env
# Edit .env with your values
```

### 4. Start Development
```bash
# Start both frontend and backend
npm run dev

# Or individually
npm run dev:backend
npm run dev:frontend
```

Visit:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 📁 Project Structure

```
rashed-sir-portfolio/
├── 📦 backend/                 # Express.js API
│   ├── 🛣️ routes/             # API routes
│   ├── 🗃️ models/             # Mongoose models
│   ├── 🛡️ middleware/         # Auth & validation
│   ├── 📝 scripts/            # Database scripts
│   ├── ⚡ server.js           # Entry point
│   └── 🚀 vercel.json         # Vercel config
├── 🎨 frontend/               # React application
│   ├── 📱 src/
│   │   ├── 🧩 components/     # Reusable components
│   │   ├── 📄 pages/          # Page components
│   │   ├── 🎯 hooks/          # Custom hooks
│   │   ├── 🗃️ stores/         # Zustand stores
│   │   ├── ⚙️ config/         # Configuration
│   │   └── 🎨 styles/         # CSS files
│   ├── 🌐 netlify.toml        # Netlify config
│   └── ⚡ vite.config.js      # Vite config
├── 📝 package.json            # Monorepo config
├── 🚫 .gitignore             # Git ignore rules
└── 📖 README.md              # This file
```

## 🚀 Deployment Guide

### **Option 1: Monorepo Deployment (Recommended)**

#### 🌐 Deploy Frontend to Netlify
1. Fork/clone this repository
2. Connect to Netlify
3. Set build settings:
   - **Build command**: `cd frontend && npm run build`
   - **Publish directory**: `frontend/dist`
4. Add environment variables in Netlify dashboard
5. Deploy!

#### ⚡ Deploy Backend to Vercel
1. Connect repository to Vercel
2. Set root directory to `backend`
3. Add environment variables in Vercel dashboard
4. Deploy!

### **Option 2: Separate Repositories**

You can split into separate repos:

```bash
# Create separate repositories
git subtree push --prefix=backend origin backend-main
git subtree push --prefix=frontend origin frontend-main
```

## 🌐 Deployment Configuration

### **Netlify Settings**
```toml
# netlify.toml (already configured)
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### **Vercel Settings**
```json
// vercel.json (already configured)
{
  "version": 2,
  "builds": [{"src": "server.js", "use": "@vercel/node"}],
  "routes": [{"src": "/(.*)", "dest": "/server.js"}]
}
```

## 🔧 Available Scripts

### **Root Level (Monorepo)**
```bash
npm run dev              # Start both frontend & backend
npm run build            # Build both applications
npm run install:all      # Install all dependencies
npm run clean            # Clean node_modules
npm run reset            # Clean & reinstall everything
```

### **Frontend**
```bash
npm run dev              # Development server
npm run build            # Production build
npm run preview          # Preview build
npm run lint             # Lint code
```

### **Backend**
```bash
npm run dev              # Development server
npm run start            # Production server
npm run seed             # Seed admin user
npm run migrate          # Migrate data
```

## 🔐 Admin Panel

Access the admin panel at `/admin` with credentials:
- **Email**: admin@example.com
- **Password**: SecurePassword123!

### Admin Features:
- 📊 **Dashboard** - Overview statistics
- 👤 **Personal Info** - Manage profile information
- 🎓 **Education** - Academic qualifications
- 💼 **Experience** - Professional history
- 👨‍🏫 **Teaching** - Course management
- 🔬 **Research** - Project tracking
- 📄 **Publications** - Paper management
- 📰 **News** - Announcements
- 🏆 **Awards** - Recognition tracking

## 🔄 Data Migration

Migrate existing data from JSON files:

```bash
cd backend
npm run migrate
```

This will populate the database with initial data from `frontend/src/data/` files.

## 🛡️ Security Features

- 🔐 **JWT Authentication** - Secure token-based auth
- 🛡️ **Password Hashing** - bcryptjs encryption
- 📝 **Input Validation** - Joi schema validation
- 🛡️ **Security Headers** - Helmet.js protection
- 🚦 **Rate Limiting** - API abuse prevention
- 🔒 **CORS Configuration** - Cross-origin security

## 🤝 Contributing

1. **Fork** the repository
2. **Create** feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** changes (`git commit -m 'Add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. **Open** Pull Request

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

- 📧 **Email**: your-email@example.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/yourusername/rashed-sir-portfolio/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/yourusername/rashed-sir-portfolio/discussions)

## 🎯 Roadmap

- [ ] **Multi-language Support** - International accessibility
- [ ] **Dark Mode** - Theme switching
- [ ] **PDF Generation** - CV/Resume export
- [ ] **Email Integration** - Contact form functionality
- [ ] **Analytics Dashboard** - Visit tracking
- [ ] **Blog System** - Academic blogging
- [ ] **Calendar Integration** - Event management
- [ ] **Notification System** - Real-time updates

---

<div align="center">

**⭐ Star this repo if you found it helpful!**

Made with ❤️ for the academic community

</div>