const fetchIpInfo = async () => {
  const cachedIpInfo = localStorage.getItem("ipInfo");

  if (cachedIpInfo) {
    try {
      const ipInfo = JSON.parse(cachedIpInfo);

      console.log("Using existing IP info from localStorage:", ipInfo);

      return ipInfo;
    } catch {
      console.warn("Invalid cached IP info. Fetching fresh data.");
      localStorage.removeItem("ipInfo");
    }
  }

  try {
    console.log("Fetching fresh IP info from API...");

    const response = await fetch("https://ipapi.co/json/");

    if (!response.ok) {
      throw new Error("Failed to fetch IP information");
    }

    const data = await response.json();

    const ipInfo = {
      ip: data.ip || "",
      latitude: data.latitude ?? null,
      longitude: data.longitude ?? null,
      country: data.country_name || "",
      state: data.region || "",
      city: data.city || "",
      district: "",
      pincode: data.postal || "",
    };

    localStorage.setItem("ipInfo", JSON.stringify(ipInfo));

    console.log("Fresh IP info fetched and saved:", ipInfo);

    return ipInfo;
  } catch (error) {
    console.error("Failed to fetch IP information:", error);

    return {
      ip: "",
      latitude: null,
      longitude: null,
      country: "",
      state: "",
      city: "",
      district: "",
      pincode: "",
    };
  }
};

export default fetchIpInfo;