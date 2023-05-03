import React from "react";
import SearchBar from "./SearchBar";
import Filters from "./Filters";
import TshirtListing from "./TshirtListing";

const Layout = () => {
  return (
    <div>
      <SearchBar />
      <div>
        <Filters />
        <TshirtListing />
      </div>
    </div>
  );
};

export default Layout;
