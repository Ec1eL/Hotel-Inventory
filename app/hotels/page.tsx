import HotelCard from "@/components/HotelCard";

const hotels = [
  {
    id: "1",
    name: "Hotel Mawar",
    location: "Jakarta",
    price: 500000,
    image: "/hotel1.jpg", // letakkan di folder public/
  },
  {
    id: "2",
    name: "Hotel Melati",
    location: "Bandung",
    price: 350000,
    image: "/hotel2.jpg",
  },
  {
    id: "3",
    name: "Hotel Anggrek",
    location: "Bali",
    price: 800000,
    image: "/hotel3.jpg",
  },
];

export default function HotelsPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {hotels.map((hotel) => (
        <HotelCard key={hotel.id} {...hotel} />
      ))}
    </div>
  );
}
