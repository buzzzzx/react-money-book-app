import React from "react";
import Ionicon from "react-ionicons";
import PropTypes from "prop-types";
import { Tabs, Tab } from "./Tabs";

const ViewTab = ({ activeIndex, onTabChange }) => (
  <Tabs activeIndex={activeIndex} onTabChange={onTabChange}>
    <Tab>
      <Ionicon
        className="rounded-circle mr-2"
        fontSize="25px"
        color="#007bff"
        icon="ios-paper"
      />
      列表模式
    </Tab>
    <Tab>
      <Ionicon
        className="rounded-circle mr-2"
        fontSize="25px"
        color="#007bff"
        icon="ios-pie"
      />
      图标模式
    </Tab>
  </Tabs>
);

ViewTab.propTypes = {
  activeIndex: PropTypes.number.isRequired,
  onTabChange: PropTypes.func.isRequired,
};

export default ViewTab;
