/** @format */

import players from "../../fixtures/players.json";
import users from "../../fixtures/users.json";
import {
  interceptIndefinitely,
  clickListPlayer,
  checkRequestStatus,
  findAndClickButton,
  loginAs,
  checkPlayerInList,
  authFormExists,
} from "../../support/utils";

import { REQ_STATUS } from "../constants";

describe("Requests: DELETE", () => {
  const playerIndex = 1;
  const playerUrl = `**/api/players/${players[playerIndex].id}`;
  const playersUrl = "**/api/players";
  const user = users[0];

  it("should be able to successfully delete a player from the backend", () => {
    cy.visit("/");
    const getPlayers = interceptIndefinitely(playersUrl, players);
    authFormExists(true);
    loginAs(user);
    checkRequestStatus(REQ_STATUS.loading).then(() => {
      getPlayers.sendResponse();
      checkRequestStatus(REQ_STATUS.success);
      authFormExists(false);
      checkPlayerInList(playerIndex);

      const getPlayer = interceptIndefinitely(playerUrl, {
        ...players[playerIndex],
      });

      clickListPlayer(playerIndex);
      checkRequestStatus(REQ_STATUS.loading).then(() => {
        getPlayer.sendResponse();
        checkRequestStatus(REQ_STATUS.success);

        const deletePlayer = interceptIndefinitely(playerUrl, {
          ...players[playerIndex],
        });
        findAndClickButton("delete");
        checkPlayerInList(playerIndex);

        checkRequestStatus(REQ_STATUS.loading).then(() => {
          deletePlayer.sendResponse();
          checkRequestStatus(REQ_STATUS.success);
          // Check that the player is no longer in the list
          cy.get("#players-list").should(
            "not.contain",
            players[playerIndex].name
          );
        });
      });
    });
  });

  it("should not delete player when delete request is unsuccesful", () => {
    cy.visit("/");
    const getPlayers = interceptIndefinitely(playersUrl, players);
    authFormExists(true);
    loginAs(user);
    checkRequestStatus(REQ_STATUS.loading).then(() => {
      getPlayers.sendResponse();
      checkRequestStatus(REQ_STATUS.success);
      authFormExists(false);
      checkPlayerInList(playerIndex);

      const getPlayer = interceptIndefinitely(playerUrl, {
        ...players[playerIndex],
      });
      clickListPlayer(playerIndex);

      checkRequestStatus(REQ_STATUS.loading).then(() => {
        getPlayer.sendResponse();
        checkRequestStatus(REQ_STATUS.success);

        const deleteError = interceptIndefinitely(playerUrl, {
          forceNetworkError: true,
        });
        findAndClickButton("delete");
        checkRequestStatus(REQ_STATUS.loading).then(() => {
          deleteError.sendResponse();
          checkRequestStatus(REQ_STATUS.error);
          checkPlayerInList(playerIndex);
        });
      });
    });
  });
});
