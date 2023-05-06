import React, { useState } from "react";
import useFetchTshirts from "../hooks/useFetchTshirts";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";

import { Box, IconButton, Stack } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useAppContext } from "../context";

const StyledCard = styled(Card)({
  "&.MuiCard-root": {
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
    background: "#e5e9ec",
    padding: "12px",

    "&:hover": {
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
    },

    "& .MuiCardContent-root": {
      padding: "8px",
    },
  },
});

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const TshirtListing = ({ tshirtsList }) => {
  return (
    <Box
      sx={{
        width: "calc(100vw - 300px)",
        flexGrow: 1,
        padding: "16px",
        overflowY: "auto",
      }}
    >
      <Grid
        container
        rowSpacing={6}
        columnSpacing={6}
        sx={{ height: "100vh", overflowY: "scroll" }}
      >
        {tshirtsList?.map((tshirt) => (
          <Tshirt {...tshirt} key={tshirt.id} />
        ))}
      </Grid>
    </Box>
  );
};

const Tshirt = ({ id, imageURL, name, price, color, quantity }) => {
  const { cartItemList, setCartItemList } = useAppContext();
  const [count, setCount] = useState(0);
  const [snackbarInfo, setSnackbarInfo] = useState({
    open: false,
    message: "",
    variant: "success",
  });
  const [isAddToCartClicked, setIsAddToCartClicked] = useState(false);

  const handleAddToCartClick = () => {
    setIsAddToCartClicked(true);
  };

  const handleRemoveClick = () => {
    if (count === 0) {
      setSnackbarInfo({
        open: true,
        message: "quantity cannot be 0 to add",
        variant: "error",
      });
      return;
    }

    const updatedCount = count - 1;
    //remove tshirt from cart
    if (updatedCount === 0) {
      const newCartList = cartItemList.filter((el) => el.id !== id);
      setCartItemList([...newCartList]);
    } else {
      const updatedCartItemList = cartItemList.map((el) => {
        if (el.id === id && count - 1 !== 0) {
          return { ...el, qty: count - 1, price: price * (count - 1) };
        }
        return el;
      });

      setCartItemList([...updatedCartItemList]);
    }

    setCount((count) => count - 1);
  };

  const handleAddClick = () => {
    if (quantity === 0 || quantity <= count) {
      setSnackbarInfo({
        open: true,
        message: "no more quantity available",
        variant: "warning",
      });
      return;
    }

    if (
      cartItemList.length === 0 ||
      cartItemList.findIndex((el) => el.id === id) === -1
    ) {
      const item = {
        id: id,
        qty: count + 1,
        price: price,
        product: { id, name, price, color, quantity, imageURL },
      };
      cartItemList.push(item);
      setCartItemList([...cartItemList]);
    } else {
      const updatedCartItemList = cartItemList.map((el) => {
        if (el.id === id) {
          return { ...el, qty: count + 1, price: price * (count + 1) };
        }
        return el;
      });
      setCartItemList([...updatedCartItemList]);
    }
    setCount((count) => count + 1);
  };

  const handleClose = () => {
    setSnackbarInfo((prev) => ({ ...prev, open: false }));
  };

  console.log({ id, cartItemList });

  return (
    <Grid item xs={12} sm={6} md={6} lg={4}>
      <StyledCard key={id}>
        <CardMedia
          component="img"
          alt="green iguana"
          width="100%"
          height="180"
          image={imageURL}
        />
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            width="100%"
            alignItems="center"
          >
            <Typography gutterBottom variant="subtitle2" component="div">
              {name}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              Rs {price}
            </Typography>
          </Stack>

          <Stack
            direction="row"
            justifyContent="space-between"
            width="100%"
            alignItems="center"
          >
            {isAddToCartClicked ? (
              <Button
                variant="contained"
                size="small"
                onClick={handleAddToCartClick}
                sx={{
                  marginLeft: "auto",
                  background: "#0d0d0d",
                  "&:hover": {
                    background: "#0d0d0d",
                  },
                }}
              >
                Add to cart
              </Button>
            ) : (
              <Box
                sx={{
                  color: "#fff",
                  background: "#0d0d0d",
                  width: "80px",
                  borderRadius: "4px",
                  marginLeft: "auto",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <IconButton
                  aria-label="sub"
                  size="small"
                  sx={{ color: "#fff" }}
                  onClick={handleRemoveClick}
                >
                  <RemoveIcon fontSize="inherit" />
                </IconButton>
                <Typography gutterBottom variant="subtitle2" component="div">
                  {count}
                </Typography>
                <IconButton
                  aria-label="add"
                  size="small"
                  sx={{ color: "#fff" }}
                  onClick={handleAddClick}
                >
                  <AddIcon fontSize="inherit" />
                </IconButton>
              </Box>
            )}
          </Stack>
        </CardContent>
      </StyledCard>
      <Snackbar
        open={snackbarInfo.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={snackbarInfo.variant}
          sx={{ width: "100%" }}
        >
          {snackbarInfo.message}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default TshirtListing;
