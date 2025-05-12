/** @format */

import players from "../../fixtures/players.json";
import { interceptIndefinitely, checkRequestStatus } from "../../support/utils";
import { REQ_STATUS } from "../constants";

describe("Requests: GET", () => {
  const playerIndex = 1;

  it('should render players in a list with id "#players-list"', () => {
    const getPlayers = interceptIndefinitely("**/api/players", players);
    cy.visit("/");
    checkRequestStatus(REQ_STATUS.loading).then(() => {
      getPlayers.sendResponse();
      checkRequestStatus(REQ_STATUS.success);
      cy.get("#players-list")
        .find("li")
        .then((listItems) => {
          expect(listItems.length).to.equal(3);
        });
      players.map((player) => cy.contains("#players-list li", player.name));
    });
  });

  it("should render players as focusable links inside list items", () => {
    const getPlayers = interceptIndefinitely("**/api/players", players);
    cy.visit("/");
    checkRequestStatus(REQ_STATUS.loading).then(() => {
      getPlayers.sendResponse();
      checkRequestStatus(REQ_STATUS.success);
      players.map((player) =>
        cy
          .contains("#players-list li a", player.name)
          .should("have.css", "cursor", "pointer")
      );
    });
  });

  it("should not show player status before a link is clicked", () => {
    const getPlayers = interceptIndefinitely("**/api/players", players);
    cy.visit("/");
    checkRequestStatus(REQ_STATUS.loading).then(() => {
      getPlayers.sendResponse();
      checkRequestStatus(REQ_STATUS.success);

      cy.get("#selected-player").should("not.exist");
    });
  });

  it("should show player status when player link is clicked", () => {
    const getPlayers = interceptIndefinitely("**/api/players", players);
    cy.visit("/");
    checkRequestStatus(REQ_STATUS.loading).then(() => {
      getPlayers.sendResponse();
      checkRequestStatus(REQ_STATUS.success);
      const getPlayer = interceptIndefinitely(
        `**/api/players/${players[playerIndex].id}`,
        players[playerIndex]
      );
      cy.get("#players-list li").eq(playerIndex).find("a").click();
      checkRequestStatus(REQ_STATUS.loading).then(() => {
        getPlayer.sendResponse();
        checkRequestStatus(REQ_STATUS.success);

        cy.get("#selected-player").within(() => {
          cy.get("#player-name").contains(players[playerIndex].name);
          cy.get("#player-status").contains(
            players[playerIndex].isActive ? "active" : "inactive"
          );
        });
      });
    });
  });
});
