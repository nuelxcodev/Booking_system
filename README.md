
## 1. Overview

- `src/app.js`: entry point, routes mount, middleware.
- `src/config/db.js`: MongoDB connection.
- `src/models`: Mongoose schema definitions.
- `src/controller`: business logic (async, centralized error-handling via `next(err)`).
- `src/routes`: API endpoints.
- `src/middlewares/errorhandler.js`: global error formatter.
- `src/seeder.js`: data seeding script.

## 2. Setup

1. `npm install`
2. Add `.env` with:
   - `MONGO_URI` (required)
   - `PORT` (optional, defaults to 5000)
3. `npm run dev` to run app
4. Optional: `npm run seed` to populate sample data

## 3. Seed data

Run:

- `npm run seed`

What it does:

- clears `users`, `rooms`, `bookings`
- inserts sample users and rooms
- creates one confirmed booking and updates room availability

## 4. API

### POST /api/users

Request JSON:

- `name`, `email`, `password` (all required)

Success 201:

- new user payload
- 409 for duplicate email

### POST /api/rooms

Request JSON:

- `name` (required)
- `available` (optional, default true)

Success 201: created room object

### GET /api/rooms

Returns all rooms.

### POST /api/book-room

Request JSON:

- `userId`, `roomId` (required)

Success 201: booking created w/ transaction rollback on failure

### GET /api/bookings

Optional query: `status`

### GET /api/bookings/stats

Returns aggregation by room

### POST /api/upload-image

Form-data body: `image` (file)

Success 200: `{ "url": "/uploads/<filename>" }`

