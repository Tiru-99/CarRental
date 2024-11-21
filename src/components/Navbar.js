"use client";
import Link from "next/link";
import { WavesIcon as Wave, Menu, X, Loader2 } from "lucide-react"; // Added Loader2 for the spinner
import { useState } from "react";
import { useRouter } from "next/navigation"; // For redirect after logout
import { logoutUser } from "@/utils/appwriteAuth"; // Your logout function
import { toast } from "react-toastify";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Track loading state
  const router = useRouter(); // To handle redirect after logout

  const handleUserLogout = async () => {
    setLoading(true); // Start loading
    const result = await logoutUser(); // Call the logout function

    if (result.success) {
      toast.success("Logged Out Successfully");
      router.push("/signin");
    } else {
      console.error("Logout failed:", result.message);
      alert(result.message || "Logout failed");
    }
    setLoading(false); // Stop loading
  };

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <img 
              src="/images/logo.png" 
              alt="Logo" 
              className="h-10 w-auto object-contain"
            />
           
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-4 pr-6 lg:space-x-6">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/search-client">Client</NavLink>
            <NavLink href="/client-registration">Add a Client</NavLink>
          </nav>

          {/* Logout Button for Desktop */}
          <div className="hidden md:block">
            <button
              onClick={handleUserLogout}
              disabled={loading}
              className={`flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                loading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging out...
                </>
              ) : (
                "Logout"
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">{isMenuOpen ? "Close main menu" : "Open main menu"}</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-50 shadow-md">
          <div className="space-y-1 px-4 pb-4 pt-2">
            <NavLink href="/" mobile>
              Home
            </NavLink>
            <NavLink href="/search-client" mobile>
              Client
            </NavLink>
            <NavLink href="/client-registration" mobile>
              Add a Client
            </NavLink>
            <div className="border-t border-gray-200 pt-4">
              <button
                onClick={handleUserLogout}
                disabled={loading}
                className={`flex w-full items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white ${
                  loading
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging out...
                  </>
                ) : (
                  "Logout"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({ href, children, mobile = false }) {
  const baseClasses =
    "text-sm font-medium transition-colors hover:text-blue-600";
  const mobileClasses =
    "block w-full px-4 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100";

  return (
    <Link href={href}>
      <span className={mobile ? mobileClasses : baseClasses}>{children}</span>
    </Link>
  );
}
