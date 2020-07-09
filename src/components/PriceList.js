import React from "react";
import { Link } from "@reach/router";
import Ionicon from "react-ionicons";
import PropTypes from "prop-types";

const PriceList = ({ items, onDeleteItem }) => (
  <ul className="list-group list-group-flush">
    {items.map((item) => (
      <li
        className="list-group-item d-flex justify-content-between align-items-center"
        key={item.id}
      >
        <span className="col-1 badge badge-primary">
          <Ionicon
            className="rounded-circle"
            fontSize="30px"
            style={{ backgroundColor: "#007bff", padding: "5px" }}
            color="#fff"
            icon={item.category.iconName}
          />
        </span>
        <span className="col-2">{item.title}</span>
        <span className="col-5 font-weight-bold">
          {item.category.type === "income" ? "+" : "-"}
          {item.price} 元
        </span>
        <span className="col-2">{item.date}</span>
        <Link to={`edit/${item.id}`} className="col-1">
          <Ionicon
            className="rounded-circle"
            fontSize="30px"
            style={{ backgroundColor: "#28a745", padding: "5px" }}
            color="#fff"
            icon="ios-create-outline"
          />
        </Link>
        <a className="col-1" onClick={() => onDeleteItem(item)}>
          <Ionicon
            className="rounded-circle"
            fontSize="30px"
            style={{ backgroundColor: "#dc3545", padding: "5px" }}
            color="#fff"
            icon="ios-trash-outline"
          />
        </a>
      </li>
    ))}
  </ul>
);

PriceList.propTypes = {
  items: PropTypes.array.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
};

PriceList.defaultProps = {
  onDeleteItem: (item) => alert("I'm default!"),
};

export default PriceList;
