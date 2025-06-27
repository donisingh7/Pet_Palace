import './globals.css'
import Header from '../components/Header'
//import BannerSlider from '../components/BannerSlider';  
import Footer from '../components/Footer'   // if you have one
import ReviewCarousel from "@/components/ReviewCarousel";
import ClientProvider from './ClientProvider';
import { CartProvider } from '../context/CartContext';
import CartDrawer from '../components/CartDrawer';

 export const metadata = {
   title: 'Pet Palace',
   description: '...',
 }

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body>
        <Header logoSrc="/pet_palace.png" />
        <ClientProvider>
          <CartProvider>
          <main>{children}</main>
          <CartDrawer/>        
        <ReviewCarousel />
        <Footer />
        </CartProvider>
        </ClientProvider>
      </body>
    </html>
  );
}

