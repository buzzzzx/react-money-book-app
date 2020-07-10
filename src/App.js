import React, { createContext, Component } from "react";
import { Router } from "@reach/router";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import Home from "./containers/Home";
import CreateRecord from "./containers/CreateRecord";
import { flattenData, ID, parseToYearAndMonth } from "./utility";

export const AppContext = createContext();

class App extends Component {
  state = {
    categories: {},
    items: {},
    currentDate: parseToYearAndMonth(),
    isLoading: false,
  };

  withLoading = (cb) => {
    return (...args) => {
      this.setState({
        isLoading: true,
      });

      return cb(...args);
    };
  };

  actions = {
    getInitialData: this.withLoading(async () => {
      const { currentDate } = this.state;
      const getItemsForDateUrl = `/items?monthCategory=${currentDate.year}-${currentDate.month}&_sort=timestamp&_order=desc`;
      const results = await axios.all([
        axios.get("/categories"),
        axios.get(getItemsForDateUrl),
      ]);
      const [categories, items] = results;
      this.setState({
        categories: flattenData(categories.data),
        items: flattenData(items.data),
        isLoading: false,
      });

      return results;
    }),
    getEditData: this.withLoading(async (id) => {
      const arr = [axios.get("/categories")];
      if (id) {
        arr.push(axios.get(`/items/${id}`));
      }
      const results = await axios.all(arr);
      const [categories, editItem] = results;
      if (id) {
        this.setState({
          categories: flattenData(categories.data),
          isLoading: false,
          items: { ...this.state.items, [id]: editItem.data },
        });
      } else {
        this.setState({
          categories: flattenData(categories.data),
          isLoading: false,
        });
      }

      return {
        categories: flattenData(categories.data),
        editItem: editItem && editItem.data,
      };
    }),
    selectNewDate: this.withLoading(async (year, month) => {
      const getItemsForDateUrl = `/items?monthCategory=${year}-${month}&_sort=timestamp&_order=desc`;
      const items = await axios.get(getItemsForDateUrl);
      this.setState({
        items: flattenData(items.data),
        currentDate: { year: year, month: month },
        isLoading: false,
      });

      return items;
    }),
    deleteItem: this.withLoading(async (item) => {
      const deleteItem = await axios.delete(`/items/${item.id}`);
      delete this.state.items[item.id];
      this.setState({
        items: this.state.items,
        isLoading: false,
      });

      return deleteItem;
    }),
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
    updateItem: (item, categoryId) => {
      const modifiedItem = {
        ...item,
        cid: categoryId,
        timestamp: new Date(item.date).getTime(),
      };

      this.setState({
        items: { ...this.state.items, [modifiedItem.id]: modifiedItem },
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
