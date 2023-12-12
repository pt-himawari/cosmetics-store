import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import React from "react";
import PeopleIcon from "@mui/icons-material/People";
import LayersIcon from "@mui/icons-material/Layers";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useLocation, Link } from "react-router-dom";
const color = {
  color: "#536b88",
};
export const MainListItems = () => {
  const location = useLocation();

  const isRouteActive = (route) => {
    return location.pathname === route;
  };

  return (
    <React.Fragment>
      <ListItemButton
        component={Link}
        to={"/dashboard"}
        selected={isRouteActive("/dashboard")}
      >
        <ListItemIcon>
          <DashboardIcon sx={color} />
        </ListItemIcon>
        <ListItemText primary="Overview" sx={color} />
      </ListItemButton>

      <ListItemButton
        component={Link}
        to={"/orderManagement"}
        selected={isRouteActive("/orderManagement")}
      >
        <ListItemIcon>
          <ShoppingCartIcon sx={color} />
        </ListItemIcon>
        <ListItemText primary="Orders" sx={color} />
      </ListItemButton>

      <ListItemButton
        component={Link}
        to={"/productsMain"}
        selected={isRouteActive("/productsMain")}
      >
        <ListItemIcon>
          <LocalMallIcon sx={color} />
        </ListItemIcon>
        <ListItemText primary="Products" sx={color} />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon sx={color} />
        </ListItemIcon>
        <ListItemText primary="Customers" sx={color} />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon>
          <LayersIcon sx={color} />
        </ListItemIcon>
        <ListItemText primary="Integrations" sx={color} />
      </ListItemButton>
    </React.Fragment>
  );
};

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon sx={color} />
      </ListItemIcon>
      <ListItemText primary="Current month" sx={color} />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon sx={color} />
      </ListItemIcon>
      <ListItemText primary="Last quarter" sx={color} />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon sx={color} />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" sx={color} />
    </ListItemButton>
  </React.Fragment>
);
