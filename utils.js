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

export function generateAvailableSlots(
  dateString,
  { start: availabilityStartStr, end: availabilityEndStr }
) {
  const [availStartH, availStartM] = availabilityStartStr
    .split(":")
    .map(Number);
  const [availEndH, availEndM] = availabilityEndStr.split(":").map(Number);

  const slots = [];
  const minDuration = 15;

  const dateParts = dateString.split("-").map(Number);
  const year = dateParts[0];
  const month = dateParts[1] - 1;
  const day = dateParts[2];

  let currentUTC = new Date(
    Date.UTC(year, month, day, availStartH, availStartM, 0, 0)
  );
  const endTimeUTC = new Date(
    Date.UTC(year, month, day, availEndH, availEndM, 0, 0)
  );

  while (currentUTC < endTimeUTC) {
    const nextUTC = new Date(currentUTC.getTime() + minDuration * 60000);
    if (nextUTC > endTimeUTC) {
      break;
    }
    slots.push({ start: new Date(currentUTC), end: new Date(nextUTC) });
    currentUTC = nextUTC;
  }
  return slots;
}
