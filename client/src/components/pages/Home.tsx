import {Link} from "react-router-dom";
import Hero from "../Hero";
import Stats from "../Stats";
import HowItWorksSection from "../HowItWorksSection";

const Home = () => {
  const features = [
    {
      icon: "⚡",
      title: "Instant Reporting",
      description:
        "Submit incident reports in seconds with our streamlined interface",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: "📊",
      title: "Real-time Tracking",
      description:
        "Monitor your report status and receive updates as authorities respond",
      color: "from-green-500 to-green-600",
    },
    {
      icon: "🔒",
      title: "Secure & Anonymous",
      description:
        "Your privacy is protected with optional anonymous reporting",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: "📍",
      title: "Location-based",
      description:
        "Automatically route reports to the appropriate local authorities",
      color: "from-red-500 to-red-600",
    },
    {
      icon: "📱",
      title: "Mobile Optimized",
      description: "Report incidents from anywhere using any device",
      color: "from-orange-500 to-orange-600",
    },
    {
      icon: "🌍",
      title: "Community Impact",
      description: "Join thousands making their communities safer every day",
      color: "from-teal-500 to-teal-600",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Hero />
      {/* Stats Section */}
      <Stats />
      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose RapidReport?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built for modern communities with cutting-edge technology and
              user-centered design
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-gray-200 transform hover:-translate-y-2">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-2xl text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <HowItWorksSection />
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Join thousands of citizens making their communities safer through
            effective incident reporting
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/submit-report"
              className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Submit Your First Report
            </Link>
            <Link
              to="/track-report"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-red-600 transition-all duration-200"
            >
              Track Existing Report
            </Link>
          </div>
        </div>
      </section>

      {/* Emergency Notice */}
      <section className="bg-gray-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-4">
            <div className="text-2xl">🚨</div>
            <p className="text-center">
              <span className="font-bold">Emergency?</span> Call 911
              immediately. This platform is for non-emergency incident
              reporting.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
