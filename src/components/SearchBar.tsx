import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Drawer from "@mui/material/Drawer";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import Input from "@mui/material/Input";
import IconButton from "@mui/material/IconButton";
import React, { useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Stack, Typography } from "@mui/material";

import Filters from "./Filters";
import { ISearchBarProps } from "../types";

const SearchBar = ({
  tshirts,
  tshirtsList,
  setTshirtsList,
  selectedFilters,
  setSelectedFilters,
}: ISearchBarProps) => {
  const [searchedText, setSearchedText] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen((prevState) => !prevState);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedText(e.target.value);

    //when clear the input field, show all the products
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
    <Box sx={{ width: "100%", padding: "12px" }}>
      <Box
        sx={{
          marginLeft: { xs: "0", sm: "20%" },
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
            if (event.charCode === 13 || event.which === 13) {
              //handling enter key press here for search
              handleTshirtsSearch();
            }
          }}
          placeholder="Search for products.."
          inputProps={{ "aria-label": "search box" }}
          sx={{ width: "300px" }}
        />

        {/* //keeping search button disable if searched it empty */}
        <IconButton
          aria-label="search"
          onClick={handleTshirtsSearch}
          size="small"
          disabled={!searchedText}
          sx={{
            color: "#fff",
            background: "#242525",
            padding: "4px",
            borderRadius: "4px",
            "&:hover": {
              color: "#fff",
              background: "#242525",
            },
            "&.MuiIconButton-root.Mui-disabled": {
              cursor: "not-allowed",
              pointerEvents: "unset",

              "&:hover": {
                color: "unset",
                background: "unset",
              },
            },
          }}
        >
          <SearchOutlinedIcon />
        </IconButton>

        <IconButton
          aria-label="filter"
          sx={{
            color: "#fff",
            background: "#242525",
            padding: "4px",
            borderRadius: "4px",
            display: { xs: "flex", sm: "none" },
            "&:hover": {
              color: "#fff",
              background: "#242525",
            },
          }}
          onClick={() => setIsDrawerOpen(true)}
          size="small"
        >
          <FilterAltOutlinedIcon />
        </IconButton>
      </Box>

      {/* //drawer for filters in mobile view */}
      <Drawer
        anchor="right"
        variant="temporary"
        open={isDrawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: "80%",
          },
        }}
      >
        <Box
          padding="16px"
          sx={{
            "& .filters": {
              width: "100%",
            },
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="body1">Filters</Typography>
            <IconButton
              aria-label="close"
              onClick={handleDrawerToggle}
              size="small"
            >
              <CloseIcon />
            </IconButton>
          </Stack>
          <Filters
            setTshirtsList={setTshirtsList}
            tshirtsList={tshirtsList}
            tshirts={tshirts}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
        </Box>
      </Drawer>
    </Box>
  );
};

export default SearchBar;
