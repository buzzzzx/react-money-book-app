import React, { Component } from "react";
import Ionicon from "react-ionicons";

class CategorySelect extends Component {
  state = {
    selectedCategory:
      this.props.selectedCategory && this.props.selectedCategory.id,
  };

  generateActiveClass = (current, target) => {
    return current === target
      ? "category-item col-3 active"
      : "category-item col-3";
  };

  handlecategorySelect = (event, categroy) => {
    event.preventDefault();

    this.setState({
      selectedCategory: categroy.id,
    });

    this.props.onSelectCategory(categroy);
  };

  render() {
    const { categories } = this.props;
    const { selectedCategory } = this.state;

    return (
      <div className="categroy-select-component">
        <div className="row">
          {categories.map((category, index) => (
            <div
              className={this.generateActiveClass(
                category.id,
                selectedCategory
              )}
              href="#"
              key={index}
              onClick={(event) => this.handlecategorySelect(event, category)}
            >
              <Ionicon
                className="rounded-circle"
                fontSize="55px"
                color="#555"
                icon={category.iconName}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default CategorySelect;
