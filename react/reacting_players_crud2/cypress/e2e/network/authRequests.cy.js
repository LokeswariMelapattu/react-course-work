/** @format */

import players from "../../fixtures/players.json";
import users from "../../fixtures/users.json";
import {
  interceptIndefinitely,
  checkRequestStatus,
  findAndClickButton,
  authFormExists,
  loginAs,
  checkPlayerInList,
} from "../../support/utils";
import { REQ_STATUS } from "../constants";

describe("Requests: REGISTER", () => {
  const user = users[0];
  const playersUrl = "**/api/players";

  it("should be able to succesfully complete the registration process", () => {
    // add text to inform the user that the test is running
    cy.visit("/");

    // check that an anchor tag with the word register exists
    cy.get("a").contains("register").should("exist");
    // click the register link
    cy.get("a").contains("register").click();

    authFormExists(true);
    let getPlayers = interceptIndefinitely(playersUrl, players);
    const postUser = interceptIndefinitely("**/api/users", {
      body: user,
      statusCode: 201,
    });
    // find the element with id username
    cy.get("#username").type(user.username);
    // find the element with id password
    cy.get("#password").type(user.password);
    // submit the form
    cy.get("#auth-form").submit();

    checkRequestStatus(REQ_STATUS.loading).then(() => {
      postUser.sendResponse();
      checkRequestStatus(REQ_STATUS.loading).then(() => {
        getPlayers.sendResponse();
        checkRequestStatus(REQ_STATUS.success);
        authFormExists(false);
      });
    });
  });
  it("should not be able to register if post-request fails", () => {
    cy.visit("/");
    // check that an anchor tag with the word register exists
    cy.get("a").contains("register").should("exist");
    // click the register link
    cy.get("a").contains("register").click();

    authFormExists(true);
    // find the element with id username
    cy.get("#username").type(user.username);
    // find the element with id password
    cy.get("#password").type(user.password);
    // submit the form
    const postError = interceptIndefinitely("**/api/users", {
      forceNetworkError: true,
    });
    cy.get("#auth-form").submit();
    checkRequestStatus(REQ_STATUS.loading).then(() => {
      postError.sendResponse();
      checkRequestStatus(REQ_STATUS.error);
      authFormExists(true);
    });
  });
});
