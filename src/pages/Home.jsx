import React from "react";
import Banner from "../component/Banner";
import { Helmet } from "react-helmet";
import LatestReview from "../component/LatestReview";
import AdvertiseSection from "../component/AdvertiseSection";
import Extra2 from "../component/LetsMake";
import FAQ from "../component/FAQ";
import SalesPromotion from "../component/SalesPromotion";
import Newsletter from "../component/Newsletter";
import { seo, getOgImageUrl } from "../utils/seo";

const Home = () => {
  const meta = seo.home;

  return (
    <div>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
        <meta name="author" content="Estate Platform" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://estate-platform.vercel.app" />
        <meta property="og:image" content={getOgImageUrl("home")} />
        <meta property="og:site_name" content="Estate" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <link rel="canonical" href="https://estate-platform.vercel.app" />
      </Helmet>
      <Banner />
      <AdvertiseSection />
      <LatestReview />
      <Extra2 />
      <SalesPromotion />
      <FAQ />
      <Newsletter />
    </div>
  );
};

export default Home;
