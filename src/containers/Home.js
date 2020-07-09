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
import withContext from "../withContext";
import { navigate } from "@reach/router";

export const newItem = {
  id: 3,
  cid: 2,
  title: "基金收入 300",
  price: 300,
  date: "2020-07-05",
};

const tabViews = [LIST_VIEW, CHART_VIEW];

class Home extends Component {
  state = {
    currentDate: parseToYearAndMonth(),
    tabView: tabViews[0],
  };

  changeView = (index) => {
    this.setState({
      tabView: tabViews[index],
    });
  };

  changeDate = (year, month) => {
    this.setState({
      currentDate: { year, month },
    });
  };

  deleteItem = (deletedItem) => {
    this.props.actions.deleteItem(deletedItem);
  };

  render() {
    const { data } = this.props;
    const { items, categories } = data;
    console.log(data);

    const { tabView, currentDate } = this.state;
    const itemsWithCategory = Object.keys(items)
      .map((id) => {
        items[id].category = categories[items[id].cid];
        return items[id];
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
        <CreateBtn />
        <ViewTab activeIndex={0} onTabChange={this.changeView} />
        {tabView === LIST_VIEW &&
          (itemsWithCategory.length > 0 ? (
            <PriceList
              items={itemsWithCategory}
              onDeleteItem={this.deleteItem}
            />
          ) : (
            <div className="alert alert-light text-center no-record">
              您还没有任何记账记录
            </div>
          ))}
        {tabView === CHART_VIEW && <h2>Hello, this is chart view.</h2>}
      </>
    );
  }
}

export default withContext(Home);
