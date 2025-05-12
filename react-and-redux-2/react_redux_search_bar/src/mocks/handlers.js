/** @format */

import { rest, http } from "msw";
import { players } from "./players";

const getAllPlayers = (req, res, ctx) => {
  return res(
    ctx.json(players.map((player) => ({ id: player.id, name: player.name })))
  );
};

const getOnePlayer = (req, res, ctx) => {
  const { playerId } = req.params;
  if (/\D/.test(playerId)) {
    return res(ctx.status(404));
  }

  const player = players.find((pl) => pl.id === Number.parseInt(playerId));
  if (!player) {
    return res(ctx.status(404));
  }

  return res(ctx.json({ ...player }));
};

export const handlers = [
  http.get("**/api/players", getAllPlayers),

  http.get("**/api/players/:playerId", getOnePlayer),
];
