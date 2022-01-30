import React from "react";
import { render } from "@testing-library/react";
import { FetchMock } from "@react-mock/fetch";

import { userService } from "./user.service";

const users = {
  status: 200,
  user: {
    cities: [
      {
        city: "string",
        country: "string",
        id: 7,
        province: "string",
      },
    ],
    experiences: 0,
    home: {
      city: "Roma",
      country: "Italia",
      province: "Roma",
    },
    id: 0,
    image: "0.png",
    interests: [
      {
        interest: "arrampicata",
      },
      {
        interest: "bici",
      },
    ],
    itineraries: 0,
    languages: [
      {
        language: " Italiano",
      },
      {
        language: "Arabo",
      },
    ],
    matchings: 0,
    tips: 0,
    username: "FAngelo94",
  },
};

const userData = {
  email: "test@live.it",
  password: "test",
  username: "test",
};

// Set API URL based on environment
window.api_url =
  window.location.origin.indexOf("localhost") >= 0
    ? "http://localhost:5000/api/"
    : "https://fangelo94.pythonanywhere.com/api/";

// Set Image URL based on environment
window.images_url =
  window.location.origin.indexOf("localhost") >= 0
    ? "http://localhost:5000/static/images/"
    : "https://fangelo94.pythonanywhere.com/static/images/";

const languagesText = (array) => {
  let lang = "";
  array.forEach((e) => {
    lang += e.language + ", ";
  });
  return lang.substr(0, lang.length - 2);
};

test(`Test creation and authetication functions for user`, async () => {
  // Create user
  const replyRegister = await userService.register(userData);
  expect(replyRegister.status).toEqual(201);
  // login user
  const replyLogin = await userService.login(userData.email, userData.password);
  expect(replyLogin.status).toEqual(200);
  expect(replyLogin.id).toBeTruthy();
  expect(replyLogin.token).toBeTruthy();
  // loogout user
  const replyLogout = await userService.logout(replyLogin.token);
  expect(replyLogout.status).toEqual(200);
});

test(`Test user add functions`, async () => {
  // login user
  const replyLogin = await userService.login(userData.email, userData.password);
  expect(replyLogin.status).toEqual(200);
  expect(replyLogin.id).toBeTruthy();
  expect(replyLogin.token).toBeTruthy();
  // update home
  const home = {
    city: "Test",
    country: "Test",
    province: "Test",
  };
  const homeReply = await userService.updateHome(replyLogin.token, home);
  expect(homeReply.status).toEqual(200);
  // update languages
  const languages = ["English", "Italian", "Spanish"];
  const languagesReply = await userService.updateLanguages(
    replyLogin.token,
    languages
  );
  expect(languagesReply.status).toEqual(200);
  // add interest
  const interest = "Bike";
  const interestReply = await userService.addInterest(
    replyLogin.token,
    interest
  );
  expect(interestReply.status).toEqual(200);
  // add city
  const city = {
    city: "Test",
    country: "Test",
    province: "Test",
  };
  const cityAddReply = await userService.addLocality(replyLogin.token, city);
  expect(cityAddReply.status).toEqual(200);
  expect(cityAddReply.idLocality).toBeTruthy();
  // get user details
  const getReply = await userService.get(replyLogin.id);
  expect(getReply.status).toEqual(200);
  expect(getReply.user).toBeTruthy();
  expect(getReply.user.home.city).toEqual(home.city);
  expect(getReply.user.home.province).toEqual(home.province);
  expect(getReply.user.home.country).toEqual(home.country);
  expect(languagesText(getReply.user.languages)).toEqual(
    "English, Italian, Spanish"
  );
  expect(getReply.user.interests[0].interest).toEqual(interest);
  expect(getReply.user.localities[0].city).toEqual(city.city);
  expect(getReply.user.localities[0].province).toEqual(city.province);
  expect(getReply.user.localities[0].country).toEqual(city.country);
  // Remove interest
  const interestRemoveReply = await userService.deleteInterest(
    replyLogin.token,
    interest
  );
  expect(interestRemoveReply.status).toEqual(200);
  // Remove city
  const cityRemoveReply = await userService.deleteLocality(replyLogin.token, cityAddReply.idLocality);
  expect(cityRemoveReply.status).toEqual(200);
  // Check city and interest deleted
  const getReply2 = await userService.get(replyLogin.id);
  expect(getReply2.user.interests.length).toEqual(0);
  expect(getReply2.user.localities.length).toEqual(0);
  // logout user
  const replyLogout = await userService.logout(replyLogin.token);
  expect(replyLogout.status).toEqual(200);
});

test(`Delete user`, async () => {
  // login user
  let replyLogin = await userService.login(userData.email, userData.password);
  expect(replyLogin.status).toEqual(200);
  expect(replyLogin.id).toBeTruthy();
  expect(replyLogin.token).toBeTruthy();

  // delete user
  const replyDelete = await userService.delete(replyLogin.token);
  expect(replyDelete.status).toEqual(200);

  // check if user exist
  const replyLogin2 = await userService.login(userData.email, userData.password);
  expect(replyLogin2.status).not.toEqual(200);
});
