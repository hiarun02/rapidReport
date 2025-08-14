import {useState, useEffect} from "react";

interface SupportService {
  id: string;
  name: string;
  category: string;
  address: string;
  phone: string;
  website?: string;
  hours: string;
  distance: number;
  rating: number;
  description: string;
  services: string[];
  emergency: boolean;
}

const NearbySupport = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-24 mt-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nearby Support Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find emergency services, support organizations, and community
            resources in your area
          </p>
        </div>

        {/* Additional Resources */}
        <div className="mt-12 bg-gray-50 rounded-2xl p-8 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-3">📞</div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Crisis Hotlines
              </h4>
              <p className="text-gray-600 text-sm mb-3">
                24/7 support for mental health crises
              </p>
              <a
                href="tel:988"
                className="text-red-600 hover:text-red-700 font-medium"
              >
                Call 988 (Suicide & Crisis Lifeline)
              </a>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">💬</div>
              <h4 className="font-semibold text-gray-900 mb-2">Text Support</h4>
              <p className="text-gray-600 text-sm mb-3">
                Text-based crisis support
              </p>
              <p className="text-red-600 font-medium">Text HOME to 741741</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🌐</div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Online Resources
              </h4>
              <p className="text-gray-600 text-sm mb-3">
                Find additional support online
              </p>
              <a
                href="#"
                className="text-red-600 hover:text-red-700 font-medium"
              >
                Browse Resources
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NearbySupport;
