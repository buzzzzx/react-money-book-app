import React from "react";
import PropsType from "prop-types";

const TotalNumbers = ({ totalIncome, totalOutcome }) => (
  <p>
    <span className="mr-3">收入: {totalIncome}</span>
    <span className="mr-3">支出: {totalOutcome}</span>
  </p>
);

TotalNumbers.propTypes = {
  totalIncome: PropsType.number.isRequired,
  totalOutcome: PropsType.number.isRequired,
};

export default TotalNumbers;
