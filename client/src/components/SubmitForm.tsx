import {useState, useRef} from "react";
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

const SubmitForm = () => {
  // Initialize form data state

  const [formData, setFormData] = useState({
    reportType: String(null),
    imageFile: null,
    incidentType: null,
    title: "",
    description: "",
    location: "",
  });

  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission
  };

  return (
    <div className="mx-auto max-w-3xl px-5 border border-gray-200 shadow-sm rounded-lg bg-white my-10">
      <form className="" onSubmit={handleSubmit}>
        {/* report type */}
        <div className="flex justify-between items-center py-5 gap-4 flex-col sm:flex-row">
          {/* Emergency Box */}
          <button
            type="button"
            onClick={() => setFormData({...formData, reportType: "emergency"})}
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
              setFormData({...formData, reportType: "non-emergency"})
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
            ${image ? "border-red-400/50 bg-sky-400/10" : "border-gray-300"}`}
          >
            {!image ? (
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
                  src={image}
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
          <Select>
            <SelectTrigger className="border border-gray-300 rounded-md p-2 w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent className="border border-red-200 shadow-sm bg-white">
              <SelectItem value="theft">Theft</SelectItem>
              <SelectItem value="vandalism">Vandalism</SelectItem>
              <SelectItem value="assault">Assault</SelectItem>
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
            rows={4}
            className="w-full border border-gray-300  rounded-md p-2 "
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
