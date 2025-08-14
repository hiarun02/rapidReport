const HowItWorksSection = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Simple. Fast. Effective.
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get your reports to the right authorities in just a few clicks
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            {
              step: "01",
              title: "Report",
              desc: "Submit your incident with details and location",
              icon: "📝",
            },
            {
              step: "02",
              title: "Process",
              desc: "Our system routes to appropriate authorities",
              icon: "⚡",
            },
            {
              step: "03",
              title: "Track",
              desc: "Monitor progress with real-time updates",
              icon: "📊",
            },
            {
              step: "04",
              title: "Resolve",
              desc: "Get confirmation when issue is addressed",
              icon: "✅",
            },
          ].map((item, index) => (
            <div key={index} className="text-center relative">
              {index < 3 && (
                <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-red-200 to-red-300 z-0"></div>
              )}
              <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-red-500 to-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
                  {item.step}
                </div>
                <div className="text-4xl mb-4 mt-4 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
