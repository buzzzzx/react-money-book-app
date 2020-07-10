import React from "react";
import PropTypes from "prop-types";

import { Tabs, Tab } from "./Tabs";

const CategoryViewTab = ({ activeIndex, onTabChange }) => {
  return (
    <Tabs activeIndex={activeIndex} onTabChange={onTabChange}>
      <Tab>支出</Tab>
      <Tab>收入</Tab>
    </Tabs>
  );
};

CategoryViewTab.propTypes = {
  activeIndex: PropTypes.number.isRequired,
  onTabChange: PropTypes.func.isRequired,
};

export default CategoryViewTab;
