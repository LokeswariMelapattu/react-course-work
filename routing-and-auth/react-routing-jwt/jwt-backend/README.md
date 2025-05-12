## Installation

```
npm install
```

## Reset Database

Database starts out empty but initial set of users and products can be saved
to the database with the following command:

```
npm run reset-db
```

Database is saved to `db/db.json` and it can be reset again with the above command.
If you want to start with empty database just delete the file `db/db.json`

## Running server

```
npm start
```

You can define a different port inside `nodemon.json`
file.

## API documentation

API documentation can can be viewed in the address http://localhost:3001/docs/

The documentation can be found in the file `public/docs/index.html`

Server uses JWT tokens for user authentication and expects the token to be
delivered inside the `Authorization` request header.

`Authorization: Bearer <token>`

A token can be received via login at http://localhost:3000/api/login (See API documentation)

## Tests

Tests can be run with:

```
npm test
```

## Project file hierarchy

```
.
├── README.md
├── app.mjs
├── controllers
│   ├── order.mjs
│   ├── product.mjs
│   └── user.mjs
├── db
│   ├── db.mjs
│   ├── reset
│   │   ├── products.json
│   │   └── users.json
│   └── reset-db.mjs
├── index.mjs
├── middleware
│   ├── auth.mjs
│   └── requireJson.mjs
├── models
│   ├── base.mjs
│   ├── order.mjs
│   ├── product.mjs
│   ├── schemas
│   │   ├── id.mjs
│   │   ├── order.mjs
│   │   ├── product.mjs
│   │   └── user.mjs
│   └── user.mjs
├── nodemon.json
├── package-lock.json
├── package.json
├── public
│   └── docs
│       └── index.html
├── router.mjs
├── routes
│   └── api.mjs
└── test
    ├── fixtures.mjs
    ├── hooks.mjs
    └── routes.test.mjs
```
