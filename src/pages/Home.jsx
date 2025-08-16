import React from "react";
import Banner from "../component/Banner";
import { Helmet } from "react-helmet";
import LatestReview from "../component/LatestReview";
import AdvertiseSection from "../component/AdvertiseSection";
import Extra from "../component/Extra";
import Extra2 from "../component/Extra2";
import Extranew from "../component/Extranew";



const Home = () => {

  return (
    <div>
      <Helmet>
      <title>Home</title>
      </Helmet>
      <Banner></Banner>
      <AdvertiseSection></AdvertiseSection>
      <LatestReview></LatestReview>
      <Extra></Extra>
      <Extra2></Extra2>
      <Extranew></Extranew>
      
      
    </div>
  );
};
export default Home;
