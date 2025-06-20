import './globals.css'
import Header from '../components/Header'
import BannerSlider from '../components/BannerSlider';  
import Footer from '../components/Footer'   // if you have one
import ReviewCarousel from "@/components/ReviewCarousel";


 export const metadata = {
   title: 'Pet Palace',
   description: '...',
 }

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body>
         <Header logoSrc="/pet_palace.png" />      {/* ← yahan dikh raha hoga */}
         
        <main>{children}</main>
        <ReviewCarousel />
        <Footer />
      </body>
    </html>
  );
}

