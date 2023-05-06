import React, { useState } from "react";

import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";

const SearchBar = ({ tshirts, tshirtsList, setTshirtsList }) => {
  const [searchedText, setSearchedText] = useState("");

  const handleInputChange = (e) => {
    console.log(e);
    setSearchedText(e.target.value);
    if (e.target.value === "") {
      setTshirtsList(tshirts);
    }
  };

  const handleTshirtsSearch = () => {
    if (!searchedText) return;

    const filteredsearchResults = tshirts.filter((tshirt) =>
      Object.values(tshirt).some((value) =>
        value.toString().toLowerCase().includes(searchedText.toLowerCase())
      )
    );
    setTshirtsList(filteredsearchResults);
  };

  return (
    <Box sx={{ width: "100%", border: "1px solid black", padding: "12px" }}>
      <Box
        sx={{
          marginLeft: "20%",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <Input
          type="text"
          value={searchedText}
          onChange={handleInputChange}
          onKeyPress={(event) => {
            console.log({ event });
            if (event.charCode === 13 || event.which === 13) {
              handleTshirtsSearch();
            }
          }}
          placeholder="Search for products.."
          inputProps={{ "aria-label": "search box" }}
          sx={{ width: "300px" }}
        />
        <IconButton aria-label="Example" onClick={handleTshirtsSearch}>
          <SearchIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default SearchBar;
