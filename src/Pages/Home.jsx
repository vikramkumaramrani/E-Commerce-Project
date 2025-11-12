import React from "react";
import MyNavbar from "../components/MyNavbar";
import Hero from "../components/hero";
import WhyChooseUs from "../components/WhyChooseUs";
import Products from "../components/Products";
import Category from "../components/Category";
import Footer from "../components/Footer";

function Home() {
  return (
    <div>
      <MyNavbar />
      <Hero />
      <WhyChooseUs />
      <Products />
      <Category />
      <Footer />
    </div>
  );
}

export default Home;
