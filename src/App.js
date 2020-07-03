import React from "react";
import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import PriceList from "./components/PriceList";

const items = [
  {
    id: 0,
    category: {
      id: 0,
      name: "旅游",
      type: "outcome",
      iconName: "ios-plane-outline",
    },
    title: "去南京旅游",
    price: 2000,
    date: "2020-05-17",
  },
  {
    id: 1,
    category: {
      id: 1,
      name: "购物",
      type: "outcome",
      iconName: "ios-card-outline",
    },
    title: "购买 MX Master3",
    price: 899,
    date: "2020-06-30",
  },
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <PriceList
        items={items}
        onModifyItem={(item) => alert(item.id)}
        onDeleteItem={(item) => alert(item.id)}
      />
    </div>
  );
}

export default App;
