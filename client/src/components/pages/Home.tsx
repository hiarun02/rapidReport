import Hero from "../Hero";
// import Stats from "../Stats";
import HowItWorksSection from "../HowItWorksSection";
import CTASection from "../CTASection";
import FeaturesSection from "../FeaturesSection";
import FAQSection from "../FAQSection";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#FBF9FA]">
      {/* Hero Section */}
      <Hero />
      {/* Stats Section */}
      {/* <Stats /> */}
      {/* Features Section */}
      <FeaturesSection />
      {/* How It Works Section */}
      <HowItWorksSection />
      {/* FAQ Section  */}
      <FAQSection />
      {/* CTA Section */}
      <CTASection />
    </div>
  );
};

export default Home;
