import resend from "../utils/resend.js";

// Send email when a report is submitted
export const sendReportSubmittedEmail = async (report) => {
  if (!report.reporterEmail) return;

  await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to: report.reporterEmail,
    subject: `RapidReport: Report submitted (ID ${report.reportId})`,
    html: `
      <h3>Your report has been submitted</h3>
      <p><strong>Report ID:</strong> ${report.reportId}</p>
      <p>
        Track your report:
        <a href="${process.env.APP_URL}/track-report">
          View Report
        </a>
      </p>
    `,
  });
};

// Send email when a report status is updated
export const sendReportUpdateEmail = async (report) => {
  if (!report.reporterEmail) return;

  await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to: report.reporterEmail,
    subject: `RapidReport Update: ${report.status} (ID ${report.reportId})`,
    html: `
      <h3>Report Status Updated</h3>
      <p><strong>Status:</strong> ${report.status}</p>
      <p>
        Track progress:
        <a href="${process.env.APP_URL}/track-report">
          View Report
        </a>
      </p>
    `,
  });
};
