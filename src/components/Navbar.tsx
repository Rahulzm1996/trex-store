import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Badge } from "@mui/material";
import { useAppContext } from "../context";
import { Link } from "react-router-dom";

const drawerWidth = 240;
const navItems = ["Products"];

const Navbar = () => {
  const { cartItemList } = useAppContext();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: "16px !important" }}>
        TeeRex Store
      </Typography>
      <Divider />
      <List>
        <ListItem key="Products" disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <Link to="/products" className="link">
              <ListItemText
                primary="Products"
                sx={{ color: "#242525", fontWeight: "500" }}
              />
            </Link>
          </ListItemButton>
        </ListItem>
        <ListItem key="cart" disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <Link to="/cart" className="link">
              <Badge
                badgeContent={cartItemList.length}
                sx={{
                  "& .MuiBadge-badge": {
                    color: "#fff",
                    backgroundColor: "#242525",
                    left: "18px",
                  },
                }}
              >
                <ListItemText
                  primary="Cart"
                  sx={{ color: "#242525", fontWeight: "500" }}
                />
              </Badge>
            </Link>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar sx={{ background: "#2d2d2d", color: "#fff" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TeeRex Store
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Link to="/products" className="link">
              <Button sx={{ color: "#fff" }}>Products</Button>
            </Link>
            <Link to="/cart" className="link">
              <IconButton
                color="primary"
                aria-label="add to shopping cart"
                sx={{ color: "#fff" }}
              >
                <Badge
                  badgeContent={cartItemList.length}
                  sx={{
                    color: "#fff",
                    "& .MuiBadge-badge": {
                      left: "4px",
                      top: "-2px",
                    },
                  }}
                >
                  <ShoppingCartOutlinedIcon color="inherit" fontSize="small" />
                </Badge>
              </IconButton>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Toolbar />
    </Box>
  );
};

export default Navbar;
