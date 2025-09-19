// app/hotels/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import HotelCard from "@/components/HotelCard";
import ResultsSearchBar from "@/components/ResultsSearchBar";

const allHotels = [
  {
    id: "1",
    name: "Hotel Mawar",
    location: "Jakarta",
    price: 500000,
    image: "/hotel1.jpg",
    rating: 4.5,
  },
  {
    id: "2",
    name: "Hotel Melati",
    location: "Bandung",
    price: 350000,
    image: "/hotel2.jpg",
    rating: 4.2,
  },
  {
    id: "3",
    name: "Hotel Anggrek",
    location: "Bali",
    price: 800000,
    image: "/hotel3.jpg",
    rating: 4.8,
  },
  {
    id: "4",
    name: "Hotel Tulip",
    location: "Jakarta",
    price: 600000,
    image: "/hotel4.jpg",
    rating: 4.0,
  },
  {
    id: "5",
    name: "Hotel Edelweiss",
    location: "Bandung",
    price: 450000,
    image: "/hotel5.jpg",
    rating: 4.3,
  },
];

export default function HotelsPage() {
  const searchParams = useSearchParams();
  const [filteredHotels, setFilteredHotels] = useState(allHotels);
  const [sortOrder, setSortOrder] = useState("asc");
  const [minRating, setMinRating] = useState(0);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  useEffect(() => {
    const location = searchParams.get("location")?.toLowerCase() || "";
    
    let hotelsToFilter = allHotels;
    if (location) {
      hotelsToFilter = allHotels.filter(hotel =>
        hotel.location.toLowerCase().includes(location)
      );
    }
    
    // Convert string inputs to numbers for filtering
    const minPrice = priceRange.min === "" ? 0 : parseInt(priceRange.min as string);
    const maxPrice = priceRange.max === "" ? 1000000 : parseInt(priceRange.max as string);

    hotelsToFilter = hotelsToFilter.filter(hotel => 
      hotel.rating >= minRating &&
      hotel.price >= minPrice &&
      hotel.price <= maxPrice
    );

    const sortedHotels = [...hotelsToFilter].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.price - b.price;
      }
      return b.price - a.price;
    });

    setFilteredHotels(sortedHotels);
  }, [searchParams, sortOrder, minRating, priceRange]);

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <ResultsSearchBar />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Kolom Filter (Kiri) */}
        <div className="col-span-1 p-4 bg-white rounded-xl shadow-md space-y-6">
          <h3 className="text-xl font-bold text-gray-950">Filter</h3>
          
          {/* Filter Rating */}
          <div>
            <label className="block font-medium text-gray-700">Rating</label>
            <select
              value={minRating}
              onChange={(e) => setMinRating(parseFloat(e.target.value))}
              className="w-full border rounded-lg p-2 mt-2 text-gray-950"
            >
              <option value="0">Semua</option>
              <option value="3">3 Bintang Ke Atas</option>
              <option value="4">4 Bintang Ke Atas</option>
              <option value="4.5">4.5 Bintang Ke Atas</option>
            </select>
          </div>

          {/* Filter Harga */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">Harga per Malam</label>
            <div className="flex justify-between space-x-2">
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">Min</p>
                <div className="flex items-center border rounded-lg p-2">
                  <span className="text-gray-950 mr-1">Rp</span>
                  <input
                    type="number"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                    className="w-full outline-none text-gray-950"
                    min={0}
                    max={priceRange.max || undefined}
                  />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">Max</p>
                <div className="flex items-center border rounded-lg p-2">
                  <span className="text-gray-950 mr-1">Rp</span>
                  <input
                    type="number"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                    className="w-full outline-none text-gray-950"
                    min={priceRange.min || undefined}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Contoh Filter Lainnya */}
          <div>
            <h4 className="font-medium text-gray-700">Fasilitas</h4>
            <div className="mt-2 space-y-1">
              <label className="flex items-center text-gray-600">
                <input type="checkbox" className="mr-2" />
                Wi-Fi Gratis
              </label>
              <label className="flex items-center text-gray-600">
                <input type="checkbox" className="mr-2" />
                Kolam Renang
              </label>
            </div>
          </div>
        </div>

        {/* Kolom Hasil Pencarian (Kanan) */}
        <div className="col-span-3">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-950">
              Hasil Pencarian ({filteredHotels.length} hotel ditemukan)
            </h2>
            <div className="flex items-center space-x-4">
              <label className="text-gray-700">Urutkan:</label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="border rounded-lg p-2 text-gray-950"
              >
                <option value="asc">Harga Termurah</option>
                <option value="desc">Harga Termahal</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredHotels.length > 0 ? (
              filteredHotels.map((hotel) => (
                <HotelCard key={hotel.id} {...hotel} showButtons={true} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">Tidak ada hotel yang cocok dengan kriteria Anda.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}