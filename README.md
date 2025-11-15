# RapidReport

A modern community safety reporting platform that helps citizens quickly report incidents and track their progress. Built with AI-powered image analysis to make reporting faster and more accurate.

## What is RapidReport?

RapidReport is a web application that makes it easy for people to report incidents in their community. Whether it's a theft, medical emergency, or safety concern, users can quickly submit reports with photos, and our AI will automatically help fill in the details.

## Key Features

🤖 **Smart AI Analysis** - Upload a photo and let AI automatically detect what happened and fill in report details
📱 **Easy Reporting** - Simple forms that work on any device  
🔍 **Track Progress** - Follow your report status with a unique tracking ID
👨‍💼 **Admin Dashboard** - Tools for administrators to manage and respond to reports
📍 **Location Services** - Automatic location detection or manual entry
🆘 **Emergency Support** - Quick access to emergency contacts and local services

## How It Works

1. **Take a Photo** - Snap a picture of the incident or situation
2. **AI Does the Work** - Our AI analyzes the image and suggests report details
3. **Review & Submit** - Check the AI suggestions, make any edits, and submit
4. **Track Progress** - Use your report ID to see status updates

## Technology Stack
   
**Frontend**

- React 19 with TypeScript
- Vite for fast development
- Tailwind CSS for styling
- React Router for navigation

**Backend**

- Node.js and Express.js
- MongoDB database
- Google Gemini AI for image analysis
- Cloudinary for image storage

**Tools**

- Multer for file uploads
- Axios for API requests
- ESLint and TypeScript for code quality

## Project Structure

The project is organized into two main parts:

```
rapidReport/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/        # UI components
│   │   │   ├── pages/         # Page components
│   │   │   ├── admin/         # Admin dashboard
│   │   │   └── ui/            # Reusable UI parts
│   │   ├── api/              # API calls
│   │   └── store/            # State management
│   └── package.json
├── server/                   # Node.js backend
│   ├── Controllers/          # Business logic
│   ├── models/              # Database schemas
│   ├── routes/              # API endpoints
│   └── utils/               # Helper functions
└── README.md
```

## Getting Started

### What You Need

- Node.js (version 18 or newer)
- MongoDB database
- Google Gemini API key
- Cloudinary account for image storage

### Setup Instructions

1. **Clone the project**

```bash
git clone <your-repo-url>
cd rapidReport
```

2. **Setup the server**

```bash
cd server
npm install
```

Create a `.env` file in the server folder:

```
DB_String=your_mongodb_connection
GEMINI_API_KEY=your_google_gemini_key
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_key
CLOUD_SECRET_API=your_cloudinary_secret
```

3. **Setup the client**

```bash
cd ../client
npm install

# Start the development server
npm run dev
```

### 4. Access the Application

- Frontend: http://localhost:5174 (or 5173)
- Backend API: http://localhost:8123

## How to Use

### For Regular Users

1. Go to "Submit Report"
2. Upload a photo of the incident
3. Let AI fill in the details automatically
4. Review and edit if needed
5. Submit and get a tracking ID

### For Administrators

1. Log in to the admin dashboard
2. View all submitted reports
3. Update report statuses
4. Monitor system analytics

## API Endpoints

**Base URL:** http://localhost:8123

**Key Endpoints:**

- `POST /api/submit-report` - Submit new report
- `GET /api/track-report/:reportId` - Track report status
- `POST /api/analyze-image` - AI image analysis
- `GET /api/admin/reports` - Admin: view all reports
- `POST /auth/login` - Admin login

## Contributing

We welcome contributions! Here's how to help:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the MIT License.

---

**Note:** This app is designed to help communities report incidents more efficiently. In real emergencies, always call 911 first.
