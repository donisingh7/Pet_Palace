"use client";
import PopularCategories from "@/components/PopularCategories";
import BannerSlider from "@/components/BannerSlider";
import OffersSection from "@/components/OffersSection";
import BlogSection from '@/components/BlogSection';
import EcommerceExplorer from "@/components/EcommerceExplorer";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const banners = ['/banner1.jpg','/banner2.jpg','/banner3.jpg'];
  const [showCategories, setShowCategories] = useState(false);
  const router = useRouter();

  const handleProductsClick = () => {
    if (showCategories) {
      router.push("/products");
    } else {
      setShowCategories(true);
    }
  };

  const handleBackClick = () => setShowCategories(false);

  return (
    <main>
      <BannerSlider images={banners} interval={5000} transition={600} />
      <PopularCategories />

      {/* Products + optional Back */}
      <div className="p-8 text-center">
        <div className="flex justify-center items-center space-x-4 mb-6">
          <button
            className="bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-600"
            onClick={handleProductsClick}
          >
            Products
          </button>

          {/* Show Back button only when categories are visible */}
          {showCategories }
        </div>

        {/* Category section or message */}
        {showCategories ? (
          <EcommerceExplorer />
        ) : (
          <p className="text-gray-600">
            Welcome! Click "Products" to explore categories.
          </p>
        )}
      </div>

      <OffersSection />
      <BlogSection />
    </main>
  );
}
  