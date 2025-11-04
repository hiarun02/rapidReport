import Hero from "../Hero";
import CTASection from "../CTASection";
import FeaturesSection from "../FeaturesSection";
import FAQSection from "../FAQSection";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#FBF9FA]">
      {/* Hero Section */}
      <Hero />
      {/* Features Section */}
      <FeaturesSection />
      {/* How It Works Section */}
      <FAQSection />
      {/* CTA Section */}
      <CTASection />
    </div>
  );
};

export default Home;
