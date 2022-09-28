# Authorize with MetaMask
This is a demo that can authorize through MetaMask sign when call APIs.
There are 2 packages in this repo: a [`backend`](./packages/backend) which is a REST API written in Express, and a [`frontend`](./packages/frontend) which is a React single-page application. 

## Backend
run:
```
yarn start:backend
```

To allow domain from CORS, you can edit whitelist as following:
```
const whitelist = [
  "http://localhost:3000",
  "http://localhost:3002",
];
```