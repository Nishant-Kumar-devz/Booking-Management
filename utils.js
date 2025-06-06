export function isTimeWithinRange(start, end, { start: aStart, end: aEnd }) {
  const [startH, startM] = aStart.split(':').map(Number);
  const [endH, endM] = aEnd.split(':').map(Number);

  const availableStart = new Date(start);
  availableStart.setHours(startH, startM, 0, 0);
  const availableEnd = new Date(end);
  availableEnd.setHours(endH, endM, 0, 0);

  return start >= availableStart && end <= availableEnd;
}

export function generateAvailableSlots(date, { start, end }) {
  const startParts = start.split(':').map(Number);
  const endParts = end.split(':').map(Number);

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