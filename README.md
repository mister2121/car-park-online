# Car Parking App Online

Car Park Online is a full-stack web application, where users are able to search and book parking spaces or list their own parkings on the website.

## Technologies

- HTML, CSS, JS
- React.js
- Node.js
- Express.js
- MongoDB
- Google Maps API

## Screenshots

<p>
  <a href="https://imgur.com/j4AFtYq"><img src="https://imgur.com/j4AFtYq" alt="Photo of home section" border="0"></a>
</p>

## Prerequisites

Before running the application, make sure you have the following installed:

- Node.js
- MongoDB or MongoDB Atlas account

## Installation

1. Clone the repository

```bash
git clone https://github.com/mister2121/car-park-online.git
```

2. Go to the project directory and install dependencies for both the client and server

```bash
cd client
npm install
```

```bash
cd server
npm install
```

3. Rename the `.env_example` file in both the `client` and `server` directories to `.env` and add your API keys.

- Client:

```bash
REACT_APP_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY_HERE
```

- Server:

```bash
MONGO_URL=YOUR_MONGODB_API_KEY_HERE
JWT_SECRET=YOUR_SECRET_KEY_HERE
```

4. Start the server

```bash
cd server
node index.js
```

5. Start the client

```bash
cd client
npm start
```
