import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import logo from "../assets/logo-color.svg";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import {
  AccountBalanceWallet,
  ChatSharp,
  Home,
  LogoutOutlined,
  PaymentOutlined,
} from "@mui/icons-material";
import { Button } from "@mui/material";
import removeUserToken from "./../lib/utils/removeUserToken";
import getUserToken from "./../lib/utils/getUserToken";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Applayout = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const navItems = [
    { title: "Home", path: "/home", icon: <Home /> },
    { title: "Income", path: "/income", icon: <AccountBalanceWallet /> },
    { title: "Expense", path: "/expense", icon: <PaymentOutlined /> },
    { title: "News", path: "/news", icon: <NewspaperIcon /> },
    { title: "Chats", path: "/chats", icon: <ChatSharp /> },
  ];
  if (!getUserToken()) return <Navigate to="signin" />;

  function handelLogout() {
    removeUserToken();
    navigate("/signin");
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          {open && <img src={logo} width={200} />}
          <IconButton onClick={() => setOpen((open) => !open)}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>

        <Divider />
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          height="85%"
        >
          <List>
            {navItems.map((navItem) => (
              <ListItem
                key={navItem.title}
                disablePadding
                sx={{ display: "block" }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  onClick={() => navigate(navItem.path)}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {navItem.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={navItem.title}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Button variant={open ? "contained" : ""} onClick={handelLogout}>
            {open && "Logout "} <LogoutOutlined />
          </Button>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Applayout;
