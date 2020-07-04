import React, { Component } from "react";
import logo from "../logo.svg";
import PriceList from "../components/PriceList";
import ViewTab from "../components/ViewTab";
import { LIST_VIEW, parseToYearAndMonth } from "../utility";
import TotalPrice from "../components/TotalPrice";
import MonthPicker from "../components/MonthPicker";
import CreateBtn from "../components/CreateBtn";

const category = {
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
};

const items = [
  {
    id: 0,
    cid: 0,
    title: "去南京旅游",
    price: 2000,
    date: "2020-06-17",
  },
  {
    id: 1,
    cid: 1,
    title: "购买 MX Master3",
    price: 899,
    date: "2020-06-30",
  },
];

class Home extends Component {
  state = {
    currentDate: parseToYearAndMonth(),
    items,
    tabView: LIST_VIEW,
  };

  render() {
    const { items, tabView, currentDate } = this.state;
    const itemsWithCategory = items.map((item) => {
      item.category = category[item.cid];
      return item;
    });

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
                  onChange={(year, month) => {
                    console.log(year, month);
                  }}
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
        <ViewTab
          activeTab={tabView}
          onTabChange={(view) => console.log(view)}
        />
        <CreateBtn onClick={() => console.log("Create a new record")} />
        <PriceList
          items={items}
          onModifyItem={(item) => alert(item.id)}
          onDeleteItem={(item) => alert(item.id)}
        />
      </>
    );
  }
}

export default Home;
