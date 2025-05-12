/** @format */

import { http, HttpResponse } from "msw";
import { players } from "./players";

export const handlers = [
  http.get("**/api/players", () => {
    return HttpResponse.json(
      players.map((player) => ({ id: player.id, name: player.name }))
    );
    // return res(
    //   ctx.json(players.map((player) => ({ id: player.id, name: player.name })))
    // );
  }),

  http.get("**/api/players/:playerId", ({ params, request }) => {
    const { playerId } = params;
    if (/\D/.test(playerId)) {
      return HttpResponse.error();
    }

    const player = players.find((pl) => pl.id === Number.parseInt(playerId));
    if (!player) {
      return HttpResponse.error();
    }
    return HttpResponse.json({ ...player });
  }),

  http.delete("**/api/players/:playerId", ({ params, request }) => {
    const { playerId } = params;
    if (/\D/.test(playerId)) {
      return HttpResponse.error();
    }
    const player = players.find((pl) => pl.id === Number.parseInt(playerId));
    if (!player) {
      return HttpResponse.error();
    }
    return HttpResponse.json({ ...player });
  }),

  http.post("**/api/players", async ({ params, request }) => {
    const newPlayerDetails = await request.json();
    return HttpResponse.json({ ...newPlayerDetails, id: players.length + 1 });
  }),

  http.put("**/api/players/:playerId", async ({ params, request }) => {
    const updatedPlayerDetails = await request.json();
    const { playerId } = params;
    if (/\D/.test(playerId)) {
      return HttpResponse.error();
    }

    const player = players.find((pl) => pl.id === Number.parseInt(playerId));
    if (!player) {
      return HttpResponse.error();
    }
    return HttpResponse.json({ ...updatedPlayerDetails });
  }),
];
