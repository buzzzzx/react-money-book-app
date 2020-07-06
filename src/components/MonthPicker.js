import React, { Component, createRef } from "react";
import PropTypes from "prop-types";
import { padLeft, range } from "../utility";

class MonthPicker extends Component {
  state = {
    isOpen: false,
    selectedYear: this.props.year,
    selectedMonth: this.props.month,
  };

  dropdownRef = createRef();

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (this.dropdownRef && !this.dropdownRef.current.contains(event.target)) {
      // means click outside
      this.setState({
        isOpen: false,
      });
    }
  };

  toggleDropdown = (event) => {
    event.preventDefault();
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  selectYear = (event, year) => {
    event.preventDefault();
    this.setState({
      selectedYear: year,
    });
  };

  selectMonth = (event, month) => {
    event.preventDefault();
    this.setState({
      selectedMonth: month,
      isOpen: false,
    });
    this.props.onChange(this.state.selectedYear, month);
  };

  generateActiveClass = (current, target) => {
    return current === target ? "dropdown-item active" : "dropdown-item";
  };

  render() {
    const { isOpen, selectedMonth, selectedYear } = this.state;
    const yearRange = range(9, -4).map((num) => num + 2020);
    const monthRange = range(12, 1);

    return (
      <div
        className="dropdown my-4 month-picker-component"
        ref={this.dropdownRef}
      >
        <span className="mr-2">选择时间</span>
        <button
          className="btn btn-lg btn-secondary dropdown-toggle"
          onClick={this.toggleDropdown}
        >
          {`${selectedYear} 年 ${padLeft(selectedMonth)} 月`}
        </button>
        {isOpen && (
          <div className="dropdown-menu" style={{ display: "block" }}>
            <div className="row">
              <div className="col border-right years-range">
                {yearRange.map((yearNum, index) => (
                  <a
                    href="#"
                    className={this.generateActiveClass(yearNum, selectedYear)}
                    key={index}
                    onClick={(event) => this.selectYear(event, yearNum)}
                  >
                    {yearNum} 年
                  </a>
                ))}
              </div>
              <div className="col months-range">
                {monthRange.map((monthNum, index) => (
                  <a
                    href="#"
                    className={this.generateActiveClass(
                      monthNum,
                      selectedMonth
                    )}
                    key={index}
                    onClick={(event) => this.selectMonth(event, monthNum)}
                  >
                    {padLeft(monthNum)} 月
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

MonthPicker.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default MonthPicker;
