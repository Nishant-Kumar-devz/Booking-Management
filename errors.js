class BookingSDKError extends Error {
  constructor(message, options = {}) {
    super(message);
    this.name = "BookingSDKError"; // Set a specific name for easier identification
    this.success = false; // Add your custom field
    this.statusCode = options.statusCode || 500; // Optional: add a status code
    // You can add more custom fields here if needed
  }
}

export { BookingSDKError };