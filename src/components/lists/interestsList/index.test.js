import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./../../../store";
import InterestsList from "./index";

const interestList = ["calcio","bici"];

window.dic = (id) => id;

test("Test interestsList not editable", () => {
  const domContainer = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <InterestsList editable={false} list={interestList} />
    </Provider>,
    domContainer
  );
  const list = domContainer.querySelectorAll(".badge");
  expect(list.length).toEqual(2)
  const form = domContainer.querySelector("form");
  expect(form).not.toBeTruthy();
  const xButtons = domContainer.querySelectorAll(".badge span")
  expect(xButtons.length).toEqual(0)
});

test("Test interestsList editable", () => {
  const domContainer = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <InterestsList editable={true} list={interestList} />
    </Provider>,
    domContainer
  );
  const list = domContainer.querySelectorAll(".badge");
  expect(list.length).toEqual(2)
  const form = domContainer.querySelector("form");
  expect(form).toBeVisible();
  const xButtons = domContainer.querySelectorAll(".badge span")
  expect(xButtons.length).toEqual(2)
});
