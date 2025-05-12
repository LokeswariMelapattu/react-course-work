<!-- @format -->

# Instructions

## Starting server backend

The backend for all the exercises is located inside the the directory `backend`
at the root of the repository.

1. Setup/install backend

   - **this stage needs to be performed only once**
   - **you can skip this stage if the backend is already installed**
   - change working directory to `backend`
   - inside `backend` directory run `npm install`

2. Starting the backend server

   - change working directory to `backend`
   - inside `backend` directory run `npm run react-fetch`
   - server listens on http://localhost:3001/

3. Stopping the backend server
   - press <`Ctrl-C`> while the server is running

### Resetting database back to its initial state

1. change working directory to `backend`
2. inside `backend` directory run `npm run reset-db`

## Setup the exercise

- change working directory to `react/players_fetch`
- run `npm install` to install all dependencies

## Run the exercise

- run `npm run frontend` to run the frontend in port 5500 and run it in watch mode.

## Test

### Unit tests

- run `npm run test:unit` to run the unit tests in watch mode.
- run `npm run test:unit -- test-file.js` to run the unit tests for a specific file in watch mode. Example: to run tests for RequestStatus.jsx: `npm run test:unit -- RequestStatus.test.jsx`

### E2E tests

- run `npm run test:e2e` to run the e2e tests in the terminal.
- If you want to run the e2e tests in the browser, run `npm run test:e2e:dev` and then open Cypress from the browser. There you can select the test file you want to run.
