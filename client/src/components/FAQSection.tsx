const FAQSection = () => {
  return (
    <div className="bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              How long does it take for authorities to respond?
            </h3>
            <p className="text-gray-600">
              Response times vary based on incident severity and type. Emergency
              reports are processed immediately, while non-urgent matters
              typically receive attention within 24-48 hours.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Can I submit reports anonymously?
            </h3>
            <p className="text-gray-600">
              Yes, you can choose to submit reports anonymously. However,
              providing contact information helps authorities follow up if they
              need additional details.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              What types of incidents can I report?
            </h3>
            <p className="text-gray-600">
              You can report various incidents including traffic violations,
              public safety concerns, environmental issues, infrastructure
              problems, and more.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
