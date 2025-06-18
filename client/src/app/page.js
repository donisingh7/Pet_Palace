import Image from "next/image";
import BannerSlider from '../components/BannerSlider';    
export default function Home() {
  const banners = [
    '/banner1.jpg',
    '/banner2.jpg',
    '/banner3.jpg',
  ];
  return (
    <main>
       <BannerSlider images={banners} interval={5000} transition={600} />
      <h1>Welcome to Pet Palace!</h1>
      {/* Your real homepage content */}
    </main>
  );
}