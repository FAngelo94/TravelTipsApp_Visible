import React from "react";
import Header from "../header";
import { Modals } from "../";

function Page({
  props,
  children,
  enableHeader = true,
  title = "TravelTips",
  enableBottom = false,
}) {

  return (
    <div
      className={`container w-100 overflow-auto ${enableHeader && "pt-6"} ${
        enableBottom && "pb-6"
      }`}
    >
      {enableHeader && <Header {...props} title={title} />}
      <Modals.AlertServerModal />
      <Modals.RedirectToLoginModal props={props} />
      {children}
    </div>
  );
}

export default Page;
