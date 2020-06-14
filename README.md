# Spotify Recommendation Tuner

A simple site to visually interact with the recommendations Spotify provides and
change certain attributes to see how it affects the recommendations for your
account. From there you can play/pause and add/remove songs to/from your
library.

# Getting Started

## Setup Environment

1. Copy the `.env.example` file as your `.env` file

```sh
cp .env.example .env
```

2. Replace the `REACT_APP_HOST` with the host which the express server will run
   on. Most likely `http://localhost:3001`

3. Get the `CLIENT_ID` and `CLIENT_SECRET` for your Spotify Application.

   - Go to https://developer.spotify.com/dashboard/ and login.
   - Create an app.
   - Copy and paste the `Client ID` and replace `YOUR_SPOTIFY_APP_CLIENT_ID` with it.
   - Click "Show Client Secret" to reveal the Client Secret and replace `YOUR_SPOTIFY_APP_CLIENT_SECRET` with that value.

4. Get the `REDIRECT_URI`

    - Give the `REDIRECT_URI` the value of the domain the express app will run on + "api/callback". So if the express app lives at `localhost:3001` the `REDIRECT_URI` would be `http://localhost:3001/api/callback`
    - In the Spotify Dashboard click "Edit Settings"
    - Enter your Redirect URI in the Redirect URIs input box and click "ADD"
    - Scroll down and click Save

5. Replace the value of the `FRONTEND_HOST` with the location at which the frontend app runs from. Most likely `http://localhost:3000`.

6. Install dependencies

```sh
npm install
```

_Note: If you want to run this on your phone follow these steps. When [starting the React Application](#frontend-react-web-application) it will tell you which network it's running on. Take that IP address and replace all instances of `localhost` with it in your `.env` file. You'll have to add the new `REDIRECT_URI` in the Spotify Dashboard from step 4 as well. You'll want to hit the site from that host instead of `localhost`._

## Frontend React Web Application

Start the application!

```sh
npm start
```

The site will automatically open on your default browser and start running at `localhost:3000`

## Backend Node Server

Start the application!

```sh
npm run serve
```

It will be running at `localhost:3001`

_These need to be running concurrently. You can leave them running into two separate terminal sessions._
