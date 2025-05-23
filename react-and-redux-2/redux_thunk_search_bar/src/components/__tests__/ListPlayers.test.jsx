/** @format */

import { render, screen } from "@testing-library/react";
import { ListPlayers } from "../ListPlayers.jsx";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import { Provider } from "react-redux";
import { afterEach, beforeEach, describe, expect, it, test } from "vitest";

describe("ListPlayers", () => {
  const players = [
    { id: 1, name: "Test Player 1" },
    { id: 2, name: "Test Player 2" },
    { id: 3, name: "Test Player 3" },
  ];

  let mockStore;
  let component;

  beforeEach(() => {
    // Set up mock store with thunk middleware
    mockStore = configureMockStore([thunk]);
    const store = mockStore({
      players: {
        players,
        filteredPlayers: players, // Ensure initial state is correct
      },
    });

    component = render(
      <Provider store={store}>
        <ListPlayers />
      </Provider>
    );
  });

  afterEach(() => {
    component.unmount();
  });

  test('renders a list with id "players-list"', () => {
    // get the container
    const list = component.container.querySelector("#players-list");
    expect(list).not.toBeNull();
  });

  test("renders a ListPlayer for each player in the players prop", () => {
    const listPlayers = screen.getAllByRole("listitem");
    expect(listPlayers).toHaveLength(players.length);
  });
});
