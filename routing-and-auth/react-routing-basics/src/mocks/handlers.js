import { http } from "msw";

export const handlers = [
  http.get("http://localhost:3001/api/players", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: 1, name: "Player One", position: "Forward", team: "Team A" },
        { id: 2, name: "Player Two", position: "Midfielder", team: "Team B" },
      ])
    );
  }),
];
