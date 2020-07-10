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
      const { items, categories } = this.state;
      const arr = [];

      if (Object.keys(categories).length === 0) {
        arr.push(axios.get("/categories"));
      }
      const isItemAreadyFetched = Object.keys(items).indexOf(id) > -1;
      if (id && !isItemAreadyFetched) {
        arr.push(axios.get(`/items/${id}`));
      }

      const results = await axios.all(arr);
      const [fetchedCategories, editItem] = results;
      const finalCategories = fetchedCategories
        ? flattenData(fetchedCategories.data)
        : categories;
      const finalItem = editItem ? editItem.data : items[id];
      if (id) {
        this.setState({
          categories: finalCategories,
          isLoading: false,
          items: { ...this.state.items, [id]: finalItem },
        });
      } else {
        this.setState({
          categories: finalCategories,
          isLoading: false,
        });
      }

      return {
        categories: finalCategories,
        editItem: finalItem,
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
    createItem: this.withLoading(async (data, categoryId) => {
      const newId = ID();
      const date = parseToYearAndMonth(data.date);
      const monthCategory = `${date.year}-${date.month}`;
      const timestamp = new Date(data.date).getTime();
      const newItem = await axios.post("/items", {
        ...data,
        id: newId,
        monthCategory: monthCategory,
        cid: categoryId,
        timestamp: timestamp,
      });

      this.setState({
        items: { ...this.state.items, [newId]: newItem.data },
        isLoading: false,
      });

      return newItem.data;
    }),
    updateItem: this.withLoading(async (item, categoryId) => {
      const updatedItem = {
        ...item,
        cid: categoryId,
        timestamp: new Date(item.date).getTime(),
      };

      const modifiedItem = await axios.put(`/items/${item.id}`, updatedItem);
      this.setState({
        items: { ...this.state.items, [modifiedItem.id]: modifiedItem.data },
        isLoading: false,
      });

      return modifiedItem.data;
    }),
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
