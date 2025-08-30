import {useState, useRef, useCallback, useEffect} from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {Label} from "./ui/label";
import {Input} from "./ui/input";
import {Button} from "./ui/button";
import {submitForm} from "@/api/api";
import {toast} from "sonner";
import {AxiosError} from "axios";

const SubmitForm = () => {
  // Form data interface
  interface FormData {
    reportId: string;
    reportType: "emergency" | "non-emergency" | "";
    imageFile: File | null;
    imagePreview: string | null;
    incidentType: string;
    title: string;
    description: string;
    location: string;
  }

  // Generate a unique report ID
  const generateReportID = useCallback(() => {
    const timestamp = Date.now().toString();
    const randomPart = Math.random().toString(36).substring(2, 15);
    const reportPrefix = "RPT";
    return `${reportPrefix}-${timestamp.slice(-8)}-${randomPart.toUpperCase()}`;
  }, []);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedReportId, setSubmittedReportId] = useState("");
  const [formData, setFormData] = useState<FormData>({
    reportId: "",
    reportType: "",
    imageFile: null,
    imagePreview: null,
    incidentType: "",
    title: "",
    description: "",
    location: "",
  });

  // Generate report ID when component mounts
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      reportId: generateReportID(),
    }));
  }, [generateReportID]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          imageFile: file,
          imagePreview: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
      imageFile: null,
      imagePreview: null,
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Report ID copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy to clipboard");
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setSubmittedReportId("");
    setFormData({
      reportId: generateReportID(),
      reportType: "",
      imageFile: null,
      imagePreview: null,
      incidentType: "",
      title: "",
      description: "",
      location: "",
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
    try {
      const response = await submitForm(formData);
      toast.success(response.data.message);
      setSubmittedReportId(response.data.reportId);
      setIsSubmitted(true);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Something went wrong!");
      } else {
        toast.error("An unexpected error occurred!");
      }
      console.error(error);
    }
  };

  // Show success message if form is submitted
  if (isSubmitted) {
    return (
      <div className="mx-auto max-w-3xl px-5 border border-gray-200 shadow-sm rounded-lg bg-white my-10">
        <div className="py-10 text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Report Submitted Successfully!
          </h2>
          <p className="text-gray-600 mb-6">
            Your report has been received and is being processed.
          </p>

          {/* Report ID Display */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
            <Label className="block text-sm font-medium text-gray-700 mb-2">
              Your Report ID
            </Label>
            <div className="flex items-center gap-2">
              <Input
                value={submittedReportId}
                readOnly
                className="flex-1 bg-white border-gray-300"
              />
              <Button
                type="button"
                onClick={() => copyToClipboard(submittedReportId)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Copy
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Save this ID to track your report status
            </p>
          </div>

          {/* Submit Another Report Button */}
          <Button
            type="button"
            onClick={resetForm}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2"
          >
            Submit Another Report
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-5 border border-gray-200 shadow-sm rounded-lg bg-white my-10">
      <form className="" onSubmit={handleSubmit}>
        {/* report type */}
        <div className="flex justify-between items-center py-5 gap-4 flex-col sm:flex-row">
          {/* Emergency Box */}
          <button
            type="button"
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                reportType: "emergency",
              }))
            }
            className={`border rounded-lg p-5 flex flex-col items-center gap-2 transition-all w-full max-w-xs focus:outline-none
            ${
              formData.reportType === "emergency"
                ? "border-red-500 ring-2 ring-red-200 bg-red-50"
                : "border-gray-200 bg-white hover:border-red-400"
            }`}
            aria-pressed={formData.reportType === "emergency"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-triangle-alert text-red-500 w-8 h-8"
            >
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
              <path d="M12 9v4"></path>
              <path d="M12 17h.01"></path>
            </svg>
            <div className="flex flex-col items-center">
              <span className="font-semibold">Emergency</span>
              <p className="text-gray-500 text-sm">
                Immediate Response Required
              </p>
            </div>
          </button>
          {/* Non-Emergency Box */}
          <button
            type="button"
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                reportType: "non-emergency",
              }))
            }
            className={`border rounded-lg p-5 flex flex-col items-center gap-2 transition-all w-full max-w-xs focus:outline-none
            ${
              formData.reportType === "non-emergency"
                ? "border-orange-500 ring-2 ring-orange-200 bg-orange-50"
                : "border-gray-200 bg-white hover:border-orange-400"
            }`}
            aria-pressed={formData.reportType === "non-emergency"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-info text-orange-500 w-8 h-8"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 16v-4"></path>
              <path d="M12 8h.01"></path>
            </svg>
            <div className="flex flex-col items-center">
              <span className="font-semibold">Non Emergency</span>
              <p className="text-gray-500 text-sm">General Inquiry</p>
            </div>
          </button>
        </div>
        {/* image upload */}
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            id="image-upload"
            className="hidden"
            ref={fileInputRef}
          />
          <label
            htmlFor="image-upload"
            className={`border-2 px-8 py-8 w-full block rounded-lg border-dashed hover:border-red-400/50 hover:bg-red-400/10 cursor-pointer
            ${
              formData.imagePreview
                ? "border-red-400/50 bg-sky-400/10"
                : "border-gray-300"
            }`}
          >
            {!formData.imagePreview ? (
              <div className="flex flex-col justify-center items-center space-y-4">
                <svg
                  className="w-11 h-11 text-zinc-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-sm text-zinc-400">
                  Drop an image here or click to upload
                </span>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center relative">
                <div
                  className="absolute top-4 right-4 bg-zinc-600 p-1 rounded-full hover:bg-zinc-700 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage();
                  }}
                >
                  <svg
                    className="text-white w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <img
                  src={formData.imagePreview}
                  alt="Uploaded preview"
                  className="rounded-xl max-h-60 object-contain border border-gray-200"
                />
              </div>
            )}
          </label>
        </div>
        {/* Report Category Selector */}
        <div className="my-5">
          <Label htmlFor="incident-type" className="block mb-3">
            Incident Type
          </Label>
          <Select
            value={formData.incidentType}
            onValueChange={(value) =>
              setFormData((prev) => ({...prev, incidentType: value}))
            }
          >
            <SelectTrigger className="border border-gray-300 rounded-md p-2 w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent className="border border-red-200 shadow-sm bg-white">
              <SelectItem value="theft">Theft</SelectItem>
              <SelectItem value="vandalism">Vandalism</SelectItem>
              <SelectItem value="assault">Assault</SelectItem>
              <SelectItem value="safety-hazard">Safety Hazard</SelectItem>
              <SelectItem value="infrastructure">Infrastructure</SelectItem>
              <SelectItem value="environmental">Environmental</SelectItem>
              <SelectItem value="property">Property</SelectItem>
              <SelectItem value="traffic">Traffic</SelectItem>
              <SelectItem value="noise">Noise</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* location section */}
        <div className="mb-5">
          <Label htmlFor="location" className="block mb-2">
            Location
          </Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                location: e.target.value,
              }))
            }
            placeholder="Enter the location"
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        {/* Report Title */}
        <div className="mb-5">
          <Label htmlFor="title" className="block mb-2">
            Report Title
          </Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
            placeholder="Enter a brief title for your report"
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        {/* Report Description */}
        <div className="mb-5">
          <Label htmlFor="description" className="block mb-2">
            Report Description
          </Label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            rows={4}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Provide a detailed description of the incident"
          />
        </div>
        {/* Report Submission */}
        <div className="mb-5">
          <Button
            type="submit"
            className="w-full bg-red-500 text-white hover:bg-red-600"
          >
            Submit Report
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SubmitForm;
