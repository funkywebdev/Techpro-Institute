// src/hooks/useUserRegion.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const REVERSE_GEOCODE_API =
  "https://api.bigdatacloud.net/data/reverse-geocode-client?";

export function useUserRegion() {
  const [countryCode, setCountryCode] = useState(null);
  const [regionReady, setRegionReady] = useState(false);

  // Attach Axios interceptor for all requests
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
      setCountryCode(cached);
      setRegionReady(true);
      return;
    }

    async function detectLocation() {
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
            setCountryCode(code);
            localStorage.setItem("countryCode", code);
            setRegionReady(true);
            return;
          }
        }
      } catch {
        // ignore geolocation errors
      }

      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        if (data.country) {
          const code = data.country.toUpperCase();
          setCountryCode(code);
          localStorage.setItem("countryCode", code);
          setRegionReady(true);
          return;
        }
      } catch {
        // ignore IP lookup errors
      }

      // Fallback
      setCountryCode("US");
      localStorage.setItem("countryCode", "US");
      setRegionReady(true);
    }

    detectLocation();
  }, []);

  return { countryCode, regionReady };
}