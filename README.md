# 🚨 Community Safety Report System

A comprehensive web application for community safety reporting, incident tracking, and emergency support services. This platform enables citizens to report incidents, track their status, and access nearby support services while providing administrators with powerful tools to manage and respond to reports.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### 🔥 Core Features

- **📝 Incident Reporting**: Submit detailed reports with images, location, and incident categorization
- **📍 Location Services**: Automatic location detection with multiple fallback methods
- **🔍 Report Tracking**: Track report status with unique report IDs
- **👨‍💼 Admin Dashboard**: Comprehensive admin panel for report management
- **🆘 Emergency Support**: Quick access to emergency services and support resources
- **📱 Responsive Design**: Fully responsive across all devices

### 🎯 Advanced Features

- **🏷️ Smart Categorization**: Emergency vs Non-Emergency report classification
- **🔄 Real-time Updates**: Live status updates and notifications
- **📊 Analytics Dashboard**: Report statistics and insights
- **🔍 Advanced Filtering**: Search and filter reports by multiple criteria
- **🗺️ Maps Integration**: Google Maps integration for directions and locations
- **📞 Direct Communication**: One-click calling and messaging to support services

### 🛡️ Safety Features

- **🚨 Emergency Quick Actions**: Instant access to 911, Crisis Lifeline (988), and Crisis Text Line
- **🏥 Support Services Directory**: Comprehensive database of local support services
- **🔒 Secure Data Handling**: Encrypted data transmission and secure storage
- **📋 Crisis Resources**: Mental health resources and safety tips

## 🛠️ Tech Stack

### Frontend

- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **Sonner** - Toast notifications
- **Radix UI** - Accessible UI components
- **Lucide React** - Beautiful icons

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Cloudinary** - Image upload and management
- **Multer** - File upload middleware
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

### Development Tools

- **ESLint** - Code linting
- **TypeScript** - Static type checking
- **Nodemon** - Development server auto-restart

## 📁 Project Structure

```
community-safety-report/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── admin/      # Admin dashboard components
│   │   │   ├── pages/      # Page components
│   │   │   └── ui/         # Base UI components
│   │   ├── api/           # API service functions
│   │   └── assets/        # Static assets
│   ├── public/            # Public assets
│   └── package.json       # Frontend dependencies
├── server/                # Backend Node.js application
│   ├── Controllers/       # Route controllers
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── Middlewares/      # Custom middleware
│   ├── utils/            # Utility functions
│   └── package.json      # Backend dependencies
└── README.md             # Project documentation
```

## 🚀 Installation

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/community-safety-report.git
cd community-safety-report
```

### 2. Backend Setup

```bash
cd server
npm install

# Create .env file
cp .env.example .env
# Edit .env with your configuration:
# MONGODB_URI=your_mongodb_connection_string
# CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
# CLOUDINARY_API_KEY=your_cloudinary_api_key
# CLOUDINARY_API_SECRET=your_cloudinary_api_secret
# SESSION_SECRET=your_session_secret

# Start the server
npm run dev
```

### 3. Frontend Setup

```bash
cd ../client
npm install

# Create .env file (if needed)
# VITE_API_URL=http://localhost:5000

# Start the development server
npm run dev
```

### 4. Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 💻 Usage

### For Citizens

1. **Submit a Report**

   - Navigate to "Submit Report"
   - Choose Emergency or Non-Emergency
   - Fill in incident details
   - Upload supporting images (optional)
   - Use location detection or enter manually
   - Submit and receive a tracking ID

2. **Track Reports**

   - Use your unique report ID to track status
   - Receive updates on report progress

3. **Access Support Services**
   - Visit "Nearby Support" for emergency contacts
   - Find local support services by category
   - Get directions and contact information

### For Administrators

1. **Dashboard Access**

   - Login to admin dashboard
   - View comprehensive report statistics
   - Monitor system performance

2. **Report Management**

   - View all submitted reports
   - Filter by status, type, and priority
   - Update report status and priority
   - View detailed report information

3. **Analytics**
   - Track report trends and patterns
   - Monitor response times
   - Generate insights for improvement

## 📡 API Documentation

### Base URL

```
http://localhost:5000/api
```

### Endpoints

#### Reports

- `POST /reports` - Submit a new report
- `GET /reports` - Get all reports (admin)
- `GET /reports/:id` - Get specific report
- `PUT /reports/:id/status` - Update report status

#### Authentication

- `POST /auth/login` - Admin login
- `POST /auth/logout` - Admin logout
- `GET /auth/verify` - Verify authentication

### Request/Response Examples

#### Submit Report

```javascript
POST /api/reports
Content-Type: multipart/form-data

{
  "reportType": "emergency",
  "incidentType": "theft",
  "title": "Bike stolen from campus",
  "description": "My bike was stolen from the bike rack...",
  "location": "123 University Ave, City, State",
  "image": [file]
}
```

#### Response

```javascript
{
  "success": true,
  "message": "Report submitted successfully",
  "reportId": "RPT-12345678-ABC123",
  "data": {
    "_id": "...",
    "reportId": "RPT-12345678-ABC123",
    "status": "pending",
    "priority": "medium",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

## 📸 Screenshots

### Home Page

![Home Page](screenshots/home.png)

### Report Submission

![Report Form](screenshots/submit-report.png)

### Admin Dashboard

![Admin Dashboard](screenshots/admin-dashboard.png)

### Support Services

![Support Services](screenshots/nearby-support.png)

## 🔧 Configuration

### Environment Variables

#### Backend (.env)

```env
# Database
MONGODB_URI=mongodb://localhost:27017/safety-reports

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Session
SESSION_SECRET=your_super_secret_key

# Server
PORT=5000
NODE_ENV=development
```

#### Frontend (.env)

```env
# API Configuration
VITE_API_URL=http://localhost:5000
```

## 🚀 Deployment

### Frontend (Vercel)

```bash
cd client
npm run build
# Deploy to Vercel or your preferred platform
```

### Backend (Railway/Heroku)

```bash
cd server
# Set environment variables in your hosting platform
# Deploy using your preferred method
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure responsive design compatibility

## 🐛 Known Issues

- Location detection may not work on HTTP (requires HTTPS in production)
- Image uploads limited to 10MB per file
- Some older browsers may have compatibility issues

## 🔮 Future Enhancements

- [ ] Real-time notifications with WebSocket
- [ ] Mobile app development (React Native)
- [ ] Advanced analytics and reporting
- [ ] Multi-language support
- [ ] Integration with local emergency services
- [ ] AI-powered incident categorization
- [ ] Offline support with PWA features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- 📧 Email: support@safetysystem.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/community-safety-report/issues)
- 📖 Documentation: [Wiki](https://github.com/yourusername/community-safety-report/wiki)

## 🙏 Acknowledgments

- Emergency services and first responders
- Community safety organizations
- Open source contributors
- Beta testers and early adopters

---

**⚠️ Important**: This system is designed to complement, not replace, traditional emergency services. In life-threatening emergencies, always call 911 immediately.

**Built with ❤️ for community safety**
