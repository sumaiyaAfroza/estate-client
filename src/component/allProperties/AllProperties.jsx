import { useQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { seo } from "../../utils/seo";
import PropertyCard from "../PropertyCard";

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
          <PropertyCard
            key={property._id}
            property={property}
            showCompare
            compareList={compareList}
            onToggleCompare={toggleCompare}
            onShare={shareProperty}
          />
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
