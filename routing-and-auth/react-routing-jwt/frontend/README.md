<!-- @format -->

# Instructions

If you choose to do the project with the React frontend, you will need to follow the instructions below.

## Starting server backend

The backend for this exercise is located inside the the directory `routing-and-auth/react-routing-jwt/jwt-backend/`. There is more instructions inside `routing-and-auth/react-routing-jwt/jwt-backend/README.md`


1. Setup/install jwt-backend

   - **this stage needs to be performed only once**
   - **you can skip this stage if the backend is already installed**
   - change working directory to `routing-and-auth/react-routing-jwt/jwt-backend/`
   - inside this directory run `npm install`

2. Starting the jwt-backend server

   - change working directory to `routing-and-auth/react-routing-jwt/jwt-backend`
   - inside this directory run `npm start`
   - server listens on http://localhost:3001/

3. Stopping the jwt-backend server
   - press <`Ctrl-C`> while the server is running

### Resetting database back to its initial state

1. change working directory to `routing-and-auth/react-routing-jwt/jwt-backend`
2. inside this directory run `npm run reset-db` to save initial
   test data (products and users) to the database
   (this replaces database contents with the freshly saved data)

## Setup the exercise

- change working directory to `routing-and-auth/react-routing-jwt/frontend`
- run `npm install` to install all dependencies

## Run the exercise

- run `npm run frontend` to run the frontend. 
- *IMPORTANT* Make note of the port your frontend is running in. Then set the proper CORS header for your frontend port in the jwt-backend file `routing-and-auth/react-routing-jwt/jwt-backend/app.mjs`. Find `const corsOptions` and replace 5500 in `origin: "http://localhost:5500"`with the correct port for your frontend.
 

## Test

- run `npm run test:unit` to run the unit tests.
- no e2e tests this time, maybe next year :-)