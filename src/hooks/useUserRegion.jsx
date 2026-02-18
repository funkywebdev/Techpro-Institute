import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const REVERSE_GEOCODE_API =
  "https://api.bigdatacloud.net/data/reverse-geocode-client?";

export function useUserRegion() {
  const [countryCode, setCountryCode] = useState(null);
  const [regionReady, setRegionReady] = useState(false);
  const [error, setError] = useState(null);

  // Helper to set region and persist
  const setRegion = useCallback((code, errorMsg = null) => {
    setCountryCode(code);
    localStorage.setItem("countryCode", code);
    setError(errorMsg);
    setRegionReady(true);
  }, []);

  // Axios interceptor to add country header globally
  useEffect(() => {
    if (!countryCode) return;

    const interceptor = axios.interceptors.request.use((config) => {
      config.headers["X-Country-Code"] = countryCode;
      return config;
    });

    return () => axios.interceptors.request.eject(interceptor);
  }, [countryCode]);

  // Detect location on mount
  useEffect(() => {
    const cached = localStorage.getItem("countryCode");
    if (cached) {
      console.log("Country loaded from cache:", cached);
      setRegion(cached);
      return;
    }

    detectLocation();
  }, [setRegion]);

  // Main detection logic
  async function detectLocation() {
    // 1️⃣ Try GPS first
    // try {
    //   if ("geolocation" in navigator) {
    //     const position = await new Promise((resolve, reject) =>
    //       navigator.geolocation.getCurrentPosition(resolve, reject, {
    //         enableHighAccuracy: false,
    //         timeout: 15000, // 15s
    //         maximumAge: 60000, // 1 min cached
    //       })
    //     );

    //     const { latitude, longitude } = position.coords;

    //     const res = await fetch(
    //       `${REVERSE_GEOCODE_API}latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    //     );
    //     const data = await res.json();

      
    //     if (data.countryCode) {
    //       const code = data.countryCode.toUpperCase();
    //       console.log("Country detected via GPS:", code);
    //       setRegion(code);
    //       return;
    //     }
    //   }
    // } catch (err) {
    //   console.warn("Geolocation failed:", err.message);
    // }

    // 2️⃣ Fallback: IP-based detection
    try {
      const fallbackCode = await detectCountryFallback();
      console.log("Country detected via IP:", fallbackCode);
      setRegion(fallbackCode);
    } catch {
      // 3️⃣ Default if everything fails
      console.warn("Could not detect location, defaulting to US");
      setRegion("US", "Could not detect location, defaulted to US");
    }
  }

  // IP-based fallback
  async function detectCountryFallback() {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();

    if (data.country_code) return data.country_code.toUpperCase();
    throw new Error("IP fallback failed");
  }

  return { countryCode, regionReady, error };
}