# 🏠 PropertyHub - Real Estate Platform
![ Screenshot](https://i.postimg.cc/Pq1GzgGd/hobby-hub.png)

A comprehensive real estate platform built with the MERN stack, enabling users to discover, wishlist, and purchase properties while providing agents and administrators with powerful management tools.

## 🌐 Live Site
**Live URL:** (https://estate-client-ruddy.vercel.app/)

## 👨‍💼 Admin Credentials
- **Username:** admin@gmail.com
- **Password:** URMI**
- 
## 👨‍💼 Agent Credentials
- **Username:** agent@gmail.com
- **Password:** URMI**

## 📋 Project Overview

PropertyHub is a modern real estate platform that connects property buyers with real estate agents. The platform features a three-tier user system (User, Agent, Admin) with comprehensive property management, wishlist functionality, secure payment processing, and advanced search capabilities.

## 🚀 Key Features

• **Multi-Role Authentication System** - Secure login/registration with email/password and social authentication for Users, Agents, and Admins
• **Advanced Property Search & Filter** - Location-based search with price range sorting functionality for easy property discovery
• **Wishlist Management** - Users can save favorite properties and make offers directly from their wishlist
• **Secure Payment Integration** - Stripe payment gateway integration for seamless property transactions
• **Property Verification System** - Admin-controlled property verification process ensuring quality listings
• **Real-time Notifications** - Toast notifications for all CRUD operations and authentication processes
• **Agent Property Management** - Comprehensive dashboard for agents to add, update, and track their property listings
• **Review & Rating System** - Property-specific reviews with user feedback and admin moderation capabilities
• **Fraud Detection & Management** - Admin tools to mark fraudulent agents and maintain platform integrity
• **Responsive Design** - Fully responsive interface optimized for mobile, tablet, and desktop devices
• **Property Advertisement System** - Admin-controlled property promotion feature for homepage visibility

## 💻 Technologies Used

### Frontend
- **React.js** - Component-based UI library
- **Tailwind CSS** - Utility-first CSS framework
- **TanStack Query** - Data fetching and state management
- **React Router DOM** - Client-side routing
- **React Hook Form** - Form validation and management
- **Firebase Authentication** - User authentication service

### Backend
- **Node.js** - Server-side JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token for authentication
- **Stripe** - Payment processing integration

### Additional Tools
- **Axios** - HTTP client for API requests
- **React Hot Toast** - Notification system
- **Image Upload** - Local and cloud image storage
- **Environment Variables** - Secure configuration management

- ### Client Dependencies
```json
{
  "react": "^18.2.0",
  "@tanstack/react-query": "^4.29.0",
  "react-router-dom": "^6.8.0",
  "react-hook-form": "^7.43.0",
  "@stripe/stripe-js": "^1.52.0",
  "recharts": "^2.5.0",
  "react-hot-toast": "^2.4.0",
  "tailwindcss": "^3.2.0",
  "axios": "^1.3.0"
}
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB database
- Firebase project setup
- Stripe account for payments

### Client Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/propertyhub-client.git
cd propertyhub-client

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Add your environment variables
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_STRIPE_PUBLISHABLE_KEY=your_stripe_key

# Start development server
npm start
```


## 📱 User Roles & Permissions

### 👤 Regular User
- Browse and search properties
- Add properties to wishlist
- Make offers on properties
- Write and manage property reviews
- Secure payment processing
- Track property purchases

### 🏢 Agent
- Add new property listings
- Manage property portfolio
- Accept/reject user offers
- Track sold properties
- Update property information
- View sales analytics

### 👨‍💼 Admin
- Verify/reject property listings
- Manage all platform users
- Moderate property reviews
- Control property advertisements
- Mark fraudulent agents
- Platform analytics and reporting

## 🔐 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Firebase Integration** - Reliable authentication service
- **Protected Routes** - Route-level access control
- **Environment Variables** - Secure configuration management
- **Input Validation** - Comprehensive form validation
- **Payment Security** - Stripe-powered secure transactions

## 👨‍💻 Developer

**Your Name**
-   sumaiya Afroza
- Email: sumaiya.afroza.99@gmail.com

---

⭐ **Star this repository if you found it helpful!**
