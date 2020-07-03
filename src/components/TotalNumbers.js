import React from "react";
import PropTypes from "prop-types";

const TotalNumbers = ({ totalIncome, totalOutcome }) => (
  <p>
    <span className="mr-3">收入: {totalIncome}</span>
    <span className="mr-3">支出: {totalOutcome}</span>
  </p>
);

TotalNumbers.propTypes = {
  totalIncome: PropTypes.number.isRequired,
  totalOutcome: PropTypes.number.isRequired,
};

export default TotalNumbers;
