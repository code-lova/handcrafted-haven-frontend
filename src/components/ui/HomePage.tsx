import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import HeroSection from "../home/HeroSection";
import ValueProps from "../home/ValueProps";
import FeaturedCategories from "../home/FeaturedCategories";
import FeaturedProducts from "../home/FeaturedProducts";
import StorySpotlight from "../home/StorySpotlight";
import HowItWorks from "../home/HowItWorks";
import MissionSection from "../home/MissionSection";
import Newsletter from "../home/Newsletter";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ValueProps />
      <FeaturedCategories />
      <FeaturedProducts />
      <StorySpotlight />
      <HowItWorks />
      <MissionSection />
      <Newsletter />
      <Footer />
    </>
  );
};

export default HomePage;
