export const LIST_VIEW = "list";
export const CHART_VIEW = "chart";
export const TYPE_INCOME = "income";
export const TYPE_OUTCOME = "outcome";

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
