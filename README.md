# Leaderboard App

## Running on docker

Run docker compose:

```
docker compose -d up
```

The app is running by default on port `3000`. You can browser swagger API documentation by opening `http://127.0.0.1:3000/swagger`

## Running locally

1. Run database service using the following command:

```console
docker compose up -d postgres
```
2. Install npm dependencies and run the app:

```console
npm i
npm run start
```

The app is running by default on port `3000`. You can browser swagger API documentation by opening `http://127.0.0.1:3000/swagger`

The app runs on NodeJS 20 instead of 14 as specified in the paper.
