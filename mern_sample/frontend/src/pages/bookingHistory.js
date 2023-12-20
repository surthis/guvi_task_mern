import React, { useState } from 'react';

function BookingHistory() {
  const [bookingHistory] = useState([]); // Removed unused setBookingHistory

  // In a real application, you would likely fetch the booking history data from a server.

  return (
    <div>
      <h2>Booking History</h2>
      {bookingHistory.length > 0 ? (
        <ul>
          {bookingHistory.map((booking, index) => (
            <li key={index}>
              <strong>Booking Date:</strong> {booking.bookingDate}<br />
              <strong>Services:</strong> {booking.services.join(', ')}
            </li>
          ))}
        </ul>
      ) : (
        <p>No booking history available.</p>
      )}
    </div>
  );
}

export default BookingHistory;
