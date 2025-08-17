import React from "react";
import Banner from "../component/Banner";
import { Helmet } from "react-helmet";
import LatestReview from "../component/LatestReview";
import AdvertiseSection from "../component/AdvertiseSection";

import Extra2 from "../component/Extra2";

import FAQ from "../component/FAQ";
import SalesPromotion from "../component/SalesPromotion";
import Newsletter from "../component/Newsletter";



const Home = () => {

  return (
    <div>
      <Helmet>
      <title>Home</title>
      </Helmet>
      <Banner></Banner>
      <AdvertiseSection></AdvertiseSection>
      <LatestReview></LatestReview>
      {/* <Extra></Extra> */}
      <Extra2></Extra2>
      {/* <Extranew></Extranew> */}
      <SalesPromotion></SalesPromotion>
      <FAQ></FAQ>
      <Newsletter></Newsletter>

      
      
    </div>
  );
};
export default Home;
