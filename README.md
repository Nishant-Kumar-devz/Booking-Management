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
npm install booking-management
```

---

## 🔧 Usage

```js
import BookingSDK from "booking-management";
import mongoose from "mongoose";

await mongoose.connect("mongodb://localhost:27017/booking");

const booking = new BookingSDK({ dbConnection: mongoose.connection });

// Set available time (shared across all non-day-off days)
await booking.setAvailableTime("09:00", "18:00");

// Set day offs (e.g., ['Sunday', 'Saturday'])
await booking.setDayOffs(["Sunday"]);

// Book a time slot (duration in minutes)
await booking.bookSlot({
  userId: "user123",
  startTime: "2025-06-06T10:00:00.000Z",
  duration: 30,
});

// Get available slots for a day
const slots = await booking.getAvailableSlots("2025-06-06");

// Get all bookings with pagination (page, limit)
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
