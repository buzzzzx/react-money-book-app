import React, { Component } from "react";
import { navigate } from "@reach/router";

import CategoryViewTab from "../components/CategoryViewTab";
import CategorySelect from "../components/CategorySelect";
import PriceForm from "../components/PriceForm";
import { TYPE_INCOME, TYPE_OUTCOME } from "../utility";
import withContext from "../withContext";

const tabViews = [TYPE_OUTCOME, TYPE_INCOME];

class CreateRecord extends Component {
  state = {
    tabView: tabViews[0],
    selectedCategory: null,
    validationPassed: true,
  };

  onTabChange = (index) => {
    this.setState({
      tabView: tabViews[index],
    });
  };

  onSelectCategory = (category) => {
    this.setState({
      selectedCategory: category,
    });
  };

  onCancelSubmit = () => {
    navigate("/");
  };

  onFormSubmit = (data, isEditMode) => {
    // validate that selectedCategory is null
    if (!this.state.selectedCategory) {
      this.setState({
        validationPassed: false,
      });
      return;
    }

    if (!isEditMode) {
      // create data
      this.props.actions.createItem(data, this.state.selectedCategory.id);
    } else {
      // udpdate data
    }
    navigate("/");
  };

  render() {
    const { data } = this.props;
    const { categories } = data;

    const { tabView, selectedCategory, validationPassed } = this.state;
    const filterCategories = Object.keys(categories)
      .filter((id) => {
        return categories[id].type === tabView;
      })
      .map((id) => {
        return categories[id];
      });

    return (
      <div
        className="create-page py-3 px-3 rounded mt-3"
        style={{ background: "#fff" }}
      >
        <CategoryViewTab activeIndex={0} onTabChange={this.onTabChange} />
        <CategorySelect
          categories={filterCategories}
          selectedCategory={selectedCategory}
          onSelectCategory={this.onSelectCategory}
        />
        <PriceForm
          onFormSubmit={this.onFormSubmit}
          onCancelSubmit={this.onCancelSubmit}
        />
        {!validationPassed && (
          <div className="alert alert-danger mt-5" role="alert">
            请选择分类信息
          </div>
        )}
      </div>
    );
  }
}

export default withContext(CreateRecord);
