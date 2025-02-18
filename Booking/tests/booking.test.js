import { searchAvailableRooms, bookRoom } from "../src/booking.js"

describe("Hotel Booking System", () => {
    let rooms;

    beforeEach(() => {
        rooms = [
            { id: 1, name: "Deluxe", availableDates: ["2025-03-01", "2025-03-02"] },
            { id: 2, name: "Suite", availableDates: ["2025-03-02", "2025-03-03"] },
        ];
    });

    test("should return only available rooms for the given date", () => {
        const result = searchAvailableRooms(rooms, "2025-03-01");
        expect(result).toEqual([{ id: 1, name: "Deluxe", availableDates: ["2025-03-01", "2025-03-02"] }]);
    });

    test("should confirm booking if room is available", () => {
        const bookingResult = bookRoom(rooms, 1, "2025-03-01");
        expect(bookingResult.success).toBe(true);
        expect(bookingResult.message).toBe("Booking confirmed for room Deluxe on 2025-03-01");
    });
});

