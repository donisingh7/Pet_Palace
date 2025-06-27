import PopularCategories from "@/components/PopularCategories";
import Image from "next/image";
import BlogSection from '@/components/BlogSection';
//import ReviewCarousel from "@/components/ReviewCarousel";
import PendulumDisplay from "@/components/PendulumDisplay";
import BannerSlider from '../components/BannerSlider';   
import OffersSection from "@/components/OffersSection"; 
import EcommerceExplorer from "@/components/EcommerceExplorer";
export default function Home() {
  const banners = [
    '/banner1.jpg',
    '/banner2.jpg',
    '/banner3.jpg',
  ];
  return (
    <main>
       <BannerSlider images={banners} interval={5000} transition={600} />
       <PopularCategories />
       
       <EcommerceExplorer />
       {/* Replace the placeholder in ProductsMenu with: */}
       {/* {level is string && <PendulumDisplay category={level} />} */}
       <OffersSection />
       <BlogSection />
      {/* Your real homepage content */}
    </main>
  ); 
}