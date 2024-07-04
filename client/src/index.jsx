import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const loadScript = (url, callback) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = url;
    script.async = true; 
    script.onload = () => {
      if (callback) callback();
      resolve();
    };
    document.body.appendChild(script);
  });
};

const renderApp = () => {
  const root = createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
};

// Construct the URL with API key
const googleMapsScriptUrl = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_API_GOOGLE_MAPS_API_KEY}&libraries=places`;

// Load Google Maps API script before rendering the app
loadScript(googleMapsScriptUrl, renderApp)
  .catch((error) => console.error("Failed to load Google Maps script:", error));
