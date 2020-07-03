import React, { Component } from "react";
import logo from "../logo.svg";
import PriceList from "../components/PriceList";
import ViewTab from "../components/ViewTab";
import { LIST_VIEW } from "../utility";
import TotalPrice from "../components/TotalPrice";
import MonthPicker from "../components/MonthPicker";
import CreateBtn from "../components/CreateBtn";

const items = [
  {
    id: 0,
    category: {
      id: 0,
      name: "旅游",
      type: "outcome",
      iconName: "ios-plane-outline",
    },
    title: "去南京旅游",
    price: 2000,
    date: "2020-06-17",
  },
  {
    id: 1,
    category: {
      id: 1,
      name: "购物",
      type: "outcome",
      iconName: "ios-card-outline",
    },
    title: "购买 MX Master3",
    price: 899,
    date: "2020-06-30",
  },
];

class Home extends Component {
  render() {
    let totalIncome = 0;
    let totalOutcome = 0;
    items.forEach((item) => {
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
                  year={2020}
                  month={6}
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
          activeTab={LIST_VIEW}
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
