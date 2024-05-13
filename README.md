# Car Parking App Online

Car Park Online is a full-stack web application, where users are able to search and book parking spaces or list their own parkings on the website.

## Table of Contents

  * [Technologies](#technologies)
  * [Screenshots](#screenshots)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)

## Technologies

- HTML, CSS, JS
- React.js
- Node.js
- Express.js
- MongoDB
- Google Maps API

## Screenshots

![homepage](https://github.com/mister2121/car-park-online/assets/124671787/de322a94-2d07-4b73-9ba9-4b7afff4bb66)
![listings](https://github.com/mister2121/car-park-online/assets/124671787/b3560a88-7a93-4c73-9628-bf9db2f7c820)
![singlepage](https://github.com/mister2121/car-park-online/assets/124671787/bca371db-ca79-4028-b80b-8bf230cc6aff)
![pastbookings](https://github.com/mister2121/car-park-online/assets/124671787/309d4746-78d5-4c95-8472-bff904c6a1cf)
![userparkings](https://github.com/mister2121/car-park-online/assets/124671787/667f61b9-0374-4f52-8fa1-f64e45896754)
![newparking](https://github.com/mister2121/car-park-online/assets/124671787/e28186bf-3d24-436d-9245-d6a3da82ddde)
![profilepage](https://github.com/mister2121/car-park-online/assets/124671787/845342ab-9031-4c92-8c3c-a1629f025df2)


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
