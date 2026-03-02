# RushNet - Full Stack Social Media Platform

![RushNet Logo](https://img.shields.io/badge/RushNet-Social%20Media%20App-purple?style=for-the-badge)

**RushNet** is a comprehensive social media platform built as part of the Full Stack Development 2024B project. It provides a complete social networking experience with user interactions, group management, content sharing, and real-time features.

## 🌟 About

RushNet is designed to connect people through a modern, feature-rich social media platform. It combines traditional social networking features with advanced group management and content sharing capabilities, built with modern web technologies for optimal performance and user experience.

## 🎯 Key Features

### 👥 **User Management**
- **User Registration & Authentication**: Secure account creation with profile customization
- **Profile Management**: Customizable user profiles with avatars and bio information  
- **Friend System**: Send/receive friend requests, manage friend connections
- **User Search**: Find and connect with other users on the platform
- **Multi-role Support**: Users, Group Admins, and Site Administrators

### 📝 **Social Content Features**
- **Post Creation**: Create posts with text descriptions and image attachments
- **Post Reactions**: React to posts with like, love, haha, and angry emotions
- **Comment System**: Comment on posts with threaded discussions
- **Feed Management**: Personalized feeds based on friends and group memberships
- **Content Visibility**: Public, friends-only, and group-specific post visibility

### 🏢 **Group Management**
- **Group Creation**: Create public or private groups with custom descriptions
- **Group Administration**: Manage members, approve join requests, moderate content
- **Group Posts**: Share content specifically within group communities
- **Member Management**: Add/remove members, assign administrative roles
- **Group Discovery**: Search and join public groups

### 🔔 **Real-time Features**
- **Notification System**: Real-time notifications for friend requests, reactions, comments
- **Activity Tracking**: Track user engagement and social interactions
- **Live Updates**: Dynamic content updates without page refresh

### ⚙️ **Administrative Features**
- **Site Administration**: Manage all users, groups, and content across the platform
- **Group Approval**: Review and approve new group creation requests
- **User Management**: Suspend/resume users, manage user roles
- **Content Moderation**: Monitor and manage platform content

## 🛠️ Technology Stack

### **Backend Technologies**
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat-square&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-404D59?style=flat-square) ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat-square&logo=mongodb&logoColor=white) ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat-square) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

- **Runtime**: Node.js with Express.js framework
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Session-based authentication with MongoStore
- **File Upload**: Multer for image handling
- **Security**: Helmet, CORS, bcrypt for password hashing
- **API Architecture**: RESTful API design with middleware

### **Frontend Technologies**
![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=react-router&logoColor=white) ![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=flat-square&logo=bootstrap&logoColor=white) ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white)

- **Framework**: React 18 with Vite for fast development
- **Routing**: React Router DOM for navigation
- **Styling**: React Bootstrap for responsive UI components
- **HTTP Client**: Axios for API communication
- **State Management**: React hooks and context

## 🏗️ System Architecture

### **Core Data Models**
- **User**: Profile management, friends, groups, roles, authentication
- **Post**: Content creation, reactions, comments, visibility settings
- **Group**: Community management, member lists, admin roles, approval system
- **Notification**: Real-time updates, user activity tracking
- **Comment**: Nested commenting system with user references
- **Reaction**: Emoji-based reactions (like, love, haha, angry)

### **API Endpoints**
```
Authentication:     /auth/*
User Management:    /users/*
Content Posts:      /posts/*
Group Management:   /groups/*
Search:             /search
Notifications:      /notifications/*
```

### **Key Features Implementation**
- **Feed Algorithm**: Smart content filtering based on user relationships and privacy settings
- **Role-Based Access**: Middleware for user, group admin, and site admin permissions
- **File Management**: Secure image upload and storage system
- **Real-time Updates**: Session-based authentication with live notification system

## 🚀 Getting Started

### **Prerequisites**
- **Node.js** (v16+ recommended)
- **npm** package manager
- **MongoDB** database (local or cloud)

### **Installation & Setup**

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Cecil-B-Liv/fsDev.git
   cd fsDev
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run devStart
   ```

4. **Environment Configuration**
   Create `.env` file in the backend directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   SESSION_SECRET=your_session_secret
   PORT=3001
   ```

5. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## 📱 User Interface Features

### **Modern React Components**
- **Responsive Design**: Mobile-first approach with Bootstrap components
- **Interactive Feed**: Dynamic post loading with real-time updates
- **Rich Media Support**: Image upload and display capabilities
- **Intuitive Navigation**: Clean routing and user-friendly interface

### **Key User Flows**
- **Social Feed**: Browse posts from friends and groups
- **Profile Pages**: View user profiles, friends, and posts
- **Group Spaces**: Dedicated areas for group discussions and content
- **Admin Dashboard**: Comprehensive management interface for administrators
- **Search & Discovery**: Find users and groups across the platform

## 👨‍💻 Development Team

**RMIT University - Full Stack Development 2024B**
- **Huynh Ngoc Tai** (s3978680) - 5 points
- **Vu Thanh Tung** (s3963172) - 5 points  
- **Kim Nhat Anh** (s3978831) - 5 points
- **Dang Cuu Dang Khoa** (s3979159) - 5 points
- **Tran Quang Minh** (s3988776) - 5 points

## 🔒 Security Features

- **Authentication**: Secure session-based user authentication
- **Password Security**: bcrypt hashing for password storage
- **Input Validation**: Comprehensive validation middleware
- **CORS Protection**: Cross-origin resource sharing configuration
- **File Upload Security**: Secure image upload with validation
- **Role-Based Authorization**: Middleware for different user permission levels

## 📊 Database Design

### **MongoDB Collections**
- **Users**: User profiles, authentication, social connections
- **Posts**: Content posts with reactions, comments, and metadata
- **Groups**: Group information, member lists, administrative data
- **Comments**: Threaded commenting system
- **Notifications**: User activity and interaction alerts

### **Key Relationships**
- User-to-User: Friend connections and social network
- User-to-Group: Membership and administrative roles
- Post-to-User: Content ownership and interaction tracking
- Group-to-Post: Community-specific content organization

## 🧪 API Documentation

### **Authentication Endpoints**
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `GET /auth/check` - Authentication status

### **Social Features**
- `POST /users/friend-request` - Send friend request
- `GET /users/:id/friends` - Get user's friends
- `POST /posts/create` - Create new post
- `PUT /posts/:id/react` - React to post
- `POST /posts/:id/comments/create` - Add comment

### **Group Management**
- `POST /groups/create` - Create new group
- `GET /groups` - Get all approved groups
- `POST /groups/:id/posts/create` - Create group post
- `PATCH /groups/:id/approve` - Approve group (admin)

## 🎨 Frontend Architecture

### **Component Structure**
- **Pages**: Main application pages (Home, Profile, Groups)
- **Components**: Reusable UI components (Posts, Comments, Navigation)
- **API Layer**: Axios-based HTTP client for backend communication
- **Routing**: React Router for navigation and protected routes
- **Styling**: React Bootstrap for consistent UI design

## 📄 License

This project is developed for educational purposes as part of RMIT University's Full Stack Development course.

---

**🌐 RushNet - Connecting people through modern social networking.**
