import { beforeAll, afterAll, afterEach, beforeEach } from "vitest";
import { server } from "./mocks/server.js";

beforeAll(() => {
  // Enable the mocking in tests.
  server.listen();
});

afterEach(() => {
  // Reset any runtime handlers tests may use.
  server.resetHandlers();
});

afterAll(() => {
  // Clean up once the tests are done.
  server.close();
});
