import React from "react";
import { AppBar, Toolbar } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

export default function Header({ filter, setFilter }) {
  const location = useLocation();
  return (
    <div className="header">
      <AppBar position="static">
        <Toolbar className="toolbar">
          <Link to="/">
            <img src="/images/logo.png" className="logo" alt="logo" />
          </Link>
          {!location.pathname.includes("/equipment") && (
            <input
              type="text"
              className="search-input"
              placeholder="Rechercher... "
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
