import {useState} from "react";
import {Button} from "../ui/button";
import {Input} from "../ui/input";
import {Label} from "../ui/label";

const TrackReport = () => {
  const [reportId, setReportId] = useState("");

  return (
    <div className="min-h-fit bg-gradient-to-br from-gray-50 to-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 lg:py-16">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Track Your Report
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Enter your report ID to check the current status and get updates on
            your submission
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8 border border-gray-100">
          <form className="space-y-6">
            <div>
              <Label
                htmlFor="reportId"
                className="block font-semibold text-gray-900 mb-3"
              >
                Report ID
              </Label>
              <div className="relative">
                <Input
                  type="text"
                  id="reportId"
                  value={reportId}
                  onChange={(e) => setReportId(e.target.value)}
                  placeholder="Enter your report ID"
                  className="w-full px-4 py-2 text-lg border-1 border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-8 rounded-xl font-semibold hover:from-red-600 hover:to-red-700"
            >
              Track Report
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TrackReport;
