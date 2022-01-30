import ReactDOM from "react-dom";
import CitiesList from "./index";
import { Provider } from "react-redux";
import { store } from "./../../../store";

const listCity = [
  {
    country: "A",
    province: "A",
    city: "A",
  },
  {
    country: "B",
    province: "B",
    city: "B",
  },
];

window.dic = (id) => id;

test("Test citiesList not editable", () => {
  const domContainer = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <CitiesList editable={false} list={listCity} />
    </Provider>,
    domContainer
  );
  const list = domContainer.querySelector(".list-group");
  expect(list).toBeVisible();
  const form = domContainer.querySelector("form");
  expect(form).not.toBeTruthy();
  const xButtons = list.querySelectorAll("span")
  expect(xButtons.length).toEqual(0)
});

test("Test citiesList editable", () => {
  const domContainer = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <CitiesList editable={true} list={listCity} />
    </Provider>,
    domContainer
  );
  const list = domContainer.querySelector(".list-group");
  expect(list).toBeVisible();
  expect(list.children.length).toEqual(2);
  const form = domContainer.querySelector("form");
  expect(form).toBeVisible();
  const xButtons = list.querySelectorAll("span")
  expect(xButtons.length).toEqual(2)
});
