# 🏠 EstatePro — Real Estate Backend API

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)
![Railway](https://img.shields.io/badge/Railway-0B0D0E?style=for-the-badge&logo=railway&logoColor=white)

> A powerful REST API for a full-stack real estate web application built with Node.js, Express, and MongoDB.

## 🌐 Live API

```
https://full-stack-realestate-web-application-production.up.railway.app
```

---

## ✨ Features

- 🔐 **JWT Authentication** — Secure login & registration
- 👤 **Role Based Access** — Admin & User roles
- 🏠 **Property CRUD** — Create, Read, Update, Delete
- 🖼️ **Image Upload** — Cloudinary integration
- 🔍 **Search & Filters** — City, type, price range
- 📧 **Email Service** — Resend integration
- ❤️ **Wishlist** — Save favorite properties
- 📊 **Admin Dashboard** — Stats & user management
- 🔒 **Security** — bcrypt, JWT, CORS

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| Node.js | Runtime |
| Express.js | Web Framework |
| MongoDB Atlas | Database |
| Mongoose | ODM |
| JWT | Authentication |
| bcryptjs | Password Hashing |
| Cloudinary | Image Storage |
| Multer | File Upload |
| Resend | Email Service |
| Joi | Validation |

---

## 📁 Project Structure

```
realestate-backend/
├── config/
│   ├── db.js              # MongoDB connection
│   └── cloudinary.js      # Cloudinary + Multer config
├── controllers/
│   ├── authController.js
│   ├── propertyController.js
│   ├── adminController.js
│   └── contactController.js
├── middleware/
│   ├── authMiddleware.js   # JWT verification
│   └── adminMiddleware.js  # Admin check
├── models/
│   ├── User.js
│   └── Property.js
├── routes/
│   ├── authRoutes.js
│   ├── propertyRoutes.js
│   ├── adminRoutes.js
│   └── contactRoutes.js
├── .env
└── server.js
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Cloudinary account
- Resend account

### Installation

```bash
# Clone the repo
git clone https://github.com/anassyed19c1-collab/realestate-backend.git

# Go to project directory
cd realestate-backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev
```

### Environment Variables

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
RESEND_API_KEY=your_resend_api_key
```

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description | Access |
|--------|---------|-------------|--------|
| POST | `/api/auth/register` | Register user | Public |
| POST | `/api/auth/login` | Login user | Public |
| GET | `/api/auth/profile` | Get profile | Private |
| PUT | `/api/auth/profile` | Update profile | Private |

### Properties
| Method | Endpoint | Description | Access |
|--------|---------|-------------|--------|
| GET | `/api/properties` | Get all properties | Public |
| GET | `/api/properties/:id` | Get single property | Public |
| POST | `/api/properties` | Create property | Private |
| PUT | `/api/properties/:id` | Update property | Private |
| DELETE | `/api/properties/:id` | Delete property | Private |
| PUT | `/api/properties/:id/wishlist` | Toggle wishlist | Private |

### Admin
| Method | Endpoint | Description | Access |
|--------|---------|-------------|--------|
| GET | `/api/admin/users` | Get all users | Admin |
| DELETE | `/api/admin/users/:id` | Delete user | Admin |
| PUT | `/api/admin/users/:id/ban` | Ban/Unban user | Admin |
| GET | `/api/admin/stats` | Dashboard stats | Admin |

### Contact
| Method | Endpoint | Description | Access |
|--------|---------|-------------|--------|
| POST | `/api/contact` | Send email | Public |

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@Anas](https://github.com/anassyed19c1-collab)

---

## 📄 License

This project is licensed under the MIT License.