import React, { Component } from "react";

import CategoryViewTab from "../components/CategoryViewTab";
import CategorySelect from "../components/CategorySelect";
import PriceForm from "../components/PriceForm";
import { testCategories, TYPE_INCOME, TYPE_OUTCOME } from "../utility";
import withContext from "../withContext";

const tabViews = [TYPE_OUTCOME, TYPE_INCOME];

class CreateRecord extends Component {
  state = {
    tabView: tabViews[0],
  };

  onTabChange = (index) => {
    this.setState({
      tabView: tabViews[index],
    });
  };

  render() {
    const { data } = this.props;
    console.log(data);

    const { tabView } = this.state;
    const filterCategories = testCategories.filter((category) => {
      return category.type === tabView;
    });
    return (
      <div
        className="create-page py-3 px-3 rounded mt-3"
        style={{ background: "#fff" }}
      >
        <CategoryViewTab activeIndex={0} onTabChange={this.onTabChange} />
        <CategorySelect
          categories={filterCategories}
          selectedCategory={filterCategories[0]}
          onSelectCategory={() => {}}
        />
        <PriceForm onFormSubmit={() => {}} onCancelSubmit={() => {}} />
      </div>
    );
  }
}

export default withContext(CreateRecord);
