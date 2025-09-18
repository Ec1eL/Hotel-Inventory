import Link from "next/link";
import Image from "next/image";

type HotelProps = {
  id: string;
  name: string;
  location: string;
  price: number;
  image: string;
};

export default function HotelCard({ id, name, location, price, image }: HotelProps) {
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
        <p className="text-gray-600">{location}</p>
        <p className="text-blue-600 font-semibold">
          Rp {price.toLocaleString("id-ID")}
        </p>

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
      </div>
    </div>
  );
}
