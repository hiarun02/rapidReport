import {Link} from "react-router-dom";

const NotFound = () => {
  const quickActions = [
    {
      title: "Submit a Report",
      description: "Report an incident in your area",
      path: "/submit-report",
      icon: "📝",
      color: "bg-red-500 hover:bg-red-600",
    },
    {
      title: "Track Report",
      description: "Check the status of your report",
      path: "/track-report",
      icon: "📊",
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      title: "How It Works",
      description: "Learn about our process",
      path: "/how-it-works",
      icon: "❓",
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      title: "Find Support",
      description: "Locate nearby support services",
      path: "/near-by-support",
      icon: "📍",
      color: "bg-purple-500 hover:bg-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* 404 Visual */}
        <div className="mb-8">
          <div className="relative">
            {/* Large 404 Text */}
            <h1 className="text-9xl md:text-[12rem] font-bold text-gray-200 select-none">
              404
            </h1>

            {/* Floating Elements */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl animate-bounce">🔍</div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-10 left-10 w-4 h-4 bg-red-400 rounded-full animate-pulse"></div>
            <div className="absolute top-20 right-16 w-3 h-3 bg-blue-400 rounded-full animate-pulse delay-300"></div>
            <div className="absolute bottom-16 left-20 w-2 h-2 bg-green-400 rounded-full animate-pulse delay-700"></div>
            <div className="absolute bottom-10 right-10 w-5 h-5 bg-purple-400 rounded-full animate-pulse delay-500"></div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-xl text-gray-600 mb-2">
            The page you're looking for seems to have gone missing.
          </p>
          <p className="text-lg text-gray-500">
            Don't worry, we'll help you get back on track!
          </p>
        </div>

        {/* Quick Actions Grid */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8">
            What would you like to do?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.path}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200 transform hover:-translate-y-1"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {action.icon}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {action.title}
                </h4>
                <p className="text-gray-600 text-sm">{action.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Link
            to="/"
            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center space-x-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span>Go Home</span>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 flex items-center space-x-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span>Go Back</span>
          </button>
        </div>

        {/* Help Text */}
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900 mb-2">
            Still need help?
          </h4>
          <p className="text-gray-600 mb-4">
            If you believe this is an error or need assistance, please contact
            our support team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@rapidreport.com"
              className="text-red-600 hover:text-red-700 font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span>Email Support</span>
            </a>
            <a
              href="tel:+1-800-REPORT"
              className="text-red-600 hover:text-red-700 font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span>Call Support</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
