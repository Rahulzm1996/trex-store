import React, { memo, useEffect, useMemo, useState } from "react";
import SearchBar from "./SearchBar";
import Filters from "./Filters";
import TshirtListing from "./TshirtListing";
import { Box } from "@mui/material";
import useFetchTshirts from "../hooks/useFetchTshirts";
import { useAppContext } from "../context";

const Layout = () => {
  const { tshirts } = useFetchTshirts();
  const { selectedFilters, setSelectedFilters } = useAppContext();
  const [tshirtsList, setTshirtsList] = useState();

  useEffect(() => {
    setTshirtsList(tshirts);
  }, [tshirts]);

  return (
    <Box sx={{ width: "100vw", minHeight: "100vh" }}>
      <SearchBar
        tshirts={tshirts}
        tshirtsList={tshirtsList}
        setTshirtsList={setTshirtsList}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
      <Box sx={{ display: "flex" }}>
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <Filters
            setTshirtsList={setTshirtsList}
            tshirtsList={tshirtsList}
            tshirts={tshirts}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
        </Box>
        <TshirtListing tshirtsList={tshirtsList} />
      </Box>
    </Box>
  );
};

export default Layout;
