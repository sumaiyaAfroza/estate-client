export const seo = {
  home: {
    title: "Estate — Bangladesh's Trusted Real Estate Marketplace",
    description: "Buy, sell, and rent properties across Bangladesh. Verified listings, trusted agents, and secure transactions on Estate.",
    keywords: "real estate bangladesh, property for sale, house rent dhaka, apartment chittagong, land for sale",
    ogImage: "/og-home.png",
  },
  allProperties: {
    title: "All Properties — Browse Verified Listings | Estate",
    description: "Explore verified property listings across Bangladesh. Houses, apartments, commercial spaces, and land for sale.",
    keywords: "property search, house for sale, apartment rent bangladesh",
  },
  about: {
    title: "About Us — Estate Real Estate Platform",
    description: "Learn about Estate — your trusted platform for real estate in Bangladesh. Meet our team and mission.",
  },
  contact: {
    title: "Contact Us — Estate Support",
    description: "Get in touch with Estate support team. We're here to help you find your dream property.",
  },
};

export function getOgImageUrl(path) {
  return `https://og-image.staging.vercel.app/${encodeURIComponent(path)}.png?theme=light&md=1&fontSize=70px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fvercel-triangle-black.svg`;
}
