// components/Header.tsx
import Link from "next/link";
import Image from "next/image";

type HeaderProps = {
  onLoginClick: () => void;
  onSignupClick: () => void;
};

export default function Header({ onLoginClick, onSignupClick }: HeaderProps) {
  return (
    <header className="bg-gray-900 text-white shadow-md">
      <nav className="container mx-auto flex items-center justify-between p-4">
        {/* Logo (gambar + teks, link ke Home) */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.jpeg"
            alt="MyHotel Logo"
            width={40}
            height={40}
          />
          <span className="text-2xl font-bold text-blue-400 hover:text-blue-300 transition">
            MyHotel
          </span>
        </Link>

        {/* Menu Navigasi */}
        <ul className="flex space-x-6">
          <li>
            <Link href="/" className="hover:text-blue-400 transition">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-blue-400 transition">
              About
            </Link>
          </li>
          <li>
            <Link href="/hotels" className="hover:text-blue-400 transition">
              Hotels
            </Link>
          </li>
        </ul>

        {/* Tombol Login/SignUp */}
        <div className="space-x-3">
          <button
            onClick={onLoginClick}
            className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
          <button
            onClick={onSignupClick}
            className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition"
          >
            Sign Up
          </button>
        </div>
      </nav>
    </header>
  );
}