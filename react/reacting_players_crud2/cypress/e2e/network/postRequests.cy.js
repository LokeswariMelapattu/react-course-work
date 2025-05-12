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

describe("Requests: POST", () => {
  const user = users[0];
  const playersUrl = "**/api/players";

  it("should be able to successfully add a new player to the backend, and then to the list of players", () => {
    cy.visit("/");
    let getPlayers = interceptIndefinitely(playersUrl, players);
    authFormExists(true);
    loginAs(user);
    checkRequestStatus(REQ_STATUS.loading).then(() => {
      getPlayers.sendResponse();
      checkRequestStatus(REQ_STATUS.success);
      authFormExists(false);
      // Check that the add form exists with an id of submit-player
      cy.get("#submit-player").should("exist");
      const newPlayer = { name: "New Player", id: 1, isActive: true };
      // find the input-player element and type in a name
      cy.get("#input-player").type(newPlayer.name);
      // Expect the input to have the value we typed
      cy.get("#input-player").should("have.value", newPlayer.name);

      const postPlayer = interceptIndefinitely(playersUrl, {
        body: { ...newPlayer },
        statusCode: 201,
      });
      findAndClickButton("add");
      cy.get("#input-player").should("have.value", "");
      checkRequestStatus(REQ_STATUS.loading).then(() => {
        postPlayer.sendResponse();
        checkRequestStatus(REQ_STATUS.success);
        // Expect the new player to be in the list
        cy.get("#players-list li").should("have.length", players.length + 1);
        cy.get("#players-list li")
          .eq(players.length)
          .should("contain", newPlayer.name);
      });
    });
  });

  it("should not be able to add a new player if post-request fails", () => {
    let getPlayers = interceptIndefinitely(playersUrl, players);
    const newPlayer = { name: "New Player", id: 1, isActive: true };

    cy.visit("/");

    authFormExists(true);
    loginAs(user);
    checkRequestStatus(REQ_STATUS.loading).then(() => {
      getPlayers.sendResponse();
      checkRequestStatus(REQ_STATUS.success);
      authFormExists(false);
      // find the input-player element and type in a name
      cy.get("#input-player").type(newPlayer.name);
      // Expect the input to have the value we typed
      cy.get("#input-player").should("have.value", newPlayer.name);
      // Click the add button
      // Expect the input to be empty
      const postError = interceptIndefinitely(playersUrl, {
        forceNetworkError: true,
      });
      findAndClickButton("add");
      cy.get("#input-player").should("have.value", "");
      checkRequestStatus(REQ_STATUS.loading).then(() => {
        postError.sendResponse();
        checkRequestStatus(REQ_STATUS.error);
        // Expect the new player not to be in the list
        cy.get("#players-list li").should("have.length", players.length);
        // check new players name is not in the list
        cy.get("#players-list li").should("not.contain", newPlayer.name);
      });
    });
  });
});
