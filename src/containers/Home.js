import React, { Component } from "react";

import logo from "../logo.svg";
import PriceList from "../components/PriceList";
import ViewTab from "../components/ViewTab";
import { LIST_VIEW, CHART_VIEW } from "../utility";
import TotalPrice from "../components/TotalPrice";
import MonthPicker from "../components/MonthPicker";
import CreateBtn from "../components/CreateBtn";
import withContext from "../withContext";
import Loader from "../components/Loader";

const tabViews = [LIST_VIEW, CHART_VIEW];

class Home extends Component {
  state = {
    tabView: tabViews[0],
  };

  componentDidMount() {
    this.props.actions.getInitialData();
  }

  changeView = (index) => {
    this.setState({
      tabView: tabViews[index],
    });
  };

  changeDate = (year, month) => {
    this.props.actions.selectNewDate(year, month);
  };

  deleteItem = (deletedItem) => {
    this.props.actions.deleteItem(deletedItem);
  };

  render() {
    const { data } = this.props;
    const { items, categories, currentDate, isLoading } = data;

    const { tabView } = this.state;
    const itemsWithCategory = Object.keys(items).map((id) => {
      items[id].category = categories[items[id].cid];
      return items[id];
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
        <div className="content-area py-3 px-3">
          {isLoading ? (
            <Loader />
          ) : (
            <>
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
          )}
        </div>
      </>
    );
  }
}

export default withContext(Home);
