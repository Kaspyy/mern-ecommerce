# ForeShop
ForeShop is an online e-commerce electronics shop built with MERN stack using TypeScript.

## Installation
### This project requires [pnpm](https://github.com/pnpm/pnpm)

In `backend` folder fill `.env` file with your credentials
```sh
NODE_ENV = development
PORT = 5000
MONGO_URI = <mongo_uri>
JWT_SECRET = <password>
PAYPAL_CLIENT_ID = <paypal_client_id>
```
Then run
```sh
pnpm install
pnpm run build
```
Run server with 
```sh
pnpm run dev
```
In order to start client server, in `frontend` folder run
```sh
pnpm install
pnpm run dev
```

## Technologies
- [React](https://github.com/facebook/react)
- [React Helmet](https://github.com/nfl/react-helmet)
- [React Bootstrap](https://github.com/react-bootstrap/react-bootstrap)
- [Redux](https://github.com/reduxjs/redux)
- [PayPal](https://developer.paypal.com/home)
- [TypeScript](https://github.com/microsoft/TypeScript)
- [Express.js](https://github.com/expressjs/express)
- [Node.js](https://github.com/nodejs/node)
- [MongoDB](https://github.com/mongodb/mongo)
- [JWT](https://github.com/auth0/node-jsonwebtoken)
