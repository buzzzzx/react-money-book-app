import React, { Component } from "react";
import logo from "../logo.svg";
import PriceList from "../components/PriceList";
import ViewTab from "../components/ViewTab";
import {
  LIST_VIEW,
  parseToYearAndMonth,
  CHART_VIEW,
  padLeft,
} from "../utility";
import TotalPrice from "../components/TotalPrice";
import MonthPicker from "../components/MonthPicker";
import CreateBtn from "../components/CreateBtn";

export const category = {
  0: {
    id: 0,
    name: "旅游",
    type: "outcome",
    iconName: "ios-plane-outline",
  },
  1: {
    id: 1,
    name: "购物",
    type: "outcome",
    iconName: "ios-card-outline",
  },
  2: {
    id: 2,
    name: "理财",
    type: "income",
    iconName: "ios-basket-outline",
  },
};

export const testItems = [
  {
    id: 1,
    cid: 0,
    title: "去南京旅游",
    price: 2000,
    date: "2020-06-17",
  },
  {
    id: 2,
    cid: 1,
    title: "购买 MX Master3",
    price: 899,
    date: "2020-06-30",
  },
];

export const newItem = {
  id: 3,
  cid: 2,
  title: "基金收入 300",
  price: 300,
  date: "2020-07-05",
};

class Home extends Component {
  state = {
    currentDate: parseToYearAndMonth(),
    items: testItems,
    tabView: LIST_VIEW,
  };

  changeView = (view) => {
    this.setState({
      tabView: view,
    });
  };

  changeDate = (year, month) => {
    this.setState({
      currentDate: { year, month },
    });
  };

  // FIXME: for now just add a prepared item directly
  createItem = () => {
    this.setState({
      items: [newItem, ...this.state.items],
    });
  };

  // FIXME: for now just update item's title with prepared title
  modifyItem = (modifiedItem) => {
    const newItems = this.state.items.map((item) => {
      if (item.id === modifiedItem.id) {
        return { ...item, title: "更新后的标题" };
      } else {
        return item;
      }
    });
    this.setState({
      items: newItems,
    });
  };

  deleteItem = (deletedItem) => {
    const filteredItems = this.state.items.filter(
      (item) => item.id !== deletedItem.id
    );
    this.setState({
      items: filteredItems,
    });
  };

  render() {
    const { items, tabView, currentDate } = this.state;
    const itemsWithCategory = items
      .map((item) => {
        item.category = category[item.cid];
        return item;
      })
      .filter((item) =>
        item.date.includes(`${currentDate.year}-${padLeft(currentDate.month)}`)
      );

    let totalIncome = 0;
    let totalOutcome = 0;
    itemsWithCategory.forEach((item) => {
      if (item.category.type === "income") {
        totalIncome += item.price;
      } else {
        totalOutcome += item.price;
      }
    });

    return (
      <>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="container">
            <div className="row">
              <div className="col">
                <MonthPicker
                  year={currentDate.year}
                  month={currentDate.month}
                  onChange={this.changeDate}
                />
              </div>
              <div className="col">
                <TotalPrice
                  totalIncome={totalIncome}
                  totalOutcome={totalOutcome}
                />
              </div>
            </div>
          </div>
        </header>
        <CreateBtn onClick={this.createItem} />
        <ViewTab activeTab={tabView} onTabChange={this.changeView} />
        {tabView === LIST_VIEW && (
          <PriceList
            items={itemsWithCategory}
            onModifyItem={this.modifyItem}
            onDeleteItem={this.deleteItem}
          />
        )}
        {tabView === CHART_VIEW && <h2>Hello, this is chart view.</h2>}
      </>
    );
  }
}

export default Home;
