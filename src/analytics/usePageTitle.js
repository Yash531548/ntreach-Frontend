import { useEffect } from "react";
import { useLocation } from "react-router";

const titleMap = {
  "/": "Home - Netreach",
  "/about": "About Us - Netreach",
  "/contact-us": "Contact Us - Netreach",
  "/team": "Our Team - Netreach",
  "/faqs": "FAQs - Netreach",
  "/risk": "Risk Assessment - Netreach",
  "/blog": "Blog - Netreach",
  "/login": "Login - Netreach",
  "/loginwithnumber": "Login - Netreach",
  "/dashboard": "Dashboard - Netreach",
  "/questionnaire": "Questionnaire - Netreach",
  "/prepconsultation": "PrEP Consultation - Netreach",
  "/bookappointment": "Book Appointment - Netreach",
  "/schedulesppointment": "Schedule Appointment - Netreach",
  "/assessmentresult": "Assessment Result - Netreach",
  "/counsellorform": "Counsellor Form - Netreach",
  "/appointmentconfirmed": "Appointment Confirmed - Netreach",
  "/search": "Search - Netreach",
  "/feedback": "Feedback - Netreach",
  // Provider routes
  "/provider/login": "Provider Login - Netreach",
  "/provider/profile": "Provider Profile - Netreach",
  "/provider/dashboard/appointments/upcoming":
    "Upcoming Appointments - Provider",
  "/provider/dashboard/appointments/past": "Past Appointments - Provider",
  "/provider/dashboard/slots": "My Slots - Provider",
};

export function usePageTitle() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Default fallback title
    let title = titleMap[pathname] || "Page Not Found - Netreach";

    if (!titleMap[pathname]) {
      const segments = pathname.split("/").filter(Boolean); // removes empty strings

      if (pathname.startsWith("/blog/")) {
        const slug = segments[2];
        if (slug) {
          const formattedBlogTitle = slug
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

          title = `${formattedBlogTitle} - Netreach`;
        }
      } else if (pathname.startsWith("/sra")) {
        const isFeedback = pathname.endsWith("/feedback");
        const vnName =
          segments[1] && segments[1] !== "feedback" ? segments[1] : null;

        if (vnName) {
          const formattedName =
            vnName.charAt(0).toUpperCase() + vnName.slice(1);
          title = isFeedback
            ? `Feedback - ${formattedName} - Netreach`
            : `Home - ${formattedName} - Netreach`;
        }
      }
    }

    document.title = title;
  }, [pathname]);
}
