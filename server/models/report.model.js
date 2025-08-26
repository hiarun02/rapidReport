import mongoose from "mongoose";

const reportSchema = mongoose.Schema(
  {
    reportId: {
      type: String,
      required: true,
    },
    reportType: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },

    incidentType: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Report = mongoose.model("Report", reportSchema);
