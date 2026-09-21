import { useState } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";

// Simple Leaflet map component - no external dependency needed for basic usage
const PropertyMap = ({ latitude, longitude, title }) => {
  const [loaded, setLoaded] = useState(false);
  const defaultProps = { lat: latitude || 23.8103, lng: longitude || 90.4125 }; // Default: Dhaka

  return (
    <div className="relative rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 h-64">
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <span className="loading loading-spinner loading-md text-gray-400"></span>
        </div>
      )}
      <iframe
        title={`Map of ${title}`}
        width="100%"
        height="100%"
        frameBorder="0"
        scrolling="no"
        marginHeight="0"
        marginWidth="0"
        src={`https://www.openstreetmap.org/export/embed.html?bbox=${defaultProps.lng - 0.01}%2C${defaultProps.lat - 0.005}%2C${defaultProps.lng + 0.01}%2C${defaultProps.lat + 0.005}&layer=mapnik&marker=${defaultProps.lat}%2C${defaultProps.lng}`}
        onLoad={() => setLoaded(true)}
        className="border-0"
        loading="lazy"
      />
      <div className="absolute bottom-2 left-2 bg-white dark:bg-gray-800 px-3 py-1 rounded-full text-xs shadow">
        📍 {title}
      </div>
    </div>
  );
};

export default PropertyMap;
