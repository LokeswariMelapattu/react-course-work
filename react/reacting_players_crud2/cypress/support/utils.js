/** @format */

// https://blog.dai.codes/cypress-loading-state-tests/

import players from "../fixtures/players.json";
import users from "../fixtures/users.json";

export function interceptIndefinitely(requestMatcher, response) {
  const expectedUser = users[0];
  let sendResponse = () => {};
  // Create a Promise and capture a reference to its resolve function so that we can resolve it when we want to:
  const trigger = new Promise((resolve) => {
    sendResponse = resolve;
  });

  // Intercept requests to the URL we are loading data from and do not let the response occur until our above Promise is resolved
  cy.intercept(requestMatcher, (request) => {
    return trigger.then(() => {
      if (requestMatcher == "**/api/users") return request.reply(response);

      // Other Requests should contain headers with authorization information
      if (!request.headers.authorization)
        return request.reply({ statusCode: 401, body: "Unauthorized" });

      if (!request.headers.authorization.startsWith("Basic "))
        return request.reply({ statusCode: 401, body: "Unauthorized" });

      const authHeader = request.headers.authorization.split(" ")[1];
      const decodedAuthHeader = atob(authHeader);
      const [username, password] = decodedAuthHeader.split(":");
      if (
        username === expectedUser.username &&
        password === expectedUser.password
      ) {
        return request.reply(response);
      } else {
        return request.reply({ statusCode: 403, body: "Wrong user details" });
      }
    });
  });

  return { sendResponse };
}

export const clickListPlayer = (playerIndex) => {
  cy.get("#players-list li").eq(playerIndex).find("a").click();
};

export const checkCheckbox = () => {
  cy.get("#checkbox-label").click();
};

export const checkRequestStatus = (status) => {
  // let getInterception = interceptIndefinitely(url, { ...players[playerIndex] });

  return cy.get("#request-status").contains(status, { matchCase: false });
};

export const checkboxStatusShouldBe = (keyword) => {
  console.log(cy.get("#checkbox"));
  if (keyword === "checked") {
    cy.get("#checkbox").should("be.checked");
  }
  if (keyword === "unchecked") {
    cy.get("#checkbox").should("not.be.checked");
  }
};

export const updateButtonShouldBe = (keyword) => {
  if (keyword === "enabled") {
    cy.get(".btn-update").should("be.enabled");
  }
  if (keyword === "disabled") {
    cy.get(".btn-update").should("not.be.enabled");
  }
};

export const clickUpdateButton = () => {
  cy.get(".btn-update").click();
};

export const findAndClickButton = (buttonType) => {
  // Find button
  cy.get(".btn-" + buttonType).should("exist");
  // Click button
  cy.get(".btn-" + buttonType).click();
};

export const selectedShouldBe = (name) => {
  cy.get("#selected-player").contains(name);
};

export const loginAs = (user) => {
  // check that the auth form is visible
  cy.get("#username").type(user.username);
  // check that the password field is visible
  cy.get("#password").type(user.password);

  findAndClickButton("auth");
};

export const authFormExists = (existance) => {
  if (existance) {
    cy.get("#auth-form").should("exist");
    cy.get("#username").should("exist");
    cy.get("#password").should("exist");
  } else {
    cy.get("#auth-form").should("not.exist");
    cy.get("#username").should("not.exist");
    cy.get("#password").should("not.exist");
  }
};

export const registerAs = (user) => {
  cy.visit("/");

  const userWithoutPassword = { ...user };
  delete userWithoutPassword.password;
  // check that the auth form is visible
  cy.get("#auth-form").should("be.visible");
  // check that the user name field is visible
  cy.get("#username").should("be.visible");
  cy.get("#username").type(user.username);
  // check that the password field is visible
  cy.get("#password").should("be.visible");
  cy.get("#password").type(user.password);

  cy.intercept("POST", "**/api/auth", userWithoutPassword).as("auth");

  const { sendResponse } = interceptIndefinitely("**/api/players", []);

  findAndClickButton("auth");

  checkRequestStatus("loading").then(() => {
    sendResponse();
    checkRequestStatus("finished");
    // Check that the auth form no longer exists
    cy.get("#auth-form").should("not.exist");
    // check that the user name field is not visible
    cy.get("#username").should("not.exist");
    // check that the password field is not visible
    cy.get("#password").should("not.exist");
  });
};

export const checkPlayerInList = (playerIndex) => {
  cy.get("#players-list").should("contain", players[playerIndex].name);
};
