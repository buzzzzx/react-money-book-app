import React, { createContext, Component } from "react";
import { Router } from "@reach/router";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import Home from "./containers/Home";
import CreateRecord from "./containers/CreateRecord";
import { testCategories, testItems } from "./testData";
import { flattenData, ID, parseToYearAndMonth } from "./utility";

export const AppContext = createContext();

class App extends Component {
  state = {
    categories: flattenData(testCategories),
    items: flattenData(testItems),
  };

  actions = {
    deleteItem: (item) => {
      delete this.state.items[item.id];
      this.setState({
        items: this.state.items,
      });
    },
    createItem: (data, categoryId) => {
      const newId = ID();
      const date = parseToYearAndMonth(data.date);
      const monthCategory = `${date.year}-${date.month}`;
      const timestamp = new Date(data.date).getTime();
      const newItem = {
        ...data,
        id: newId,
        monthCategory: monthCategory,
        cid: categoryId,
        timestamp: timestamp,
      };

      this.setState({
        items: { ...this.state.items, [newId]: newItem },
      });
    },
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          state: this.state,
          actions: this.actions,
        }}
      >
        <div className="App">
          <div className="container pb-5">
            <Router>
              <Home path="/" />
              <CreateRecord path="create" />
              <CreateRecord path="edit/:id" />
            </Router>
          </div>
        </div>
      </AppContext.Provider>
    );
  }
}

export default App;
