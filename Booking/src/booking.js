export function searchAvailableRooms(rooms, date) {
    return rooms.filter(room => room.availableDates.includes(date));
}

export function bookRoom(rooms, roomId, date) {
    const room = rooms.find(r => r.id === roomId);
    if (room && room.availableDates.includes(date)) {
        return { success: true, message: `Prenotazione confermata per la camera ${room.name} per il ${date}` };
    }
    return { success: false, message: "Camera non disponibile per questa data" };
}

