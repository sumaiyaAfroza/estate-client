import { Link } from "react-router-dom";

const statusColors = {
  verified: "bg-emerald-500 text-white",
  pending: "bg-blue-500 text-white",
  sold: "bg-red-500 text-white",
  "under-offer": "bg-indigo-500 text-white",
  available: "bg-emerald-500 text-white",
};

const PropertyCard = ({
  property,
  showCompare = false,
  compareList = [],
  onToggleCompare,
  showShare = true,
  onShare,
}) => {
  const priceMin = typeof property.price?.min === "number"
    ? property.price.min.toLocaleString()
    : property.price?.min || "—";
  const priceMax = typeof property.price?.max === "number"
    ? property.price.max.toLocaleString()
    : property.price?.max || "—";

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-200 dark:border-slate-700 flex flex-col">
      {/* Image */}
      <div className="relative h-48 overflow-hidden group">
        <img
          src={property.imageUrls?.[0] || property.imageUrl}
          alt={property.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-lg text-xs font-bold ${statusColors[property.status] || "bg-blue-500 text-white"}`}>
            {property.status}
          </span>
        </div>
        {property.imageUrls?.length > 1 && (
          <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/60 rounded-lg backdrop-blur-sm">
            <span className="text-xs text-white font-medium">📷 {property.imageUrls.length}</span>
          </div>
        )}

        {/* Compare button */}
        {showCompare && (
          <button
            onClick={() => onToggleCompare?.(property)}
            className={`absolute top-3 right-3 p-1.5 rounded-full transition ${
              compareList.find((p) => p._id === property._id)
                ? "bg-blue-600 text-white"
                : "bg-white/90 dark:bg-slate-800/90 text-gray-600 hover:bg-blue-100"
            }`}
            title="Add to compare"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h2 className="text-lg font-bold mb-1 text-slate-800 dark:text-white line-clamp-1">
          {property.title}
        </h2>
        <div className="flex items-center gap-1 mb-2 text-slate-600 dark:text-slate-400 text-sm">
          <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
          <span className="truncate">{property.location}</span>
        </div>

        {(property.bedrooms || property.bathrooms || property.area) && (
          <div className="grid grid-cols-3 gap-1 mb-2">
            {property.bedrooms && (
              <span className="text-xs bg-slate-100 dark:bg-slate-700 rounded p-1 text-center">🛏 {property.bedrooms}</span>
            )}
            {property.bathrooms && (
              <span className="text-xs bg-slate-100 dark:bg-slate-700 rounded p-1 text-center">🚿 {property.bathrooms}</span>
            )}
            {property.area && (
              <span className="text-xs bg-slate-100 dark:bg-slate-700 rounded p-1 text-center">📐 {property.area}ft²</span>
            )}
          </div>
        )}

        <div className="mb-2 p-2 bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
          <p className="text-sm font-bold text-slate-800 dark:text-white">
            ৳ {priceMin} – {priceMax}
          </p>
        </div>

        {/* Share buttons */}
        {showShare && (
          <div className="flex gap-1 mb-3">
            <button
              onClick={() => onShare?.(property, "facebook")}
              className="btn btn-xs btn-ghost"
              title="Share on Facebook"
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </button>
            <button
              onClick={() => onShare?.(property, "whatsapp")}
              className="btn btn-xs btn-ghost"
              title="Share on WhatsApp"
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492l4.628-1.442A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-2.16 0-4.154-.73-5.756-1.95l-.413-.311-2.744.856.87-2.677-.338-.427A9.71 9.71 0 012.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z"/></svg>
            </button>
            <button
              onClick={() => onShare?.(property, "twitter")}
              className="btn btn-xs btn-ghost"
              title="Share on Twitter/X"
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </button>
          </div>
        )}

        <div className="flex items-center gap-2 mb-3 p-2 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
          <img
            src={property.agentImage}
            alt="agent"
            className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500"
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-800 dark:text-white truncate">
              {property.agentName}
            </p>
          </div>
        </div>

        <Link
          to={`/propertyDetails/${property._id}`}
          className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-bold py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-md mt-auto"
        >
          <span className="text-sm">View Details</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
