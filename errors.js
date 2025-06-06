class BookingSDKError extends Error {
  constructor(message, options = {}) {
    super(message);
    this.name = "BookingSDKError";
    this.success = false;
    this.message = message;
  }
}

export { BookingSDKError };