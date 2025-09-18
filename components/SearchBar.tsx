// components/SearchBar.tsx
"use client";
import { useState } from "react";

export default function SearchBar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);

  return (
    <div className="bg-white rounded-full shadow flex items-center px-4 py-2 w-full max-w-4xl mx-auto">
      {/* Lokasi */}
      <div className="flex-1 border-r px-3">
        <label className="block text-xs text-gray-500">Lokasi / Hotel</label>
        <input
          type="text"
          placeholder="Masukkan lokasi atau nama hotel"
          className="w-full outline-none text-sm"
        />
      </div>

      {/* Tanggal */}
      <div className="flex-1 border-r px-3">
        <label className="block text-xs text-gray-500">Tanggal</label>
        <input type="date" className="w-full outline-none text-sm" />
      </div>

      {/* Tamu */}
      <div className="flex-1 border-r px-3 relative">
        <label className="block text-xs text-gray-500">Tamu</label>
        <button
          type="button"
          className="w-full text-left text-sm"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          {adults + children} tamu, {rooms} kamar
        </button>

        {/* Dropdown tamu */}
        {showDropdown && (
          <div className="absolute top-14 left-0 bg-white shadow-lg rounded-lg p-4 w-64 z-10">
            <div className="mb-3">
              <p className="font-medium text-sm">Dewasa</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setAdults(Math.max(1, adults - 1))}
                  className="px-2 py-1 border rounded"
                >
                  -
                </button>
                <span>{adults}</span>
                <button
                  onClick={() => setAdults(adults + 1)}
                  className="px-2 py-1 border rounded"
                >
                  +
                </button>
              </div>
            </div>

            <div className="mb-3">
              <p className="font-medium text-sm">Anak-anak</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setChildren(Math.max(0, children - 1))}
                  className="px-2 py-1 border rounded"
                >
                  -
                </button>
                <span>{children}</span>
                <button
                  onClick={() => setChildren(children + 1)}
                  className="px-2 py-1 border rounded"
                >
                  +
                </button>
              </div>
            </div>

            <div className="mb-3">
              <p className="font-medium text-sm">Kamar</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setRooms(Math.max(1, rooms - 1))}
                  className="px-2 py-1 border rounded"
                >
                  -
                </button>
                <span>{rooms}</span>
                <button
                  onClick={() => setRooms(rooms + 1)}
                  className="px-2 py-1 border rounded"
                >
                  +
                </button>
              </div>
            </div>

            <button
              className="w-full bg-blue-600 text-white rounded py-2 mt-2"
              onClick={() => setShowDropdown(false)}
            >
              Selesai
            </button>
          </div>
        )}
      </div>

      {/* Tombol Cari */}
      <div className="px-3">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-full">
          Cari
        </button>
      </div>
    </div>
  );
}
