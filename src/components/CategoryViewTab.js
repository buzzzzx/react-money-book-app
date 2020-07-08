import React from "react";

import { Tabs, Tab } from "./Tabs";

const CategoryViewTab = ({ activeIndex, onTabChange }) => {
  return (
    <Tabs activeIndex={activeIndex} onTabChange={onTabChange}>
      <Tab>支出</Tab>
      <Tab>收入</Tab>
    </Tabs>
  );
};

export default CategoryViewTab;
