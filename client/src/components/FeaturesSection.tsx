const FeaturesSection = () => {
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
      icon: "♻️",
      title: "Incident Categorization",
      description: "Quickly classify reports as emergency or non-emergency.",
      color: "from-teal-500 to-teal-600",
    },
  ];

  return (
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
  );
};

export default FeaturesSection;
