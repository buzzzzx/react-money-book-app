import React, { Component } from "react";
import Ionicon from "react-ionicons";
import PropTypes from "prop-types";

class CategorySelect extends Component {
  handlecategorySelect = (event, categroy) => {
    event.preventDefault();

    this.props.onSelectCategory(categroy);
  };

  render() {
    const { categories } = this.props;
    const selectedCategoryId =
      this.props.selectedCategory && this.props.selectedCategory.id;

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
                style={{ textAlign: "center" }}
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
                <p>{category.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

CategorySelect.propTypes = {
  categories: PropTypes.array.isRequired,
  selectedCategory: PropTypes.object,
  onSelectCategory: PropTypes.func.isRequired,
};

export default CategorySelect;
