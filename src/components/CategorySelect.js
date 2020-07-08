import React, { Component } from "react";
import Ionicon from "react-ionicons";

class CategorySelect extends Component {
  state = {
    selectedCategoryId:
      this.props.selectedCategory && this.props.selectedCategory.id,
  };

  handlecategorySelect = (event, categroy) => {
    event.preventDefault();

    this.setState({
      selectedCategoryId: categroy.id,
    });

    this.props.onSelectCategory(categroy);
  };

  render() {
    const { categories } = this.props;
    const { selectedCategoryId } = this.state;

    return (
      <div className="categroy-select-component">
        <div className="row">
          {categories.map((category, index) => {
            const iconColor =
              category.id === selectedCategoryId ? "#fff" : "#555";
            const backColor =
              category.id === selectedCategoryId ? "#347eff" : "#efefef";
            const activeClassName =
              category.id === selectedCategoryId
                ? "category-item col-3 active"
                : "category-item col-3";
            return (
              <div
                className={activeClassName}
                role="button"
                href="#"
                key={index}
                onClick={(event) => this.handlecategorySelect(event, category)}
              >
                <Ionicon
                  className="rounded-circle"
                  style={{ backgroundColor: backColor, padding: "5px" }}
                  fontSize="50px"
                  color={iconColor}
                  icon={category.iconName}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default CategorySelect;
