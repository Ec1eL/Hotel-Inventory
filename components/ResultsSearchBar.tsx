// components/ResultsSearchBar.tsx
"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const popularCities = [
  "Jakarta",
  "Bandung",
  "Bali",
  "Surabaya",
  "Yogyakarta",
  "Semarang",
  "Medan",
  "Makassar",
];

export default function ResultsSearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [rooms, setRooms] = useState(1);
  const [showGuestsDropdown, setShowGuestsDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [filteredCities, setFilteredCities] = useState(popularCities);

  const locationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initialLocation = searchParams.get("location") || "";
    const initialCheckIn = searchParams.get("checkIn") || "";
    const initialCheckOut = searchParams.get("checkOut") || "";
    const initialGuests = parseInt(searchParams.get("guests") || "1");
    const initialRooms = parseInt(searchParams.get("rooms") || "1");

    setLocation(initialLocation);
    setCheckIn(initialCheckIn);
    setCheckOut(initialCheckOut);
    setGuests(initialGuests);
    setRooms(initialRooms);
    setFilteredCities(popularCities.filter(city => city.toLowerCase().includes(initialLocation.toLowerCase())));
  }, [searchParams]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
        setShowLocationDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocation(value);
    const filtered = popularCities.filter(city =>
      city.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCities(filtered);
    setShowLocationDropdown(true);
  };

  const handleCitySelect = (city: string) => {
    setLocation(city);
    setShowLocationDropdown(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams({
      location,
      checkIn,
      checkOut,
      guests: guests.toString(),
      rooms: rooms.toString(),
    }).toString();

    router.push(`/hotels?${query}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2 items-center">
        <div className="relative col-span-2" ref={locationRef}>
          <label className="block text-sm font-medium text-gray-700">Lokasi</label>
          <input
            type="text"
            value={location}
            onChange={handleLocationChange}
            onFocus={() => setShowLocationDropdown(true)}
            placeholder="Masukkan lokasi"
            className="w-full border rounded-lg p-2 mt-1 text-gray-950 placeholder-gray-500"
          />
          {showLocationDropdown && (
            <ul className="absolute top-full mt-1 w-full bg-white border rounded-lg shadow-lg max-h-48 overflow-y-auto z-20">
              {filteredCities.length > 0 ? (
                filteredCities.map((city) => (
                  <li
                    key={city}
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-gray-950"
                    onClick={() => handleCitySelect(city)}
                  >
                    {city}
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-gray-500">Tidak ada kota ditemukan.</li>
              )}
            </ul>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Check-In</label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full border rounded-lg p-2 mt-1 text-gray-950"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Check-Out</label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full border rounded-lg p-2 mt-1 text-gray-950"
          />
        </div>
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700">Tamu & Kamar</label>
          <button
            type="button"
            className="w-full text-left text-gray-950 border rounded-lg p-2 mt-1 bg-white"
            onClick={() => setShowGuestsDropdown(!showGuestsDropdown)}
          >
            {guests} tamu, {rooms} kamar
          </button>
          {showGuestsDropdown && (
            <div className="absolute top-full mt-2 left-0 right-0 bg-white shadow-lg rounded-lg p-4 z-10">
              <div className="mb-3">
                <p className="font-medium text-sm text-gray-950">Tamu</p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    className="px-2 py-1 border rounded text-gray-950"
                  >
                    -
                  </button>
                  <span className="text-gray-950">{guests}</span>
                  <button
                    type="button"
                    onClick={() => setGuests(guests + 1)}
                    className="px-2 py-1 border rounded text-gray-950"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="mb-3">
                <p className="font-medium text-sm text-gray-950">Kamar</p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setRooms(Math.max(1, rooms - 1))}
                    className="px-2 py-1 border rounded text-gray-950"
                  >
                    -
                  </button>
                  <span className="text-gray-950">{rooms}</span>
                  <button
                    type="button"
                    onClick={() => setRooms(rooms + 1)}
                    className="px-2 py-1 border rounded text-gray-950"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                type="button"
                className="w-full bg-blue-600 text-white rounded py-2 mt-2"
                onClick={() => setShowGuestsDropdown(false)}
              >
                Selesai
              </button>
            </div>
          )}
        </div>
        <button
          type="submit"
          onClick={handleSearch}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition col-span-1"
        >
          Cari
        </button>
      </div>
    </div>
  );
}