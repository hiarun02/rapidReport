const stats = [
  {number: "50,000+", label: "Reports Submitted", icon: "📝"},
  {number: "98%", label: "Response Rate", icon: "✅"},
  {number: "24/7", label: "Available Support", icon: "🕐"},
  {number: "500+", label: "Partner Agencies", icon: "🤝"},
];
const Stats = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-4">{stat.icon}</div>
              <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
