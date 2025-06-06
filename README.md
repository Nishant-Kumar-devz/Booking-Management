# Booking Management 📅

A lightweight Node.js SDK for handling time-slot bookings with:

- ✅ Day off configuration
- ✅ Prevention of double bookings
- ✅ Configurable time slots (15 min, 30 min, 1 hour)
- ✅ Admin pagination to fetch all bookings
- ✅ Simple and pluggable with MongoDB

---

## 📦 Installation

```bash
npm install booking-management mongoose
```

---

## 🛠️ Prerequisites

Before using the `booking-management` SDK, ensure you have an active **MongoDB connection** established using Mongoose in your application. The SDK relies on Mongoose's global connection instance.

Example of establishing a Mongoose connection:

```javascript
// In your application's entry file (e.g., app.js or server.js)
import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    // Replace with your actual MongoDB connection string and database name
    await mongoose.connect("mongodb://localhost:27017/your_booking_db");
    console.log("MongoDB Connected Successfully!");
  } catch (error) {
    console.error("MongoDB connection FAILED:", error);
    process.exit(1); // Exit process with failure
  }
};

connectToMongoDB(); // Call this function to establish the connection
```

---

## 🔧 Usage

Once your Mongoose connection is established, you can simply import and initialize the `BookingSDK`. It will automatically use the active Mongoose connection.

```js
import BookingSDK from "booking-management";
// No need to pass mongoose.connection explicitly now!

const booking = new BookingSDK(); // Initialize the SDK

// Set available time (shared across all non-day-off days)
// default available time => start: "09:00", end: "17:00"
await booking.setAvailableTime("09:00", "18:00");

// Set day offs (e.g., ['Sunday', 'Saturday'])
await booking.setDayOffs(["Sunday"]);

// Book a time slot (duration in minutes)
// startTime should be an ISO 8601 string (e.g., "2025-06-06T10:00:00.000Z")
await booking.bookSlot({
  userId: "user123",
  startTime: "2025-06-06T10:00:00.000Z",
  duration: 30,
});

// Get available slots for a day
// date should be a string in "YYYY-MM-DD" format (e.g., "2025-06-06")
const slots = await booking.getAvailableSlots("2025-06-06");

// Get all bookings with pagination (page number, limit per page)
const allBookings = await booking.getAllBookings(1, 10);
```

---

## 🧩 Features Roadmap

- [x] Day off management
- [x] Time-range configuration
- [x] Conflict-free booking logic
- [x] Pagination support for admin

---

## 👥 License

MIT © 2025 Nishant-Kumar-devz