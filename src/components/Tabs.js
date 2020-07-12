import React, { Component } from "react";
import PropTypes from "prop-types";

export class Tabs extends Component {
  changeTab = (event, index) => {
    event.preventDefault();

    this.props.onTabChange(index);
  };

  render() {
    const { activeIndex, children } = this.props;

    return (
      <ul className="nav nav-tabs nav-fill my-2">
        {React.Children.map(children, (child, index) => {
          const activeClassName =
            activeIndex === index ? "nav-link active" : "nav-link";
          return (
            <li className="nav-item" key={index}>
              <a
                href="/#"
                className={activeClassName}
                onClick={(event) => this.changeTab(event, index)}
              >
                {child}
              </a>
            </li>
          );
        })}
      </ul>
    );
  }
}

Tabs.propTypes = {
  activeIndex: PropTypes.number.isRequired,
  onTabChange: PropTypes.func.isRequired,
};

export const Tab = ({ children }) => {
  return <>{children}</>;
};
