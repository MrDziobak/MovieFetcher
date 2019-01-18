# Movie Fetcher

Heroku app (if is stuck please w8 a little while - it's free heroku plan and after a few minutes the process will be killed so server should start it again): `https://movie-fetcher.herokuapp.com/` (auto redirect to swagger documentation)

## Requirements

- Postgres database engine
- Node 10.11.0

## Setup

1. Get your OMDb API key (http://www.omdbapi.com/apikey.aspx) and save as `API_KEY` system environment (for dev usage in `nodemon.json` file).
2. Setup your database connection string as `DATABASE_URL` in system environment (for dev usage in `nodemon.json` file).
3. Run `npm start`/`yarn start` (reading system environments) or `npm start:dev`/`yarn start:dev` (reading environments from `nodemon.json` file).

The App should be available on `localhost:3000`
