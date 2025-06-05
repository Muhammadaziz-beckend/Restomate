import { Drawer, Button, List, ListItem, ListItemText } from "@mui/material";
import { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";

import MenuImg from "../static/svgs/menu.svg";

const anchor = "right";

export default function SideMenu() {
  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => () => {
    setState({ ...state, [anchor]: open });
  };

  const menuItems = [
    { label: "🏠 Главная", path: "/" },
    { label: "👨‍🍳 Отделы", path: "/dressed" },
  ];

  const list = (anchor) => (
    <div
      style={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            style={({ isActive }) => ({
              textDecoration: "none",
              color: isActive ? "blue" : "black",
              fontWeight: isActive ? "bold" : "normal",
            })}
          >
            <ListItem button>
              <ListItemText primary={item.label} />
            </ListItem>
          </NavLink>
        ))}
      </List>
    </div>
  );

  return (
    <Fragment key={anchor}>
      <Button onClick={toggleDrawer(anchor, true)} className="menu">
        <img src={MenuImg} alt="menu" />
      </Button>
      <Drawer
        anchor={anchor}
        open={state[anchor]}
        onClose={toggleDrawer(anchor, false)}
      >
        {list(anchor)}
      </Drawer>
    </Fragment>
  );
}
