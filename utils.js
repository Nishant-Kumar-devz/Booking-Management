export function isTimeWithinRange(
  bookingStartTime,
  bookingEndTime,
  { start: availabilityStartStr, end: availabilityEndStr }
) {
  const [availStartH, availStartM] = availabilityStartStr
    .split(":")
    .map(Number);
  const [availEndH, availEndM] = availabilityEndStr.split(":").map(Number);

  const bookingDate = new Date(bookingStartTime);
  const year = bookingDate.getUTCFullYear();
  const month = bookingDate.getUTCMonth();
  const day = bookingDate.getUTCDate();
  const availableStartUTC = new Date(
    Date.UTC(year, month, day, availStartH, availStartM, 0, 0)
  );
  const availableEndUTC = new Date(
    Date.UTC(year, month, day, availEndH, availEndM, 0, 0)
  );
  const bookingStartDateTime = new Date(bookingStartTime);
  const bookingEndDateTime = new Date(bookingEndTime);
  const isStartWithin = bookingStartDateTime >= availableStartUTC;
  const isEndWithin = bookingEndDateTime <= availableEndUTC;

  return isStartWithin && isEndWithin;
}

export function generateAvailableSlots(date, { start, end }) {
  const startParts = start.split(":").map(Number);
  const endParts = end.split(":").map(Number);

  const slots = [];
  const minDuration = 15;

  let current = new Date(date);
  current.setHours(startParts[0], startParts[1], 0, 0);

  const endTime = new Date(date);
  endTime.setHours(endParts[0], endParts[1], 0, 0);

  while (current < endTime) {
    const next = new Date(current.getTime() + minDuration * 60000);
    if (next > endTime) break;
    slots.push({ start: new Date(current), end: new Date(next) });
    current = next;
  }

  return slots;
}