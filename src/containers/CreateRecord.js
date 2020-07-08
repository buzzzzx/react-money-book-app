import React, { Component } from "react";
import CategorySelect from "../components/CategorySelect";
import PriceForm from "../components/PriceForm";
import { testItems } from "../containers/Home";
import { testCategories } from "../utility";

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
          categories={testCategories}
          onSelectCategory={(category) =>
            console.log(category.id, category.name)
          }
          selectedCategory={testCategories[0]}
        />
        <PriceForm onFormSubmit={() => {}} onCancelSubmit={() => {}} />
      </>
    );
  }
}

export default CreateRecord;
