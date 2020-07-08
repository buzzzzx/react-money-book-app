export const LIST_VIEW = "list";
export const CHART_VIEW = "chart";
export const TYPE_INCOME = "income";
export const TYPE_OUTCOME = "outcome";
export const testItem = {
  title: "buy a phone",
  price: 4000,
  date: "2020-07-07",
};

export const testCategories = [
  {
    id: 0,
    name: "旅游",
    type: "outcome",
    iconName: "ios-plane-outline",
  },
  {
    id: 1,
    name: "购物",
    type: "outcome",
    iconName: "ios-card-outline",
  },
  {
    id: 2,
    name: "医疗",
    type: "outcome",
    iconName: "ios-basket-outline",
  },
  {
    id: 3,
    name: "理财",
    type: "income",
    iconName: "ios-basket-outline",
  },
  {
    id: 4,
    name: "工资",
    type: "income",
    iconName: "ios-plane-outline",
  },
  {
    id: 5,
    name: "交通",
    type: "outcome",
    iconName: "ios-card-outline",
  },
  {
    id: 6,
    name: "收租",
    type: "income",
    iconName: "ios-basket-outline",
  },
  {
    id: 7,
    name: "理财",
    type: "income",
    iconName: "ios-basket-outline",
  },
];
export const padLeft = (num) => {
  return num < 10 ? "0" + num : num;
};

export const range = (size, startAt) => {
  const arr = [];
  for (let i = 0; i < size; i += 1) {
    arr[i] = startAt + i;
  }

  return arr;
};

export const parseToYearAndMonth = (str) => {
  const date = str ? new Date(str) : new Date();
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
  };
};
