import { searchAvailableRooms, bookRoom } from "../src/booking.js"

describe("Hotel Booking System", () => {
    let rooms;

    beforeEach(() => {
        rooms = [
            { id: 1, name: "Deluxe", availableDates: ["2025-03-01", "2025-03-02"] },
            { id: 2, name: "Suite", availableDates: ["2025-03-02", "2025-03-03"] },
        ];
    });

    test("Dovrebbe restituire solamente le camere disponibli per le date selezionate", () => {
        const result = searchAvailableRooms(rooms, "2025-03-01");
        expect(result).toEqual([{ id: 1, name: "Deluxe", availableDates: ["2025-03-01", "2025-03-02"] }]);
    });

    test("Dovrebbe confermare la prenotazione se la camera è disponibile", () => {
        const bookingResult = bookRoom(rooms, 1, "2025-03-01");
        expect(bookingResult.success).toBe(true);
        expect(bookingResult.message).toBe("Prenotazione confermata per la camera Deluxe per il 2025-03-01");
    });
});

