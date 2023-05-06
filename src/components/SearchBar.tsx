import React, { useState } from "react";

import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import IconButton from "@mui/material/IconButton";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import Drawer from "@mui/material/Drawer";
import Filters from "./Filters";
import { Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const SearchBar = ({
  tshirts,
  tshirtsList,
  setTshirtsList,
  selectedFilters,
  setSelectedFilters,
}) => {
  const [searchedText, setSearchedText] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen((prevState) => !prevState);
  };

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
            console.log({ event });
            if (event.charCode === 13 || event.which === 13) {
              handleTshirtsSearch();
            }
          }}
          placeholder="Search for products.."
          inputProps={{ "aria-label": "search box" }}
          sx={{ width: "300px" }}
        />
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
