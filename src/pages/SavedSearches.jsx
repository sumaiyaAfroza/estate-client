import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Trash2, Star } from "lucide-react";

const SavedSearches = () => {
  const [savedSearches, setSavedSearches] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("estateSavedSearches");
    if (saved) setSavedSearches(JSON.parse(saved));

    const recent = localStorage.getItem("estateRecentSearches");
    if (recent) setRecentSearches(JSON.parse(recent));
  }, []);

  const deleteSearch = (id) => {
    const updated = savedSearches.filter(s => s.id !== id);
    setSavedSearches(updated);
    localStorage.setItem("estateSavedSearches", JSON.stringify(updated));
    toast.success("Search deleted");
  };

  const clearRecent = () => {
    setRecentSearches([]);
    localStorage.removeItem("estateRecentSearches");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">🔍 Saved Searches</h1>

      {/* Saved Searches */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Star size={20} className="text-yellow-500" /> Saved Searches
        </h2>
        {savedSearches.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No saved searches yet. Go to All Properties and click "Save Search".</p>
        ) : (
          <div className="space-y-3">
            {savedSearches.map((s) => (
              <div key={s.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div>
                  <p className="font-bold text-gray-800 dark:text-white">{s.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {s.filters.searchTerm && `📍 ${s.filters.searchTerm}`}
                    {s.filters.filterType && ` · 🏠 ${s.filters.filterType}`}
                    {s.filters.bedrooms && ` · 🛏 ${s.filters.bedrooms}+`}
                    {s.filters.priceMin && ` · ৳${s.filters.priceMin}+`}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const queryString = new URLSearchParams(s.filters).toString();
                      window.location.href = `/allProperties?${queryString}`;
                    }}
                    className="btn btn-sm btn-primary"
                  >
                    Load
                  </button>
                  <button
                    onClick={() => deleteSearch(s.id)}
                    className="btn btn-sm btn-error btn-outline"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Searches */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">🕐 Recent Searches</h2>
          {recentSearches.length > 0 && (
            <button onClick={clearRecent} className="btn btn-sm btn-ghost text-red-500">
              Clear All
            </button>
          )}
        </div>
        {recentSearches.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No recent searches.</p>
        ) : (
          <div className="space-y-2">
            {recentSearches.slice(-10).reverse().map((s, i) => (
              <div key={i} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300">
                🔍 {s} — {new Date(s.timestamp).toLocaleDateString()}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedSearches;
