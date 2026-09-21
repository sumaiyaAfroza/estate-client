// Sitemap generator - run from build script or serve statically
const base = "https://estate-platform.vercel.app";

const generateSitemap = () => {
  const staticRoutes = [
    "", "/allProperties", "/about", "/contact", "/advertiseSection",
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticRoutes.map(p => `  <url><loc>${base}${p}</loc><changefreq>${p === "" ? "daily" : "weekly"}</changefreq><priority>${p === "" ? "1.0" : "0.8"}</priority></url>`).join("\n")}
</urlset>`;
};

export default generateSitemap;
