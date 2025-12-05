import {Zap, TrendingUp, Lock, Camera, Smartphone, Grid3x3} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Reporting",
      description:
        "Submit incident reports in seconds with our streamlined interface",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Real-time Tracking",
      description:
        "Monitor your report status and receive updates as authorities respond",
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Secure & Anonymous",
      description:
        "Your privacy is protected with optional anonymous reporting",
    },
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Quick Report Mode",
      description:
        "Upload a photo and our AI will help you fill out the report details fast",
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile Optimized",
      description: "Report incidents from anywhere using any device",
    },
    {
      icon: <Grid3x3 className="w-8 h-8" />,
      title: "Incident Categorization",
      description: "Quickly classify reports as emergency or non-emergency.",
    },
  ];

  return (
    <section className="lg:py-25 py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-15">
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
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-gray-200 ">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-3xl border-red-300 shadow p-3 rounded-lg ">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {feature.title}
                  </h3>
                </div>

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
