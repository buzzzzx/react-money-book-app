import React, { Component } from "react";
import CategorySelect from "../components/CategorySelect";
import PriceForm from "../components/PriceForm";
import { testItems } from "../containers/Home";

const categories = [
  {
    id: 0,
    name: "旅游",
    type: "outcome",
    iconName: "ios-plane-outline",
  },
  {
    id: 1,
    name: "购物",
    type: "outcome",
    iconName: "ios-card-outline",
  },
  {
    id: 2,
    name: "理财",
    type: "income",
    iconName: "ios-basket-outline",
  },
];

class CreateRecord extends Component {
  render() {
    return this.props.id ? (
      <PriceForm
        onFormSubmit={() => {}}
        onCancelSubmit={() => {}}
        item={testItems[this.props.id - 1]}
      />
    ) : (
      <>
        <h1>This is creating page.</h1>
        <CategorySelect
          categories={categories}
          onSelectCategory={(category) =>
            console.log(category.id, category.name)
          }
          selectedCategory={categories[0]}
        />
        <PriceForm onFormSubmit={() => {}} onCancelSubmit={() => {}} />
      </>
    );
  }
}

export default CreateRecord;
