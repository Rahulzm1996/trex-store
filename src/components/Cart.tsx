import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useAppContext } from "../context";
import Divider from "@mui/material/Divider";

const Cart = () => {
  const { cartItemList, setCartItemList } = useAppContext();
  console.log({ cartItemList });

  const handleDeleteTshirtCart = (id) => {
    const newCartItemList = cartItemList.filter((item) => item.id !== id);
    setCartItemList([...newCartItemList]);
  };

  return (
    <Box sx={{ minHeight: "calc(100%  - 64px - 160px)", padding: "2rem 4rem" }}>
      <Typography variant="body1" mb="16px !important">
        Shopping Cart
      </Typography>

      <Stack
        spacing={4}
        sx={{ width: "80vw", maxWidth: "400px", marginRight: "auto" }}
      >
        {cartItemList.map((tshirt) => {
          const {
            id,
            qty,
            total,
            product: { name, imageURL, price },
          } = tshirt;
          return (
            <Stack
              key={id}
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent="space-evenly"
            >
              <Box
                sx={{
                  background: "",
                  img: {
                    height: "50px",
                    borderRadius: "8px",
                  },
                }}
              >
                <img src={imageURL} alt={name} width="100" />
              </Box>
              <Stack>
                <Typography
                  variant="subtitle2"
                  textAlign="left"
                  fontWeight="bold"
                >
                  {name}
                </Typography>
                <Typography variant="subtitle2" textAlign="left">
                  Rs {price}
                </Typography>
              </Stack>
              <Typography variant="subtitle2">{qty}</Typography>
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleDeleteTshirtCart(id)}
                sx={{
                  color: "#242525",
                  borderColor: "#242525",
                  "&:hover": {
                    background: "#f2f6f8",
                    borderColor: "#242525",
                  },
                }}
              >
                delete
              </Button>
            </Stack>
          );
        })}

        <Divider sx={{ borderColor: "unset", borderWidth: "1px" }} />

        <Stack
          direction="row"
          spacing={2}
          margin="0 auto"
          justifyContent="center"
        >
          <Typography variant="subtitle2" fontWeight="bold">
            Total amount
          </Typography>
          <Typography variant="body2">
            Rs. {cartItemList.reduce((acc, el) => acc + el.total, 0)}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Cart;
