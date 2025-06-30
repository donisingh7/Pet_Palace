// components/Header.jsx
import React from "react";
import { Menu, Search, User, MapPin, ShoppingCart, ChevronDown } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-4 text-center text-base font-medium">
        Special Offer: Free delivery + 20% OFF on your first order above ₹999
      </div>

      {/* Top section */}
      <div className="container mx-auto px-6 py-2 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="w-80 max-w-sm block">
          <img
            src="/images/logo.png"
            alt="PetPalace Logo"
            className="h-24 w-full object-contain hover:opacity-90 transition-opacity duration-200 cursor-pointer"
          />
        </a>

        {/* Search */}
        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative group">
            <input
              type="text"
              placeholder="Shop grooming essentials..."
              className="w-full h-14 bg-gray-50 rounded-2xl pl-6 pr-16 text-xl text-gray-700 placeholder-gray-700 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:shadow-lg transition-all duration-200 border-0"
            />
            <button className="absolute inset-y-0 right-0 pr-2 flex items-center h-14 w-10 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Deliver to */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200 h-12">
            <div className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <div className="text-gray-500 text-sm">Deliver to</div>
              <div className="font-semibold text-gray-800 text-base">110001</div>
            </div>
          </div>

          {/* Sign In */}
          <a href="/sign-in">
            <button className="h-12 px-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2">
              <div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center">
                <User className="w-4 h-4 text-gray-700" />
              </div>
              Sign In
            </button>
          </a>

          {/* Cart */}
          <div className="relative">
            <a href="/cart">
              <button className="h-12 w-12 rounded-xl border-2 border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-blue-100 shadow-sm hover:shadow-md transition">
                <ShoppingCart className="w-5 h-5 text-gray-700 hover:text-blue-600" />
              </button>
            </a>
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs rounded-full flex items-center justify-center font-semibold shadow-lg">
              2
            </span>
          </div>

          {/* Mobile Menu */}
          <button className="md:hidden h-12 w-12 rounded-xl border-2 border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-blue-100 shadow-sm hover:shadow-md transition">
            <Menu className="w-5 h-5 text-gray-700 hover:text-blue-600" />
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-t border-gray-100 bg-gray-50 shadow-sm">
        <nav className="container mx-auto px-6 flex items-center justify-center gap-1 py-2 overflow-x-auto">
          {[
            { label: "Dogs", hasDropdown: true },
            { label: "Cats", hasDropdown: true },
            { label: "Small Animals", hasDropdown: true },
            { label: "Pet Hub", hasDropdown: true },
            { label: "Store Locator", hasDropdown: false },
            { label: "Fresh Meals", hasDropdown: false },
          ].map((tab) => (
            <div key={tab.label} className="relative group">
              <button className="px-8 py-4 text-base font-semibold text-gray-700 hover:text-blue-600 hover:bg-transparent rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap">
                {tab.label}
                {tab.hasDropdown && <ChevronDown className="w-5 h-5 transition-transform duration-200 group-hover:-rotate-180" />}
              </button>
              {tab.hasDropdown && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                  {/* यहाँ आप dropdown के links डाल सकते हैं */}
                  <div className="p-6 grid gap-2">
                    <a href="#" className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
                      {tab.label} Option 1
                    </a>
                    <a href="#" className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
                      {tab.label} Option 2
                    </a>
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-100 px-6">
                    <a href="#" className="w-full block text-center px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition">
                      View All {tab.label}
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Breadcrumb */}
      <div className="bg-gray-50/50 py-2">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm">
            <a href="/" className="text-gray-600 hover:text-blue-600">Home</a>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium capitalize">dog food</span>
          </nav>
        </div>
      </div>
    </header>
  );
}
