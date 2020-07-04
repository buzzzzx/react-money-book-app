import React from "react";
import PropTypes from "prop-types";

const TotalPrice = ({ totalIncome, totalOutcome }) => (
  <div className="row my-4">
    <div className="col">
      收入: <span className="font-weight-bold income">{totalIncome}</span>
    </div>
    <div className="col">
      支出: <span className="font-weight-bold outcome">{totalOutcome}</span>
    </div>
  </div>
);

TotalPrice.propTypes = {
  totalIncome: PropTypes.number.isRequired,
  totalOutcome: PropTypes.number.isRequired,
};

export default TotalPrice;
