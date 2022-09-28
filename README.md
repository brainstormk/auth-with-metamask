# Authorize with MetaMask
This is a demo that can authorize through MetaMask sign when call APIs.
There are 2 packages in this repo: a [`backend`](./packages/backend) which is a REST API written in Express, and a [`frontend`](./packages/frontend) which is a React single-page application. 

## Run modules
Run with yarn
```
yarn install
yarn start:backend
yarn start:frontend
```
The backend should be running on localhost:5000, and the frontend on localhost:3000.

To allow site from CORS in backend, you can edit whitelist as following:
```
const whitelist = [
  "http://localhost:3000",
];
```
