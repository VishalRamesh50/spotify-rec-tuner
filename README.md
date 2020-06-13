# Spotify Recommendation Tuner

A simple site to visually interact with the recommendations Spotify provides and
change certain attributes to see how it affects the recommendations for your
account. From there you can play/pause and add/remove songs to/from your
library.

# Getting Started

## Frontend React Web Application

1. Enter the client directory which houses the code for the frontend React app

```sh
cd client
```

2. Copy the `.example.env` file as your `.env` file

```sh
cp .env.example .env
```

3. Replace the `REACT_APP_HOST` with the host which the express server will run
   on. Most likely `http://localhost:3001`

4. Install dependencies

```sh
npm install
```

5. Start the application!

```sh
npm start
```

The site will automatically open on your default browser and start running at `localhost:3000`

## Backend Node Server

1. Enter the server directory which houses the code for the backend express app

```sh
cd server
```

2. Copy the `.example.env` file as your `.env` file

```sh
cp .env.example .env
```

3. Get the `CLIENT_ID` and `CLIENT_SECRET` for your Spotify Application.

   - Go to https://developer.spotify.com/dashboard/ and login.
   - Create an app.
   - Copy and paste the `Client ID` and replace `YOUR_SPOTIFY_APP_CLIENT_ID` with it.
   - Click "Show Client Secret" to reveal the Client Secret and replace `YOUR_CLIENT_SECRET` with that value.

4. Get the `REDIRECT_URI`

    - Give the `REDIRECT_URI` the value of the domain the express app will run on + "/callback". So if the express app lives at `localhost:3001` the `REDIRECT_URI` would be `http://localhost:3001/callback`
    - In the Spotify Dashboard click "Edit Settings"
    - Enter your Redirect URI in the Redirect URIs input box and click "ADD"
    - Scroll down and click Save

5. Replace the value of the `FRONTEND_HOST` with the location at which the frontend app runs from. Most likely `http://localhost:3000`.

6. Install dependencies

```sh
npm install
```

5. Start the application!

```sh
npm serve
```

It will be running at `localhost:3001`

_Note: `localhost` can be replaced with your IP address in both the frontend and backend and they should still work if you want to try running it from your phone as well. Make sure you update all references to it._
