import React, { useState } from "react";
import "./App.css";
import { theme } from "./theme";
import { ThemeProvider } from "@mui/material";
import Equipments from "./components/Equipments";
import Header from "./components/Header/Header";
import { Switch, Route } from "react-router-dom";
import Equipment from "./components/Equipment";
import { Provider } from "react-redux";
import { store } from "./store";
import Footer from "./components/Footer/Footer";

function App() {
  const [filter, setFilter] = useState("");

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <div className="app">
          <Header filter={filter} setFilter={setFilter} />
          <Switch>
            <Route path="/" exact>
              <Equipments filter={filter} setFilter={setFilter} />
            </Route>
            <Route path="/equipment/:id" exact component={Equipment} />
          </Switch>
        </div>
        <Footer />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
