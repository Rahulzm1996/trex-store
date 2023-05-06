import { Box } from "@mui/material";
import { useEffect, useState } from "react";

import Filters from "./Filters";
import { ITshirt } from "../types";
import SearchBar from "./SearchBar";
import TshirtListing from "./TshirtListing";
import { useAppContext } from "../context";
import useFetchTshirts from "../hooks/useFetchTshirts";

const Layout = () => {
  const { loading, tshirts } = useFetchTshirts();
  const { selectedFilters, setSelectedFilters } = useAppContext();
  const [tshirtsList, setTshirtsList] = useState<Array<ITshirt>>([]);

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
        <TshirtListing loading={loading} tshirtsList={tshirtsList} />
      </Box>
    </Box>
  );
};

export default Layout;
