import './globals.css'
import Header from '../components/Header'
import petLogo from '../../public/pet_palace.png';
import { AuthProvider } from '../context/AuthContext';  
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
    <body className="flex flex-col min-h-screen">
      <ClientProvider>
      <AuthProvider> 
        <CartProvider>
          <Header logoSrc="/pet_palace.png"/>
          {/* Main content grows */}
          <main className="flex-1">
            {children}
          </main>

          {/* Global overlays/drawers */}
          <CartDrawer />

          {/* Footer at bottom */}
          <Footer />
        </CartProvider>
        </AuthProvider>
      </ClientProvider>
    </body>
  </html>
  );
}

