import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";

import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/system";

const StyledFormControlLabel = styled(FormControlLabel)({
  "&.MuiFormControlLabel-root": {
    marginLeft: "unset",

    "& .MuiCheckbox-root": {
      padding: "4px 2px",

      "& .MuiSvgIcon-root": {
        fontSize: "1rem",
      },
    },
  },
});

const StyledFormLabel = styled(FormLabel)({
  "&.MuiFormLabel-root": {
    fontFamily: "inherit",
  },
});

const Filters = ({ tshirts, tshirtsList, setTshirtsList }) => {
  const [color, setColors] = useState({
    Red: false,
    Green: false,
    Blue: false,
  });

  const [gender, setGender] = useState({
    Men: false,
    Women: false,
  });

  const [price, setPrice] = useState({
    "0-Rs250": false,
    "Rs251-Rs450": false,
    Rs450: false,
  });

  const [type, setType] = useState({
    Polo: false,
    Hoodie: false,
    Basic: false,
  });

  const handleChange = (event, fieldName) => {
    console.log(event.target.name);
    if (fieldName === "color") {
      setColors({
        ...color,
        [event.target.name]: event.target.checked,
      });
    } else if (fieldName === "gender") {
      setGender({
        ...gender,
        [event.target.name]: event.target.checked,
      });
    } else if (fieldName === "price") {
      setPrice({
        ...price,
        [event.target.name]: event.target.checked,
      });
    } else if (fieldName === "type") {
      setType({
        ...type,
        [event.target.name]: event.target.checked,
      });
    }
  };

  useEffect(() => {
    const appliedFilters = {
      color: Object.keys(color).filter((key) => color[key]),
      gender: Object.keys(gender).filter((key) => gender[key]),
      price: Object.keys(price)
        .filter((key) => price[key])
        .map(generateMinMaxFromLabelOfPrice),
      type: Object.keys(type).filter((key) => type[key]),
    };

    const applicableFilters = {};

    for (const prop in appliedFilters) {
      if (
        appliedFilters.hasOwnProperty(prop) &&
        appliedFilters[prop].length > 0
      ) {
        applicableFilters[prop] = appliedFilters[prop];
      }
    }

    console.log({ appliedFilters, applicableFilters });

    const filteredArray = tshirts.filter((obj) => {
      const keys = Object.keys(applicableFilters);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (key === "price") {
          const priceRange = applicableFilters[key][0];
          if (obj.price < priceRange.min || obj.price > priceRange.max) {
            return false;
          }
        } else if (applicableFilters[key].indexOf(obj[key]) === -1) {
          return false;
        }
      }
      return true;
    });

    console.log({ filteredArray });

    if (filteredArray.length === 0) {
      setTshirtsList(tshirts);
    } else {
      setTshirtsList(filteredArray);
    }
  }, [color, gender, price, type]);

  const convertToNumber = (num: string) => {
    return Number(num.replace(/Rs/, ""));
  };

  const generateMinMaxFromLabelOfPrice = (price: string) => {
    console.log("generate : ", price);
    if (price.includes("-")) {
      const [min, max] = price.split("-");
      let priceInRs = {};
      if (Number(min) === 0) {
        priceInRs = { min: 0, max: convertToNumber(max) };
      } else {
        priceInRs = {
          min: convertToNumber(min),
          max: convertToNumber(max),
        };
      }
      return priceInRs;
    } else {
      return { min: 0, max: convertToNumber(price) };
    }
  };

  return (
    <Box sx={{ width: "300px", border: "1px solid green", padding: "30px" }}>
      <Box
        sx={{
          width: "100%",
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
          padding: "16px",
        }}
      >
        <Stack spacing={2}>
          <FormControl>
            <StyledFormLabel>Colour</StyledFormLabel>
            <FormGroup onChange={(event) => handleChange(event, "color")}>
              {Object.keys(color).map((key) => (
                <StyledFormControlLabel
                  control={<Checkbox checked={color[key]} name={key} />}
                  key={key}
                  label={key}
                />
              ))}
            </FormGroup>
          </FormControl>

          <FormControl>
            <StyledFormLabel>Gender</StyledFormLabel>
            <FormGroup onChange={(event) => handleChange(event, "gender")}>
              {Object.keys(gender).map((key) => (
                <StyledFormControlLabel
                  control={<Checkbox checked={gender[key]} name={key} />}
                  key={key}
                  label={key}
                />
              ))}
            </FormGroup>
          </FormControl>

          <FormControl>
            <StyledFormLabel>Price</StyledFormLabel>
            <FormGroup onChange={(event) => handleChange(event, "price")}>
              {Object.keys(price).map((key) => (
                <StyledFormControlLabel
                  control={<Checkbox checked={price[key]} name={key} />}
                  key={key}
                  label={key}
                />
              ))}
            </FormGroup>
          </FormControl>

          <FormControl>
            <StyledFormLabel>Type</StyledFormLabel>
            <FormGroup onChange={(event) => handleChange(event, "type")}>
              {Object.keys(type).map((key) => (
                <StyledFormControlLabel
                  control={<Checkbox checked={type[key]} name={key} />}
                  key={key}
                  label={key}
                />
              ))}
            </FormGroup>
          </FormControl>
        </Stack>
      </Box>
    </Box>
  );
};

export default Filters;
