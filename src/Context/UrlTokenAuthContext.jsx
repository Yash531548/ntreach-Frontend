import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getUserProfile } from "../Api/getUserProfile";
import { getVnByOutreachCode } from "../Api/getVnByOutreachCode";
import { useAuth } from "./AuthContext";

const UrlTokenAuthContext = createContext(null);

/* eslint-disable react-refresh/only-export-components */
export const useUrlTokenAuth = () => useContext(UrlTokenAuthContext);

export const UrlTokenAuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // Use the same login function as normal login
  const { login } = useAuth();

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const [isUrlAuthenticated, setIsUrlAuthenticated] = useState(
    localStorage.getItem("isUrlAuthenticated") === "true",
  );

  // Store VN data so VnContext can use it after URL authentication
  const [vnData, setVnData] = useState(() => {
    const stored = localStorage.getItem("vnData");

    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    const handleUrlLogin = async () => {
      const params = new URLSearchParams(window.location.search);

      const token = params.get("token");
      const mobileNo = params.get("mobile_no");
      const outId = params.get("out_id")?.split("/")[0];

      // --------------------------------
      // Normal visit — nothing to do
      // --------------------------------
      if (!token) {
        setProcessing(false);
        return;
      }

      setProcessing(true);
      setError(null);

      try {
        console.log("URL token found");

        // --------------------------------
        // 1. Save URL-specific data
        // --------------------------------

        localStorage.setItem("userToken", token);

        if (mobileNo) {
          localStorage.setItem("mobile_no", mobileNo);
        }

        if (outId) {
          localStorage.setItem("outreachId", outId);
        }

        // --------------------------------
        // 2. Get VN by outreach code
        // --------------------------------

        let vnResponse = null;

        if (outId) {
          vnResponse = await getVnByOutreachCode(outId);

          console.log("VN response:", vnResponse);

          const vnData =
            vnResponse?.data?.data || vnResponse?.data?.vn || vnResponse?.data;

          if (vnData) {
            console.log("VN found via outreach code:", vnData);

            localStorage.setItem("vnData", JSON.stringify(vnData));

            // Update context state so VnContext can immediately use it
            setVnData(vnData);
          }
        }

        // --------------------------------
        // 3. Fetch user profile
        // --------------------------------

        const response = await getUserProfile();

        console.log("Profile response:", response);

        const profile =
          response?.data?.data || response?.data?.user || response?.data;

        if (!profile) {
          throw new Error("User profile not found");
        }

        // --------------------------------
        // 4. Create same userData structure
        //    as normal login
        // --------------------------------

        const userData = {
          token,
          user: profile.user,
        };

        // --------------------------------
        // 5. Use AuthContext login()
        // --------------------------------
        // This will:
        // - setIsAuthenticated(true)
        // - setUser(userData)
        // - save userToken
        // - save user

        login(userData);

        localStorage.setItem("isUrlAuthenticated", "true");
        setIsUrlAuthenticated(true);

        // --------------------------------
        // 6. Save profile separately
        // --------------------------------

        localStorage.setItem("userProfile", JSON.stringify(profile));

        // --------------------------------
        // 7. Remove query parameters
        // --------------------------------

        window.history.replaceState(
          {},
          document.title,
          window.location.pathname,
        );

        // --------------------------------
        // 8. Go to questionnaire
        // --------------------------------

        navigate("/questionnaire", {
          replace: true,
        });
      } catch (err) {
        console.error("URL token login failed:", err);

        setError(err);

        // --------------------------------
        // Clear authentication data
        // --------------------------------

        localStorage.removeItem("userToken");
        localStorage.removeItem("user");
        localStorage.removeItem("userProfile");
        localStorage.removeItem("vnData");
        localStorage.removeItem("isUrlAuthenticated");

        setVnData(null);
        setIsUrlAuthenticated(false);

        // --------------------------------
        // Send to normal login
        // --------------------------------

        navigate("/login", {
          replace: true,
        });
      } finally {
        setProcessing(false);
      }
    };

    handleUrlLogin();
  }, [navigate, login]);

  return (
    <UrlTokenAuthContext.Provider
      value={{
        processing,
        error,
        isUrlAuthenticated,
        vnData,
      }}
    >
      {children}
    </UrlTokenAuthContext.Provider>
  );
};
