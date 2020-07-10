import React, { Component } from "react";
import { navigate } from "@reach/router";

import CategoryViewTab from "../components/CategoryViewTab";
import CategorySelect from "../components/CategorySelect";
import PriceForm from "../components/PriceForm";
import { TYPE_INCOME, TYPE_OUTCOME } from "../utility";
import withContext from "../withContext";

const tabViews = [TYPE_OUTCOME, TYPE_INCOME];

class CreateRecord extends Component {
  editItem = this.props.id && this.props.data.items[this.props.id];
  state = {
    tabView: this.editItem
      ? this.props.data.categories[this.editItem.cid].type
      : tabViews[0],
    selectedCategory: this.editItem
      ? this.props.data.categories[this.editItem.cid]
      : null,
    validationPassed: true,
  };

  componentDidMount() {
    const id = this.props.id;
    this.props.actions.getEditData(id).then(({ categories, editItem }) => {
      this.setState({
        tabView: editItem ? categories[editItem.cid].type : tabViews[0],
        selectedCategory: editItem ? categories[editItem.cid] : null,
      });
    });
  }

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
      this.props.actions.updateItem(data, this.state.selectedCategory.id);
    }
    navigate("/");
  };

  render() {
    const { data } = this.props;
    const { items, categories } = data;

    const editItem = this.props.id && items[this.props.id];

    const { tabView, selectedCategory, validationPassed } = this.state;

    const filterCategories = Object.keys(categories)
      .filter((id) => {
        return categories[id].type === tabView;
      })
      .map((id) => {
        return categories[id];
      });

    const tabViewIndex = tabViews.findIndex((text) => text === tabView);

    return (
      <div
        className="create-page py-5 px-3 rounded"
        style={{ background: "#fff" }}
      >
        <CategoryViewTab
          activeIndex={tabViewIndex}
          onTabChange={this.onTabChange}
        />
        <CategorySelect
          categories={filterCategories}
          selectedCategory={selectedCategory}
          onSelectCategory={this.onSelectCategory}
        />
        <PriceForm
          onFormSubmit={this.onFormSubmit}
          onCancelSubmit={this.onCancelSubmit}
          item={editItem}
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
