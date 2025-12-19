# 🏘️ DreamNest - Premium Real Estate Platform

## 🌐 Live Site URL
[https://dreamnest-realestate.web.app](https://estate-client-ruddy.vercel.app/)

## 📋 Admin Credentials
- **Username:** admin@gmail.com
- **Password:** URMI**

## 🏢 Agent Credentials (For Testing)
- **Username:** agent@gmail.com
- **Password:** URMI**

---

## ✨ Key Features

- **🔐 Secure Multi-Role Authentication System** - Comprehensive authentication with Email/Password and Social Login (Google), featuring role-based access control for Users, Agents, and Admins with JWT token implementation for enhanced security.

- **🏡 Advanced Property Management** - Agents can seamlessly add, update, and manage properties with image uploads, price range specifications, and location details. Admin verification system ensures quality control before properties go live.

- **💼 Intelligent Agent Dashboard** - Agents have access to a complete business management suite including property listings, sold properties tracking, offer management system, and detailed sales analytics with visual charts.

- **🛒 Smart Property Wishlist & Purchase System** - Users can create personalized wishlists, make offers within specified price ranges, and complete secure payments through Stripe integration with real-time status tracking.

- **⭐ Comprehensive Review System** - Users can leave detailed reviews for properties they've interacted with, with full CRUD capabilities and admin moderation to maintain platform quality and authenticity.

- **👨‍💼 Powerful Admin Control Panel** - Admins enjoy complete platform oversight with user role management (User/Agent/Admin), property verification/rejection system, fraud detection and agent flagging, and comprehensive review moderation.

- **🔍 Advanced Search & Filter Capabilities** - Dynamic search functionality by property location, price range sorting (Low to High / High to Low), and multi-criteria filtering for enhanced property discovery experience.

- **📊 Real-Time Sales Analytics** - Visual representation of agent performance with interactive charts displaying sold properties, revenue tracking, and commission calculations using Recharts library.

- **📱 Fully Responsive Design** - Seamlessly optimized interface for mobile, tablet, and desktop devices with responsive dashboard layouts ensuring perfect user experience across all screen sizes.

- **🎯 Smart Property Advertisement System** - Admin-controlled featured property section on homepage showcasing verified premium listings with dynamic updates and engaging carousel presentations using Swiper.js.

---

## 🛠️ Technologies Used

### Frontend
- **React.js** - Modern UI library for building interactive interfaces
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **Tanstack Query (React Query)** - Powerful data fetching and state management
- **React Router DOM** - Client-side routing and navigation
- **React Hook Form** - Efficient form handling and validation
- **Swiper.js** - Modern touch slider for carousels
- **Recharts** - Composable charting library for data visualization
- **Axios** - HTTP client with interceptor implementation
- **SweetAlert2** - Beautiful and responsive popup notifications
- **React Icons** - Popular icon library integration

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast and minimalist web framework
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - Elegant MongoDB object modeling
- **JWT (JSON Web Token)** - Secure authentication tokens
- **dotenv** - Environment variable management

### Payment Integration
- **Stripe** - Secure online payment processing

### Authentication
- **Firebase Authentication** - Email/Password and Google OAuth

### Deployment
- **Vercel** - Frontend & Backend API deployment

---

## 📦 NPM Packages Used

### Client Side
```json
{
  "@tanstack/react-query": "^5.0.0",
  "axios": "^1.6.0",
  "firebase": "^10.7.0",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.0",
  "react-hook-form": "^7.48.0",
  "sweetalert2": "^11.10.0",
  "recharts": "^2.10.0",
  "react-icons": "^4.12.0",
  "tailwindcss": "^3.3.0",
}
```

### Server Side
```json
{
  "express": "^4.18.0",
  "mongodb": "^6.3.0",
  "mongoose": "^8.0.0",
  "jsonwebtoken": "^9.0.2",
  "bcryptjs": "^2.4.3",
  "cors": "^2.8.5",
  "dotenv": "^16.3.0",
  "stripe": "^14.7.0"
}
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account or local MongoDB installation
- Firebase project setup
- Stripe account for payment integration

### Installation

#### Clone the Repository
```bash
git clone https://github.com/yourusername/dreamnest-realestate.git
cd dreamnest-realestate
```

#### Client Setup
```bash
cd client
npm install
```

Create a `.env` file in the client directory:
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

```bash
npm run dev
```

#### Server Setup
```bash
cd server
npm install
```

Create a `.env` file in the server directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
CLIENT_URL=http://localhost:5173
```

```bash
npm start
```

---

## 👥 User Roles & Capabilities

### 🙋 Regular User
- Browse all verified properties
- Add properties to wishlist
- Make offers on properties
- Complete payments via Stripe
- Leave reviews and ratings
- Manage personal profile
- Track purchased properties

### 🏢 Agent
- Add new properties with details
- Update and manage own properties
- View requested offers
- Accept/reject property offers
- Track sold properties
- View sales analytics and charts
- Manage agent profile

### 👨‍💼 Admin
- Verify or reject agent properties
- Manage all users (promote/demote roles)
- Flag fraudulent agents
- Delete users and reviews
- Advertise featured properties
- Access complete platform analytics
- Moderate all content

---

## 🎯 Core Functionalities

### Property Management
- **Add Property**: Agents upload properties with images, descriptions, location, and 
                   price ranges
- **Verification System**: Admin approves or rejects properties before they appear 
                          publicly
- **Update/Delete**: Agents can modify their listings (if not rejected)
- **Status Tracking**: Real-time verification status (Pending, Verified, Rejected)

### Offer & Payment System
- **Make Offer**: Users propose prices within agent-specified ranges
- **Offer Management**: Agents review and respond to offers
- **Automatic Rejection**: When one offer is accepted, others are auto-rejected
- **Stripe Integration**: Secure payment processing for accepted offers
- **Transaction History**: Complete payment records with transaction IDs

### Review System
- **Property Reviews**: Users share experiences and ratings
- **CRUD Operations**: Full create, read, update, delete capabilities
- **Moderation**: Admins can remove inappropriate reviews
- **Display**: Reviews shown on property details pages

### Search & Filter
- **Location Search**: Find properties by city or area
- **Price Sorting**: Arrange by price (ascending/descending)
- **Status Filter**: Filter by verification status
- **Dynamic Results**: Instant search updates
---

## 🔒 Security Features

- **JWT Authentication**: Secure token-based auth system
- **Password Encryption**: Bcrypt hashing for user passwords
- **Protected Routes**: Role-based route protection
- **Axios Interceptors**: Automatic token attachment and refresh
- **Environment Variables**: Sensitive data protection
- **Firebase Security**: Secure authentication flow
- **Input Validation**: React Hook Form validation
---

## 🌟 Bonus Features Implemented

- ✅ **JWT Token Authentication** with localStorage
- ✅ **Axios Interceptors** for automatic token handling
- ✅ **Search Functionality** by location
- ✅ **Price Range Sorting** (Low to High / High to Low)
- ✅ **Sales Analytics Chart** using Recharts
- ✅ **Property Advertisement** section on homepage
- ✅ **Swiper.js Slider** for image carousels
- ✅ **React Hook Form** for all forms
- ✅ **Total Sales Amount** display for agents
- ✅ **Fraud Agent Detection** system

---

## 📸 Screenshots

### Homepage
![Homepage Banner](screenshot-homepage.png)
*Modern and engaging landing page with featured properties*

### Property Details
![Property Details](screenshot-details.png)
*Comprehensive property information with review section*

### Agent Dashboard
![Agent Dashboard](screenshot-agent.png)
*Complete business management interface for agents*

### Admin Panel
![Admin Panel](screenshot-admin.png)
*Powerful admin control center*


## 👨‍💻 Developer

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Portfolio: [yourportfolio.com](https://yourportfolio.com)
---

**⭐ If you like this project, please give it a star on GitHub! ⭐**
