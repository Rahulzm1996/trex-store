import React, { memo, useEffect, useMemo, useState } from "react";
import SearchBar from "./SearchBar";
import Filters from "./Filters";
import TshirtListing from "./TshirtListing";
import { Box } from "@mui/material";
import useFetchTshirts from "../hooks/useFetchTshirts";
import { filter, isEmpty } from "lodash";

const Layout = () => {
  const { tshirts } = useFetchTshirts();
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
      />
      <div style={{ display: "flex" }}>
        <Filters
          setTshirtsList={setTshirtsList}
          tshirtsList={tshirtsList}
          tshirts={tshirts}
        />
        <TshirtListing tshirtsList={tshirtsList} />
      </div>
    </Box>
  );
};

export default Layout;
