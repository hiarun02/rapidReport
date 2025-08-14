import {useState} from "react";
import {Link} from "react-router-dom";

interface ReportStatus {
  id: string;
  title: string;
  type: string;
  location: string;
  submittedDate: string;
  lastUpdated: string;
  status: "submitted" | "under-review" | "in-progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  assignedTo: string;
  description: string;
  updates: {
    date: string;
    message: string;
    author: string;
  }[];
}

const TrackReport = () => {
  const [reportId, setReportId] = useState("");
  const [searchResult, setSearchResult] = useState<ReportStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "bg-blue-100 text-blue-800";
      case "under-review":
        return "bg-yellow-100 text-yellow-800";
      case "in-progress":
        return "bg-orange-100 text-orange-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "urgent":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportId.trim()) {
      setError("Please enter a report ID");
      return;
    }

    setIsLoading(true);
    setError("");

    // Simulate API call
    setTimeout(() => {
      const report = mockReports[reportId.toUpperCase()];
      if (report) {
        setSearchResult(report);
        setError("");
      } else {
        setSearchResult(null);
        setError(
          "Report not found. Please check your report ID and try again."
        );
      }
      setIsLoading(false);
    }, 1000);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-fit bg-gradient-to-br from-gray-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Track Your Report
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Enter your report ID to check the current status and get updates on
            your submission
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
          <form onSubmit={handleSearch} className="space-y-6">
            <div>
              <label
                htmlFor="reportId"
                className="block text-lg font-semibold text-gray-900 mb-3"
              >
                Report ID
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="reportId"
                  value={reportId}
                  onChange={(e) => setReportId(e.target.value)}
                  placeholder="Enter your report ID (e.g., RPT-2024-001)"
                  className="w-full px-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-4 px-8 rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Searching...</span>
                </div>
              ) : (
                "Track Report"
              )}
            </button>
          </form>

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          )}
        </div>

        {/* Search Result */}
        {searchResult && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Report Header */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    {searchResult.title}
                  </h2>
                  <p className="text-red-100">Report ID: {searchResult.id}</p>
                </div>
                <div className="flex flex-col space-y-2">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                      searchResult.status
                    )} bg-white`}
                  >
                    {searchResult.status.replace("-", " ").toUpperCase()}
                  </span>
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${getPriorityColor(
                      searchResult.priority
                    )} bg-white`}
                  >
                    {searchResult.priority.toUpperCase()} PRIORITY
                  </span>
                </div>
              </div>
            </div>

            {/* Report Details */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                      Type
                    </h3>
                    <p className="text-lg text-gray-900">{searchResult.type}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                      Location
                    </h3>
                    <p className="text-lg text-gray-900">
                      {searchResult.location}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                      Assigned To
                    </h3>
                    <p className="text-lg text-gray-900">
                      {searchResult.assignedTo}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                      Submitted
                    </h3>
                    <p className="text-lg text-gray-900">
                      {formatDate(searchResult.submittedDate)}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                      Last Updated
                    </h3>
                    <p className="text-lg text-gray-900">
                      {formatDate(searchResult.lastUpdated)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                  Description
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {searchResult.description}
                </p>
              </div>

              {/* Status Timeline */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Status Updates
                </h3>
                <div className="space-y-4">
                  {searchResult.updates.map((update, index) => (
                    <div key={index} className="flex space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-3 h-3 bg-red-500 rounded-full mt-2"></div>
                        {index < searchResult.updates.length - 1 && (
                          <div className="w-0.5 h-16 bg-gray-200 ml-1 mt-2"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-8">
                        <div className="bg-gray-50 rounded-xl p-4">
                          <div className="flex justify-between items-start mb-2">
                            <p className="text-gray-900 font-medium">
                              {update.message}
                            </p>
                            <span className="text-sm text-gray-500 ml-4">
                              {formatDate(update.date)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">
                            by {update.author}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackReport;
