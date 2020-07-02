import React from "react";

const PriceList = ({ items, onModifyItem, onDeleteItem }) => (
  <ul className="list-group list-group-flush">
    {items.map((item) => (
      <li
        className="list-group-item d-flex justify-content-between align-items-center"
        key={item.id}
      >
        <span className="col-1 badge badge-primary">{item.category.name}</span>
        <span className="col-2">{item.title}</span>
        <span className="col-5 font-weight-bold">
          {item.category.type === "income" ? "+" : "-"}
          {item.price}
        </span>
        <span className="col-2">{item.date}</span>
        <button className="btn btn-primary" onClick={() => onModifyItem(item)}>
          编辑
        </button>
        <button className="btn btn-danger" onClick={() => onDeleteItem(item)}>
          删除
        </button>
      </li>
    ))}
  </ul>
);

export default PriceList;
