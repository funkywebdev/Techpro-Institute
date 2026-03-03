import { useEffect, useState, useCallback } from "react";
import api from "../api/axios"; 

export function useUserRegion() {
  const [countryCode, setCountryCode] = useState(null);
  const [regionReady, setRegionReady] = useState(false);
  const [error, setError] = useState(null);

  const setRegion = useCallback((code, errorMsg = null) => {
    setCountryCode(code);
    localStorage.setItem("countryCode", code);
    setError(errorMsg);
    setRegionReady(true);
  }, []);

  useEffect(() => {
    if (!countryCode) return;

    const interceptor = api.interceptors.request.use((config) => {
      config.headers["X-Country-Code"] = countryCode;
      return config;
    });

    return () => api.interceptors.request.eject(interceptor);
  }, [countryCode]);

  useEffect(() => {
    const cached = localStorage.getItem("countryCode");
    if (cached) {
      setRegion(cached);
      return;
    }

    detectLocation();
  }, [setRegion]);

  async function detectLocation() {
    try {
      const fallbackCode = await detectCountryFallback();
      setRegion(fallbackCode);
    } catch {
      setRegion("US", "Could not detect location, defaulted to US");
    }
  }

  async function detectCountryFallback() {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();

    if (data.country_code) return data.country_code.toUpperCase();
    throw new Error("IP fallback failed");
  }

  return { countryCode, regionReady, error };
}