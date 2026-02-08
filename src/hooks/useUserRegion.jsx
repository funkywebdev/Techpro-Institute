
import { useEffect, useState } from "react";
import axios from "axios";

const REVERSE_GEOCODE_API =
  "https://api.bigdatacloud.net/data/reverse-geocode-client?";

export function useUserRegion() {
  const [countryCode, setCountryCode] = useState(null);
  const [regionReady, setRegionReady] = useState(false);
  const [error, setError] = useState(null);

  // 🔹 Attach Axios interceptor AFTER country is known
  useEffect(() => {
    if (!countryCode) return;

    const interceptor = axios.interceptors.request.use((config) => {
      config.headers["X-Country-Code"] = countryCode;
      return config;
    });

    return () => axios.interceptors.request.eject(interceptor);
  }, [countryCode]);

  useEffect(() => {
    const cached = localStorage.getItem("countryCode");
    if (cached) {
      console.log("Country loaded from cache:", cached);
      setCountryCode(cached);
      setRegionReady(true);
      return;
    }

    async function detectLocation() {
      console.log("Detecting user location...");

      // 1️⃣ Try browser geolocation
      try {
        if ("geolocation" in navigator) {
          const position = await new Promise((resolve, reject) =>
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              timeout: 5000,
            })
          );

          const { latitude, longitude } = position.coords;

          const res = await fetch(
            `${REVERSE_GEOCODE_API}latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );

          const data = await res.json();

          if (data.countryCode) {
            const code = data.countryCode.toUpperCase();
            console.log("Country detected via GPS:", code);

            setCountryCode(code);
            localStorage.setItem("countryCode", code);
            setRegionReady(true);
            return;
          }
        }
      } catch (err) {
        console.warn("Geolocation failed:", err.message);
      }

      // 2️⃣ IP fallback (NO CORS issues)
      try {
        const res = await fetch("https://ipwho.is/");
        const data = await res.json();

        if (data.success && data.country_code) {
          const code = data.country_code.toUpperCase();
          console.log("Country detected via IP:", code);

          setCountryCode(code);
          localStorage.setItem("countryCode", code);
          setRegionReady(true);
          return;
        }
      } catch (err) {
        console.warn("IP lookup failed:", err.message);
      }

      // 3️⃣ Final fallback
      console.warn("Falling back to US");
      setCountryCode("US");
      localStorage.setItem("countryCode", "US");
      setError("Could not detect location, defaulted to US");
      setRegionReady(true);
    }

    detectLocation();
  }, []);

  return { countryCode, regionReady, error };
}