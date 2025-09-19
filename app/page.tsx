// app/page.tsx
"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import HotelCard from "@/components/HotelCard";

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

const hotels = [
  {
    id: "1",
    name: "Hotel Mawar",
    location: "Jakarta",
    price: 500000,
    image: "/hotel1.jpg",
    rating: 4.5, // Menambahkan properti rating
  },
  {
    id: "2",
    name: "Hotel Melati",
    location: "Bandung",
    price: 350000,
    image: "/hotel2.jpg",
    rating: 4.2, // Menambahkan properti rating
  },
  {
    id: "3",
    name: "Hotel Anggrek",
    location: "Bali",
    price: 800000,
    image: "/hotel3.jpg",
    rating: 4.8, // Menambahkan properti rating
  },
];

export default function HomePage() {
  const router = useRouter();
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
    <>
      <div
        className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center p-6 text-white"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      >
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold drop-shadow-lg">Temukan Hotel Impian Anda</h1>
          <p className="text-xl mt-2 drop-shadow-md">
            Pesan kamar dengan mudah dan cepat.
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 w-full max-w-4xl space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="col-span-1 lg:col-span-1 relative" ref={locationRef}>
              <label className="block text-sm font-medium text-gray-700">Lokasi / Hotel</label>
              <input
                type="text"
                value={location}
                onChange={handleLocationChange}
                onFocus={() => setShowLocationDropdown(true)}
                placeholder="Masukkan lokasi atau nama hotel"
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
          </div>
        </div>

        <button
          type="submit"
          onClick={handleSearch}
          className="w-full max-w-4xl mt-4 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition"
        >
          Cari Hotel
        </button>
      </div>

      <main className="container mx-auto p-6 mt-8">
        {/* Bagian Promosi & Penawaran Spesial */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-950 mb-6 text-center">
            Promosi & Penawaran Spesial
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-2 text-blue-700">Diskon Liburan Akhir Tahun!</h3>
              <p className="text-gray-600">Dapatkan diskon hingga 50% untuk pemesanan hotel di bulan Desember. Jangan lewatkan kesempatan ini!</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-2 text-blue-700">Weekend Getaway</h3>
              <p className="text-gray-600">Nikmati potongan harga spesial untuk menginap di akhir pekan. Syarat dan ketentuan berlaku.</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-2 text-blue-700">Gratis Sarapan</h3>
              <p className="text-gray-600">Pesan hotel sekarang dan dapatkan gratis sarapan untuk dua orang.</p>
            </div>
          </div>
        </section>

        {/* Bagian Hotel Populer */}
        <section>
          <h2 className="text-3xl font-bold text-gray-950 mb-6 text-center">
            Hotel Populer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hotels.map((hotel) => (
              <HotelCard key={hotel.id} {...hotel} showButtons={false} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}