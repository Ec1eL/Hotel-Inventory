"use client";
import { useState } from "react";

export default function SearchBar() {
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [openDropdown, setOpenDropdown] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ location, checkIn, checkOut, guests, rooms });
  };

  return (
    <form
      onSubmit={handleSearch}
      className="bg-white p-6 rounded-2xl shadow-md w-full max-w-2xl space-y-4 relative"
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

      {/* Tamu & Kamar (Dropdown) */}
      <div>
        <label className="block font-medium mb-1">Tamu & Kamar</label>
        <div
          onClick={() => setOpenDropdown(!openDropdown)}
          className="border rounded-lg p-2 cursor-pointer bg-gray-50 hover:bg-gray-100"
        >
          {guests} Tamu, {rooms} Kamar
        </div>

        {openDropdown && (
          <div className="absolute bg-white border rounded-lg shadow-md mt-2 p-4 w-64 z-10">
            {/* Tamu */}
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium">Tamu</span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setGuests((prev) => Math.max(1, prev - 1))}
                  className="px-3 py-1 bg-gray-200 rounded-lg"
                >
                  ➖
                </button>
                <span>{guests}</span>
                <button
                  type="button"
                  onClick={() => setGuests((prev) => prev + 1)}
                  className="px-3 py-1 bg-gray-200 rounded-lg"
                >
                  ➕
                </button>
              </div>
            </div>

            {/* Kamar */}
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium">Kamar</span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setRooms((prev) => Math.max(1, prev - 1))}
                  className="px-3 py-1 bg-gray-200 rounded-lg"
                >
                  ➖
                </button>
                <span>{rooms}</span>
                <button
                  type="button"
                  onClick={() => setRooms((prev) => prev + 1)}
                  className="px-3 py-1 bg-gray-200 rounded-lg"
                >
                  ➕
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOpenDropdown(false)}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700"
            >
              Selesai
            </button>
          </div>
        )}
      </div>

      {/* Tombol Cari */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700"
      >
        Cari Hotel
      </button>
    </form>
  );
}
