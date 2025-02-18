function searchAvailableRooms(rooms, date) {
    return rooms.filter(room => room.availableDates.includes(date));
}

function bookRoom(rooms, roomId, date) {
    const room = rooms.find(r => r.id === roomId);
    if (room && room.availableDates.includes(date)) {
        return { success: true, message: `Booking confirmed for room ${room.name} on ${date}` };
    }
    return { success: false, message: "Room not available on this date" };
}

module.exports = { searchAvailableRooms, bookRoom };
