"use client";
import { useState } from "react";

export default function HomePage() {
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [rooms, setRooms] = useState(1);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // nanti diarahkan ke halaman hotels dengan query
    console.log({ location, checkIn, checkOut, guests, rooms });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Cari Hotel</h1>
      <form
        onSubmit={handleSearch}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-2xl space-y-4"
      >
        {/* Lokasi */}
        <div>
          <label className="block font-medium mb-1">Lokasi / Hotel</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Masukkan lokasi atau nama hotel"
            className="w-full border rounded-lg p-2"
          />
        </div>

        {/* Tanggal */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Check-In</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full border rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Check-Out</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full border rounded-lg p-2"
            />
          </div>
        </div>

        {/* Jumlah Tamu */}
        <div>
          <label className="block font-medium mb-1">Tamu</label>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setGuests((prev) => Math.max(1, prev - 1))}
              className="px-3 py-1 bg-gray-200 rounded-lg"
            >
              ➖
            </button>
            <span className="text-lg font-semibold">{guests}</span>
            <button
              type="button"
              onClick={() => setGuests((prev) => prev + 1)}
              className="px-3 py-1 bg-gray-200 rounded-lg"
            >
              ➕
            </button>
          </div>
        </div>

        {/* Jumlah Kamar */}
        <div>
          <label className="block font-medium mb-1">Kamar</label>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setRooms((prev) => Math.max(1, prev - 1))}
              className="px-3 py-1 bg-gray-200 rounded-lg"
            >
              ➖
            </button>
            <span className="text-lg font-semibold">{rooms}</span>
            <button
              type="button"
              onClick={() => setRooms((prev) => prev + 1)}
              className="px-3 py-1 bg-gray-200 rounded-lg"
            >
              ➕
            </button>
          </div>
        </div>

        {/* Tombol Cari */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700"
        >
          Cari Hotel
        </button>
      </form>
    </div>
  );
}
