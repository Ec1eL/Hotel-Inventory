import Image from "next/image";
import { notFound } from "next/navigation";

type HotelDetailProps = {
  params: { id: string };
};

const hotels = [
  {
    id: "1",
    name: "Hotel Mawar",
    location: "Jakarta",
    price: 500000,
    image: "/hotel1.jpg",
    rooms: [
      { type: "Standard Room", price: 500000, facilities: ["Wi-Fi", "AC", "TV"] },
      { type: "Deluxe Room", price: 750000, facilities: ["Wi-Fi", "AC", "TV", "Mini Bar"] },
      { type: "Suite", price: 1200000, facilities: ["Wi-Fi", "AC", "TV", "Mini Bar", "Living Room"] },
    ],
    nearby: ["Monas", "Grand Indonesia", "Pasar Tanah Abang"],
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!...", // ganti dengan link embed maps real
  },
  {
    id: "2",
    name: "Hotel Melati",
    location: "Bandung",
    price: 350000,
    image: "/hotel2.jpg",
    rooms: [
      { type: "Standard Room", price: 350000, facilities: ["Wi-Fi", "AC"] },
      { type: "Family Room", price: 600000, facilities: ["Wi-Fi", "AC", "TV", "2 Beds"] },
    ],
    nearby: ["Alun-Alun Bandung", "Braga Street", "Trans Studio Mall"],
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!...",
  },
  {
    id: "3",
    name: "Hotel Anggrek",
    location: "Bali",
    price: 800000,
    image: "/hotel3.jpg",
    rooms: [
      { type: "Deluxe Room", price: 800000, facilities: ["Wi-Fi", "AC", "TV"] },
      { type: "Suite", price: 1500000, facilities: ["Wi-Fi", "AC", "TV", "Ocean View"] },
    ],
    nearby: ["Pantai Kuta", "Beachwalk Mall", "Pura Tanah Lot"],
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!...",
  },
];

export default function HotelDetail({ params }: HotelDetailProps) {
  const hotel = hotels.find((h) => h.id === params.id);

  if (!hotel) return notFound();

  return (
    <div className="space-y-6">
      {/* Gambar utama */}
      <Image
        src={hotel.image}
        alt={hotel.name}
        width={1200}
        height={500}
        className="w-full h-80 object-cover rounded-xl"
      />

      {/* Info dasar */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{hotel.name}</h1>
        <p className="text-gray-600 mb-2">{hotel.location}</p>
        <p className="text-2xl font-semibold text-blue-600 mb-4">
          Mulai dari Rp {hotel.price.toLocaleString("id-ID")} / malam
        </p>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Pesan Sekarang
        </button>
      </div>

      {/* Jenis kamar */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">Jenis Kamar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hotel.rooms.map((room, index) => (
            <div key={index} className="border p-4 rounded-lg">
              <h3 className="text-xl font-semibold">{room.type}</h3>
              <p className="text-blue-600 font-bold">
                Rp {room.price.toLocaleString("id-ID")} / malam
              </p>
              <ul className="text-gray-600 list-disc list-inside mt-2">
                {room.facilities.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Spot populer sekitar hotel */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">Tempat Populer di Sekitar</h2>
        <ul className="list-disc list-inside text-gray-700">
          {hotel.nearby.map((spot, i) => (
            <li key={i}>{spot}</li>
          ))}
        </ul>
      </div>

      {/* Maps */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">Lokasi</h2>
        <iframe
          src={hotel.mapEmbed}
          width="100%"
          height="350"
          loading="lazy"
          className="rounded-lg border"
        ></iframe>
      </div>
    </div>
  );
}
