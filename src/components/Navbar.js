"use client";
import Link from "next/link";
import { WavesIcon as Wave, Menu, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation"; // For redirect after logout
import { logoutUser } from "@/utils/appwriteAuth"; // Your logout function

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter(); // To handle redirect after logout

  const handleUserLogout = async () => {
    const result = await logoutUser(); // Call the logout function

    if (result.success) {
      // On success, redirect to the home page or login page
      alert("Logging out successfully")
      router.push("/signin"); // or "/"
      // Optionally show a success message or use a toast library
    } else {
      // Handle any logout errors (you could show an alert or a message)
      console.error("Logout failed:", result.message);
      alert(result.message || "Logout failed");
    }
  };

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Wave className="h-6 w-6 text-blue-600" />
              <span className="text-sm sm:text-base">AUTOBREEZE CAR RENTAL</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-4 pr-6 lg:space-x-6">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/search-client">Client</NavLink>
            <NavLink href="/client-registration">Add a Client</NavLink>
          </nav>
          <div className="hidden md:block">
            <button
              onClick={handleUserLogout} // Handle logout on click
              className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Logout
            </button>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">{isMenuOpen ? "Close main menu" : "Open main menu"}</span>
              {isMenuOpen ? <X className="block h-6 w-6" aria-hidden="true" /> : <Menu className="block h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            <NavLink href="/" mobile>
              Home
            </NavLink>
            <NavLink href="/client" mobile>
              Client
            </NavLink>
            <NavLink href="/client-registration" mobile>
              Add a Client
            </NavLink>
          </div>
          <div className="border-t border-gray-200 pb-3 pt-4">
            <div className="flex items-center px-5">
              <button
                onClick={handleUserLogout} // Handle logout here as well
                className="w-full rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({ href, children, mobile = false }) {
  const baseClasses = "text-sm font-medium transition-colors hover:text-blue-600";
  const mobileClasses = "block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50";

  return (
    <Link href={href} className={mobile ? mobileClasses : baseClasses}>
      {children}
    </Link>
  );
}
