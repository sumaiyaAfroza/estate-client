import { useQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { seo } from "../../utils/seo";

const ITEMS_PER_PAGE = 8;

const AllProperties = () => {
  const axiosInstance = useAxios();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [filterType, setFilterType] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [compareList, setCompareList] = useState([]);
  const [savedSearches, setSavedSearches] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  // Load saved searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("estateSavedSearches");
    if (saved) setSavedSearches(JSON.parse(saved));

    // Load filters from URL query params (for Saved Search "Load" feature)
    const q = Object.fromEntries(searchParams.entries());
    if (q.searchTerm !== undefined) setSearchTerm(q.searchTerm || "");
    if (q.sortOrder !== undefined) setSortOrder(q.sortOrder || "");
    if (q.filterType !== undefined) setFilterType(q.filterType || "");
    if (q.bedrooms !== undefined) setBedrooms(q.bedrooms || "");
    if (q.bathrooms !== undefined) setBathrooms(q.bathrooms || "");
    if (q.priceMin !== undefined) setPriceMin(q.priceMin || "");
    if (q.priceMax !== undefined) setPriceMax(q.priceMax || "");
  }, []);

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["all-properties"],
    queryFn: async () => {
      const res = await axiosInstance.get("/allProperties");
      return res.data;
    },
  });

  // Filter logic
  const filteredProperties = properties.filter((property) => {
    const matchesSearch = property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !filterType || property.type === filterType;
    const matchesBedrooms = !bedrooms || (property.bedrooms >= parseInt(bedrooms));
    const matchesBathrooms = !bathrooms || (property.bathrooms >= parseInt(bathrooms));
    const minPrice = priceMin ? parseInt(priceMin) : 0;
    const maxPrice = priceMax ? parseInt(priceMax) : Infinity;
    const matchesPrice = property.price.min >= minPrice && property.price.min <= maxPrice;
    return matchesSearch && matchesType && matchesBedrooms && matchesBathrooms && matchesPrice;
  }).sort((a, b) => {
    if (sortOrder === "asc") return a.price.min - b.price.min;
    if (sortOrder === "desc") return b.price.max - a.price.max;
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE);
  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortOrder, filterType, bedrooms, bathrooms, priceMin, priceMax]);

  const clearFilters = () => {
    setSearchTerm("");
    setSortOrder("");
    setFilterType("");
    setBedrooms("");
    setBathrooms("");
    setPriceMin("");
    setPriceMax("");
    setCurrentPage(1);
  };

  const saveCurrentSearch = () => {
    const searchName = prompt("Give this search a name:", "My Search");
    if (!searchName) return;
    const newSearch = {
      id: Date.now(),
      name: searchName,
      filters: { searchTerm, sortOrder, filterType, bedrooms, bathrooms, priceMin, priceMax },
    };
    const updated = [...savedSearches, newSearch];
    setSavedSearches(updated);
    localStorage.setItem("estateSavedSearches", JSON.stringify(updated));
    alert("Search saved! You can find it in Saved Searches.");
  };

  const loadSavedSearch = (filters) => {
    setSearchTerm(filters.searchTerm || "");
    setSortOrder(filters.sortOrder || "");
    setFilterType(filters.filterType || "");
    setBedrooms(filters.bedrooms || "");
    setBathrooms(filters.bathrooms || "");
    setPriceMin(filters.priceMin || "");
    setPriceMax(filters.priceMax || "");
    setCurrentPage(1);
  };

  const deleteSavedSearch = (id) => {
    const updated = savedSearches.filter(s => s.id !== id);
    setSavedSearches(updated);
    localStorage.setItem("estateSavedSearches", JSON.stringify(updated));
  };

  const toggleCompare = (property) => {
    setCompareList(prev => {
      if (prev.find(p => p._id === property._id)) {
        return prev.filter(p => p._id !== property._id);
      }
      if (prev.length >= 4) {
        alert("You can compare up to 4 properties at a time.");
        return prev;
      }
      return [...prev, property];
    });
  };

  const shareProperty = (property, platform) => {
    const url = encodeURIComponent(window.location.origin + `/propertyDetails/${property._id}`);
    const text = encodeURIComponent(`Check out ${property.title} - ৳${property.price.min.toLocaleString()} in ${property.location}`);
    const links = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}`,
    };
    window.open(links[platform], "_blank", "width=600,height=400");
  };

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="px-4 md:px-10">
      <h1 className="text-4xl md:text-5xl font-bold text-center mt-12 md:mt-20 mb-8 md:mb-16 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
        Find Your Perfect Property
      </h1>
      <Helmet>
        <title>{seo.allProperties.title}</title>
        <meta name="description" content={seo.allProperties.description} />
        <meta property="og:title" content={seo.allProperties.title} />
        <meta property="og:description" content={seo.allProperties.description} />
        <link rel="canonical" href="/allProperties" />
      </Helmet>

      {/* Saved Searches */}
      {savedSearches.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 mb-6 border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">🔖 Saved Searches</h3>
          <div className="flex flex-wrap gap-2">
            {savedSearches.map((s) => (
              <span key={s.id} className="inline-flex items-center gap-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
                <button onClick={() => loadSavedSearch(s.filters)} className="font-medium hover:underline">{s.name}</button>
                <button onClick={() => deleteSavedSearch(s.id)} className="text-red-500 hover:text-red-700 ml-1">×</button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Search and Filter Controls */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <input
            type="text"
            placeholder="Search by location"
            className="input input-bordered w-full md:w-1/3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="select select-bordered w-full md:w-1/4"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">Sort by price</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
          <button onClick={saveCurrentSearch} className="btn btn-secondary btn-sm whitespace-nowrap">
            💾 Save Search
          </button>
        </div>

        {/* Advanced Filters */}
        <div className="flex flex-wrap gap-4 items-center">
          <select className="select select-bordered" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="">All Types</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="land">Land</option>
            <option value="commercial">Commercial</option>
            <option value="villa">Villa</option>
          </select>
          <select className="select select-bordered" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)}>
            <option value="">Bedrooms</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
          </select>
          <select className="select select-bordered" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)}>
            <option value="">Bathrooms</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
          <input type="number" placeholder="Min Price (৳)" className="input input-bordered w-32" value={priceMin} onChange={(e) => setPriceMin(e.target.value)} />
          <input type="number" placeholder="Max Price (৳)" className="input input-bordered w-32" value={priceMax} onChange={(e) => setPriceMax(e.target.value)} />
          <button onClick={clearFilters} className="btn btn-ghost btn-sm">Clear Filters</button>
        </div>
      </div>

      {/* Compare Bar */}
      {compareList.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 shadow-2xl rounded-xl p-4 z-40 border border-gray-200 dark:border-gray-700 w-80">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-sm">🔄 Comparing ({compareList.length}/4)</h3>
            <button onClick={() => setCompareList([])} className="text-xs text-red-500">Clear</button>
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {compareList.map(p => (
              <div key={p._id} className="flex-shrink-0 w-16">
                <img src={p.imageUrls?.[0] || p.imageUrl} alt={p.title} className="w-16 h-12 object-cover rounded" />
                <p className="text-xs truncate mt-1">{p.title.substring(0, 8)}</p>
              </div>
            ))}
          </div>
          <Link to="/compare" className="btn btn-primary btn-sm w-full mt-2">Compare Now</Link>
        </div>
      )}

      {/* Property Count */}
      <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm">
        Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filteredProperties.length)} of {filteredProperties.length} properties
      </p>

      {/* Property Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-16 gap-6">
        {paginatedProperties.map((property) => (
          <div
            key={property._id}
            className="bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-200 dark:border-slate-700 flex flex-col"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden group">
              <img
                src={property.imageUrls?.[0] || property.imageUrl}
                alt={property.title}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                  property.status === 'verified' ? 'bg-emerald-500 text-white' : 'bg-blue-500 text-white'
                }`}>
                  {property.status}
                </span>
              </div>
              {property.imageUrls?.length > 1 && (
                <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/60 rounded-lg backdrop-blur-sm">
                  <span className="text-xs text-white font-medium">📷 {property.imageUrls.length}</span>
                </div>
              )}
              {/* Compare checkbox */}
              <button
                onClick={() => toggleCompare(property)}
                className={`absolute top-3 right-3 p-1.5 rounded-full transition ${
                  compareList.find(p => p._id === property._id)
                    ? "bg-blue-600 text-white"
                    : "bg-white/90 dark:bg-slate-800/90 text-gray-600 hover:bg-blue-100"
                }`}
                title="Add to compare"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </button>
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
                  ৳ {property.price.min.toLocaleString()} – {property.price.max.toLocaleString()}
                </p>
              </div>

              {/* Share buttons */}
              <div className="flex gap-1 mb-3">
                <button onClick={() => shareProperty(property, 'facebook')} className="btn btn-xs btn-ghost" title="Share on Facebook">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </button>
                <button onClick={() => shareProperty(property, 'whatsapp')} className="btn btn-xs btn-ghost" title="Share on WhatsApp">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492l4.628-1.442A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-2.16 0-4.154-.73-5.756-1.95l-.413-.311-2.744.856.87-2.677-.338-.427A9.71 9.71 0 012.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z"/></svg>
                </button>
                <button onClick={() => shareProperty(property, 'twitter')} className="btn btn-xs btn-ghost" title="Share on Twitter/X">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </button>
              </div>

              <div className="flex items-center gap-2 mb-3 p-2 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                <img src={property.agentImage} alt="agent" className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-800 dark:text-white truncate">{property.agentName}</p>
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
        ))}
      </div>

      {/* Empty state */}
      {filteredProperties.length === 0 && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <p className="text-xl">No properties found matching your criteria.</p>
          <button onClick={clearFilters} className="btn btn-link mt-2">Clear all filters</button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mb-16 flex-wrap">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="btn btn-sm btn-outline disabled:opacity-40"
          >
            ← Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`btn btn-sm ${page === currentPage ? 'btn-primary' : 'btn-ghost'}`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="btn btn-sm btn-outline disabled:opacity-40"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default AllProperties;
