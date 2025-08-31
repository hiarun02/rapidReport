import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const stats = [
  {number: "100+", label: "Reports Submitted", icon: "📝"},
  {number: "98%", label: "Response Rate", icon: "✅"},
  {number: "24/7", label: "Available Support", icon: "🕐"},
  {number: "500+", label: "Partner Agencies", icon: "🤝"},
];

const Hero = () => {
  const [currentStat, setCurrentStat] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [stats.length]);

  return (
    <section className="relative bg-gradient-to-br from-red-500 via-red-600 to-red-700 text-white py-20 lg:py-22 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Report.
              <br />
              <span className="text-red-200">Track.</span>
              <br />
              <span className="text-red-100">Resolve.</span>
            </h1>
            <p className="text-xl md:text-2xl text-red-100 mb-8 leading-relaxed">
              Report emergencies instantly and securely with Rapid Report. Your
              safety comes first with fast response coordination and full
              anonymity when needed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/submit-report"
                className="bg-white text-red-600 px-8 py-3 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-center"
              >
                Submit Report
              </Link>
              <Link
                to="/how-it-works"
                className="border-2 border-white text-white px-8 py-3 rounded-xl font-bold text-lg hover:bg-white hover:text-red-600 transition-all duration-200 text-center"
              >
                How It Works
              </Link>
            </div>
          </div>

          {/* Animated Stats Card */}
          <div className="lg:flex justify-center hidden">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              <div className="text-center">
                <div className="text-6xl mb-4 animate-bounce">
                  {stats[currentStat].icon}
                </div>
                <div className="text-4xl font-bold mb-2">
                  {stats[currentStat].number}
                </div>
                <div className="text-red-100 text-lg">
                  {stats[currentStat].label}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
