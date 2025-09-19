// components/HotelCard.tsx
import Link from "next/link";
import Image from "next/image";

type HotelProps = {
  id: string;
  name: string;
  location: string;
  price: number;
  image: string;
  rating: number; // Menambahkan properti rating
  showButtons?: boolean;
};

// Fungsi untuk membuat bintang
const renderStars = (rating: number) => {
  const stars = [];
  const maxStars = 5;

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  // Render bintang penuh
  for (let i = 0; i < fullStars; i++) {
    stars.push(<span key={`full-${i}`} className="text-yellow-400">★</span>);
  }

  // Render bintang setengah
  if (hasHalfStar) {
    stars.push(
      <span key="half" className="relative">
        <span className="text-gray-400">★</span>
        <span className="absolute top-0 left-0 overflow-hidden text-yellow-400" style={{ width: '50%' }}>★</span>
      </span>
    );
  }

  // Render bintang kosong
  const emptyStars = maxStars - stars.length;
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<span key={`empty-${i}`} className="text-gray-400">★</span>);
  }

  return stars;
};

export default function HotelCard({ id, name, location, price, image, rating, showButtons = true }: HotelProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* Gambar Hotel */}
      <Image
        src={image}
        alt={name}
        width={400}
        height={250}
        className="w-full h-48 object-cover"
      />

      {/* Konten */}
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-900">{name}</h2>
        <div className="flex items-center mb-2">
          <p className="text-gray-600 mr-2">{location}</p>
          <div className="flex">
            {renderStars(rating)}
            <span className="text-gray-600 ml-2">({rating})</span>
          </div>
        </div>
        <p className="text-blue-600 font-semibold">
          Rp {price.toLocaleString("id-ID")}
        </p>

        {showButtons && (
          <div className="mt-4 flex space-x-2">
            <Link
              href={`/hotels/${id}`}
              className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Detail
            </Link>
            <button className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Pesan Sekarang
            </button>
          </div>
        )}
      </div>
    </div>
  );
}