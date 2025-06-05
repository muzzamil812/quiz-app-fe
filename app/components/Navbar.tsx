import { UserCircle } from "lucide-react";
import Link from "next/link";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Left: Profile Icon */}
      <div className="flex items-center">
        <UserCircle className="w-8 h-8 text-gray-700" />
      </div>

      {/* Right: Nav Links */}
      <ul className="flex space-x-6 text-gray-700 font-medium">
        <li>
          <Link href="/home" className="hover:text-blue-600 transition">
            Home
          </Link>
        </li>
        <li>
          <Link href="/about" className="hover:text-blue-600 transition">
            About
          </Link>
        </li>
        <li>
          <Link href="/contact" className="hover:text-blue-600 transition">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
